import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Tariff, TariffSchema } from 'src/user/schemas/tariff.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Tariff.name, schema: TariffSchema },
    ]),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
