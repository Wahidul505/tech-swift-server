/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const OrderSchema = new Schema<IOrder, OrderModel>(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      required: true,
      enum: ['cod', 'gateway'],
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'shipped', 'delivered'],
    },
    transactionId: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    products: {
      type: [Schema.Types.ObjectId],
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder, OrderModel>('Order', OrderSchema);
