/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TariffDocument } from 'src/user/schemas/tariff.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import * as ApiKey from 'uuid-apikey';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<UserDocument>,
  ) {}

  async findUserByToken(token: string): Promise<UserDocument & { tariffId: TariffDocument }> {
    // @ts-ignore
    const tokenUuid = ApiKey.toUUID(token);
    const user: UserDocument & { tariffId: TariffDocument } = await this.userRepository
      .findOne({ token: tokenUuid })
      .populate('tariffId')
      .lean();

    if (user?.token === tokenUuid) return user;

    return null;
  }
}
