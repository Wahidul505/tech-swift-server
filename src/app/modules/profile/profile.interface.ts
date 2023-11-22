/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IProfile = {
  name?: string;
  phone?: string;
  location?: string;
  dp?: string;
};

export type ProfileModel = Model<IProfile, Record<string, unknown>>;
