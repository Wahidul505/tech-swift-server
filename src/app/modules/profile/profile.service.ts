import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { IProfile } from './profile.interface';
import { Profile } from './profile.model';

const insertIntoDB = async (
  payload: IProfile,
  user: JwtPayload
): Promise<IProfile> => {
  const isProfileExist = await Profile.findOne({ user: payload?.user });
  if (isProfileExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You have already created your profile'
    );
  }
  if (user?.userId !== payload?.user) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are forbidden');
  }

  const result = await Profile.create(payload);

  return result;
};

const getSingleFromDB = async (id: string): Promise<IProfile | null> => {
  const result = await Profile.findById(id);
  return result;
};

const updateFromDB = async (
  id: string,
  user: JwtPayload,
  payload: Partial<IProfile>
): Promise<IProfile | null> => {
  const isProfileExist = await Profile.findById(id);
  if (user?.userId !== isProfileExist?.user) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are forbidden');
  }
  const result = await Profile.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteFromDB = async (id: string, user: JwtPayload): Promise<void> => {
  const isProfileExist = await Profile.findById(id);
  if (user?.userId !== isProfileExist?.user) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are forbidden');
  }
  await Profile.findByIdAndDelete(id);
};

export const ProfileService = {
  insertIntoDB,
  getSingleFromDB,
  updateFromDB,
  deleteFromDB,
};
