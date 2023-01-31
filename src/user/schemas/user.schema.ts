import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Tariff } from './tariff.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  userId: number;

  @Prop({
    required: true,
    unique: true,
  })
  token?: string;

  @Prop()
  username: string;

  @Prop()
  password?: string;

  @Prop({
    required: true,
    unique: true,
    default() {
      return this.userId;
    },
  })
  email?: string;

  @Prop({
    default: () => 0,
  })
  requestsUsed?: number;

  @Prop({
    default: () => '6016bed198ebf72bc112edae',
    type: mongoose.Schema.Types.ObjectId,
    ref: Tariff.name,
  })
  tariffId?: Types.ObjectId;

  @Prop({
    default: () => false,
  })
  inChat?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
