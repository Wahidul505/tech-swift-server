/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IProfile, ProfileModel } from './profile.interface';

const ProfileSchema = new Schema<IProfile, ProfileModel>(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    dp: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Profile = model<IProfile, ProfileModel>('Profile', ProfileSchema);
