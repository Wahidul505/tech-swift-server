/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type ICategory = {
  title: string;
  image: string;
};

export type CategoryModel = Model<ICategory, Record<string, unknown>>;
