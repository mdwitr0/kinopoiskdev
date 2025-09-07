import { Expose } from 'class-transformer';
import { Person } from '../schemas/person.schema';
import { ApiProperty } from '@nestjs/swagger';
import { ApiNullableProperty } from '../../common/decorators/api-nullable-property.decorator';

export class MeiliPersonEntity {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiNullableProperty()
  @Expose()
  name: string;

  @ApiNullableProperty()
  @Expose()
  enName: string;

  @ApiNullableProperty()
  @Expose()
  photo: string;

  @ApiNullableProperty()
  @Expose()
  sex: string;

  @ApiNullableProperty()
  @Expose()
  growth: number;

  @ApiNullableProperty()
  @Expose()
  birthday: string;

  @ApiNullableProperty()
  @Expose()
  death: string;

  @ApiNullableProperty()
  @Expose()
  age: number;

  @ApiNullableProperty()
  @Expose()
  birthPlace: string[];

  @ApiNullableProperty()
  @Expose()
  deathPlace: string[];

  @ApiNullableProperty()
  @Expose()
  profession: string[];

  constructor(person: Partial<MeiliPersonEntity>) {
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

    this.birthPlace = person.birthPlace ? person.birthPlace.map((birthPlace) => birthPlace.value) : [];

    this.deathPlace = person.deathPlace ? person.deathPlace.map((deathPlace) => deathPlace.value) : [];

    this.profession = person.profession ? person.profession.map((profession) => profession.value) : [];

    return this;
  }
}
