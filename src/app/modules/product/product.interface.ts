/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { ICategory } from '../category/category.interface';

export type IProduct = {
  title: string;
  image: string;
  price: number;
  details: {
    model?: string;
    display?: string;
    processor?: string;
    camera?: string;
    ram?: string;
    storage?: string;
  };
  features?: string[];
  colors?: string[];
  category: Types.ObjectId | ICategory;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;
