import { Injectable } from '@nestjs/common';
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

@Injectable()
export class PersonService extends BaseService<Person> {
  constructor(
    @InjectModel(Person.name) private readonly personModel: Model<PersonDocument>,
    @InjectModel(PersonAward.name) private readonly personAwardModel: Model<PersonAwardDocument>,
    private readonly meiliService: MeiliService,
  ) {
    super(personModel);
  }

  async findManyV1_4(request: PersonRequestDtoV1_4): Promise<PersonDocsResponseDtoV1_4> {
    const filter = request.model2Where();
    const select = request.model2Select();
    const sort = request.model2Sort();
    const { skip, limit } = request.model2Pagination();

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
}
