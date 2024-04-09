import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';
import { IQuery } from 'src/common/interfaces/query.interface';
import { Person, PersonDocument } from 'src/person/schemas/person.schema';
import { PersonAwardDocsResponseDto } from './dto/person-award-docs.response.dto';
import { PersonAward, PersonAwardDocument } from './schemas/person-award.schema';
import { SearchDto } from 'src/common/dto/query/search.dto';
import { SearchPersonResponseDto } from './dto/search-person.response.dto';
import { MeiliService } from 'src/meili/meili.service';
import { MeiliPersonEntity } from './entities/meili-person.entity';
import { PERSON_INDEX, PERSON_V1_4_INDEX } from './constants/person-index';
import { SearchPersonResponseDtoV1_4 } from './dto/v1.4/search-person.response.dto';
import { MeiliPersonEntityV1_4 } from './entities/v1.4/meili-person.entity';
import { PersonRequestDtoV1_4 } from './dto/v1.4/person-request.dto';
import { PersonDocsResponseDtoV1_4 } from './dto/v1.4/person-docs.response';
import { PersonAwardRequestDtoV1_4 } from './dto/v1.4/person-award-request.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PersonService extends BaseService<Person> implements OnModuleInit {
  private readonly logger = new Logger(PersonService.name);
  private personsLimit: number;
  constructor(
    @InjectModel(Person.name) private readonly personModel: Model<PersonDocument>,
    @InjectModel(PersonAward.name) private readonly personAwardModel: Model<PersonAwardDocument>,
    private readonly meiliService: MeiliService,
    private readonly configService: ConfigService,
  ) {
    super(personModel);
  }

  async findManyV1_4(request: PersonRequestDtoV1_4): Promise<PersonDocsResponseDtoV1_4> {
    const filter = request.model2Where();
    const select = request.model2Select();
    const sort = request.model2Sort();
    const { skip, limit } = request.model2Pagination();

    if (skip > this.personsLimit) {
      throw new BadRequestException(`Вы пытаетесь запросить больше страниц, чем доступно на самом деле!`);
    }

    const [total, docs] = await Promise.all([
      this.personModel.countDocuments(filter),
      this.personModel.find(filter).sort(sort).limit(limit).skip(skip).select(select).allowDiskUse(true).exec(),
    ]);

    const docsToJson = docs.map((doc) => doc?.toJSON());
    return {
      docs: docsToJson,
      total,
      limit: request.limit,
      page: skip / limit + 1,
      pages: Math.ceil(total / limit),
    };
  }

  async findOneV1_4(id: number | string): Promise<Person | null> {
    const found = await this.model.findOne({ id });

    if (found) {
      // @ts-ignore
      return found.toJSON();
    }

    await this.addPerson(id);

    return found;
  }

  async searchPersonV1_4(dto: SearchDto): Promise<SearchPersonResponseDtoV1_4> {
    const offset = (dto.page - 1) * dto.limit;
    const searchResponse = await this.meiliService.search<MeiliPersonEntityV1_4>(dto.query, PERSON_V1_4_INDEX, dto.limit, offset);

    const personEntities = searchResponse.hits.map((person) => new MeiliPersonEntityV1_4(person));

    return {
      docs: personEntities,
      total: searchResponse.estimatedTotalHits,
      limit: dto.limit,
      page: dto.page,
      pages: Math.ceil(searchResponse.estimatedTotalHits / dto.limit),
    };
  }

  async findManyAwardsV1_4(request: PersonAwardRequestDtoV1_4): Promise<PersonAwardDocsResponseDto> {
    const filter = request.model2Where();
    const select = request.model2Select();
    const sort = request.model2Sort();
    const { skip, limit } = request.model2Pagination();

    const [total, docs] = await Promise.all([
      this.personAwardModel.countDocuments(filter),
      this.personAwardModel.find(filter).sort(sort).limit(limit).skip(skip).select(select).allowDiskUse(true).exec(),
    ]);

    const docsToJson = docs.map((doc) => doc?.toJSON());
    return {
      docs: docsToJson,
      total,
      limit: request.limit,
      page: skip / limit + 1,
      pages: Math.ceil(total / limit),
    };
  }

  async searchPerson(dto: SearchDto): Promise<SearchPersonResponseDto> {
    const offset = (dto.page - 1) * dto.limit;
    const searchResponse = await this.meiliService.search<MeiliPersonEntity>(dto.query, PERSON_INDEX, dto.limit, offset);

    const personEntities = searchResponse.hits.map((person) => new MeiliPersonEntity(person));

    return {
      docs: personEntities,
      total: searchResponse.estimatedTotalHits,
      limit: dto.limit,
      page: dto.page,
      pages: Math.ceil(searchResponse.estimatedTotalHits / dto.limit),
    };
  }

  async findManyAwards(query: IQuery): Promise<PersonAwardDocsResponseDto> {
    const [total, docs] = await Promise.all([
      this.personAwardModel.countDocuments(query.filter),
      this.personAwardModel
        .find(query.filter)
        .limit(query.limit)
        .skip(query.skip)
        .select(query.select)
        .sort(Object.keys(query.sort)?.length ? query.sort : { 'nomination.award.year': -1 })
        .allowDiskUse(true)
        .exec(),
    ]);

    const docsToJson = docs.map((doc) => doc?.toJSON());
    return {
      docs: docsToJson,
      total,
      limit: query.limit,
      page: query.skip / query.limit + 1,
      pages: Math.ceil(total / query.limit),
    };
  }

  async addPerson(id: number | string): Promise<void> {
    this.logger.log(`Add person with id: ${id}`);
    try {
      const baseUrl = this.configService.get('UPDATE_API_BASE_URL');
      await fetch(`${baseUrl}/person`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ids: [id],
        }),
      });
    } catch (e) {
      this.logger.error("Can't add person", e);
    }
  }

  cursor() {
    return this.personModel.find({}).cursor();
  }

  async onModuleInit() {
    const count = await this.personModel.countDocuments({});
    if (count > 0) this.personsLimit = count;
  }
}
