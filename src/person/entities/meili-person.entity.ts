import { Expose } from 'class-transformer';
import { Person } from '../schemas/person.schema';
import { ApiProperty } from '@nestjs/swagger';

export class MeiliPersonEntity {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  enName: string;

  @ApiProperty()
  @Expose()
  photo: string;

  @ApiProperty()
  @Expose()
  sex: string;

  @ApiProperty() 1;
  @Expose()
  growth: number;

  @ApiProperty()
  @Expose()
  birthday: string;

  @ApiProperty()
  @Expose()
  death: string;

  @ApiProperty()
  @Expose()
  age: number;

  @ApiProperty()
  @Expose()
  birthPlace: string[];

  @ApiProperty()
  @Expose()
  deathPlace: string[];

  @ApiProperty()
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
