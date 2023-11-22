/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IProduct, ProductModel } from './product.interface';

const ProductSchema = new Schema<IProduct, ProductModel>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    details: {
      model: {
        type: String,
      },
      display: {
        type: String,
      },
      processor: {
        type: String,
      },
      camera: {
        type: String,
      },
      ram: {
        type: String,
      },
      storage: {
        type: String,
      },
    },
    features: {
      type: [String],
    },
    colors: {
      type: [String],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct, ProductModel>('Product', ProductSchema);
