/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { ENUM_USER_ROLE } from '../../../enums/user';

export type IUser = {
  email: string;
  password: string;
  role: ENUM_USER_ROLE.CUSTOMER | ENUM_USER_ROLE.ADMIN;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
