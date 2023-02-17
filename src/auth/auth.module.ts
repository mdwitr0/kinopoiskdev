import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tariff, TariffSchema } from 'src/user/schemas/tariff.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Tariff.name, schema: TariffSchema },
    ]),
  ],
  providers: [AuthService],
})
export class AuthModule {}
