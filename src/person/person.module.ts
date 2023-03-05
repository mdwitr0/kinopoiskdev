import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from './schemas/person.schema';
import { PersonAward, PersonAwardSchema } from './schemas/person-award.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Person.name, schema: PersonSchema },
      { name: PersonAward.name, schema: PersonAwardSchema },
    ]),
  ],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
