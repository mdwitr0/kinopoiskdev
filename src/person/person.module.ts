import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema } from './schemas/person.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'people', schema: PersonSchema }])],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
