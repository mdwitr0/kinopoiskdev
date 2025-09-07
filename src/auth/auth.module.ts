import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Tariff, TariffSchema } from 'src/user/schemas/tariff.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';
import { UserCacheService } from './services/user-cache.service';
import { TariffConfigServiceImpl } from './services/tariff-config.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Tariff.name, schema: TariffSchema },
    ]),
  ],
  providers: [AuthService, UserCacheService, TariffConfigServiceImpl],
  exports: [AuthService, TariffConfigServiceImpl],
})
export class AuthModule {}
