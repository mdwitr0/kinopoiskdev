import { Person } from '../schemas/person.schema';
import { ApiProperty } from '@nestjs/swagger';

export class MeiliPersonEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  enName: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  sex: string;

  @ApiProperty()
  growth: number;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  death: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  birthPlace: string[];

  @ApiProperty()
  deathPlace: string[];

  @ApiProperty()
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
