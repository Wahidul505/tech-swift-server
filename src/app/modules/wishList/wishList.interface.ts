/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IWishListProduct = {
  product: Types.ObjectId | string;
};

export type IWishList = {
  user: Types.ObjectId | IUser;
  products: IWishListProduct[];
};

export type WishListModel = Model<IWishList, Record<string, unknown>>;
