import { Types } from 'mongoose';

export interface CachedUser {
  _id: string;
  token: string;
  userId: number;
  username?: string;
  password?: string;
  email?: string;
  requestsUsed?: number;
  inChat?: boolean;
  isSubscribed?: boolean;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  tariffName: string;
  requestsLimit: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserWithTariff {
  _id: Types.ObjectId | string;
  token: string;
  userId: number;
  username?: string;
  password?: string;
  email?: string;
  requestsUsed?: number;
  inChat?: boolean;
  isSubscribed?: boolean;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  tariffId: {
    _id: Types.ObjectId | string;
    name: string;
    requestsLimit: number;
    price: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}