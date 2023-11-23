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
    },
    payment: {
      type: String,
      required: true,
      enum: ['cod', 'gateway'],
    },
    status: {
      type: String,
      enum: ['confirmed', 'shipped', 'delivered'],
    },
    transactionId: {
      type: String,
    },
    user: {
      type: String,
      required: true,
      ref: 'User',
    },
    products: {
      type: [
        {
          productId: {
            type: String,
            ref: 'Product',
          },
          quantity: {
            type: Number,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder, OrderModel>('Order', OrderSchema);
