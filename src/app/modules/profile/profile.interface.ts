/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IProfile = {
  name?: string;
  phone?: string;
  location?: string;
  dp?: string;
  user: Types.ObjectId | IUser;
};

export type ProfileModel = Model<IProfile, Record<string, unknown>>;
