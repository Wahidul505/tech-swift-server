/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { IUser, UserModel } from './user.interface';

const UserSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      required: true,
      enum: [ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN],
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser, UserModel>('User', UserSchema);
