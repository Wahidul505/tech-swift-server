/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IProduct } from '../product/product.interface';
import { IUser } from '../user/user.interface';

export type IPayment = 'cod' | 'gateway';
export type IStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered';

export type IOrder = {
  name: string;
  phone: string;
  location: string;
  totalPrice: number;
  payment: IPayment;
  status: IStatus;
  transactionId?: string;
  user: Types.ObjectId | IUser;
  products: Types.ObjectId[] | IProduct[];
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
