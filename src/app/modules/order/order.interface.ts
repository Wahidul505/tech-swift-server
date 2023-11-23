/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IPayment = 'cod' | 'gateway';
export type IStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered';
export type IOrderedProduct = {
  productId: Types.ObjectId | string;
  quantity: number;
};

export type IOrder = {
  name: string;
  phone: string;
  location: string;
  totalPrice: number;
  payment: IPayment;
  status: IStatus;
  transactionId?: string;
  user: Types.ObjectId | IUser;
  products: IOrderedProduct[];
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
