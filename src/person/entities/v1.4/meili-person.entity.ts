import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { MeiliPersonEntity } from '../meili-person.entity';
import { Prop } from '@nestjs/mongoose';
import { BirthPlace, DeathPlace, Person, Profession } from '../../schemas/person.schema';

export class MeiliPersonEntityV1_4 extends OmitType(MeiliPersonEntity, [
  'birthPlace',
  'deathPlace',
  'profession',
  'fromMongoDocument',
] as const) {
  @ApiPropertyOptional({ type: () => BirthPlace, isArray: true })
  @Prop({ items: BirthPlace })
  birthPlace: BirthPlace[];

  @ApiPropertyOptional({ type: () => DeathPlace, isArray: true })
  @Prop({ items: DeathPlace })
  deathPlace: DeathPlace[];

  @ApiPropertyOptional({ type: () => Profession, isArray: true })
  @Prop({ items: Profession })
  profession: Profession[];

  constructor(person: Partial<MeiliPersonEntityV1_4>) {
    super();
    Object.assign(this, person);
  }

  public fromMongoDocument(person: Person): this {
    this.id = person.id;
    this.name = person.name || '';
    this.enName = person.enName || '';
    this.photo = person.photo || '';
    this.sex = person.sex || '';
    this.growth = person.growth || 0;
    this.birthday = person.birthday || '';
    this.death = person.death || '';
    this.age = person.age || 0;

    this.birthPlace = person.birthPlace || [];

    this.deathPlace = person.deathPlace || [];

    this.profession = person.profession || [];

    return this;
  }
}
