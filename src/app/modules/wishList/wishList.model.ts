/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IWishList, WishListModel } from './wishList.interface';

const WishListSchema = new Schema<IWishList, WishListModel>(
  {
    user: {
      type: String,
      required: true,
      ref: 'user',
    },
    products: {
      type: [
        {
          productId: {
            type: String,
            ref: 'Product',
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const WishList = model<IWishList, WishListModel>(
  'WishList',
  WishListSchema
);
