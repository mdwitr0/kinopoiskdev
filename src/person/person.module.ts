import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from './schemas/person.schema';
import { PersonAward, PersonAwardSchema } from './schemas/person-award.schema';
import { MeiliModule } from 'src/meili/meili.module';
import { CacheConfig } from 'src/common/configs/cache.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CacheConfig,
    MongooseModule.forFeature([
      { name: Person.name, schema: PersonSchema },
      { name: PersonAward.name, schema: PersonAwardSchema },
    ]),
    MeiliModule,
    ConfigModule,
  ],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {}
