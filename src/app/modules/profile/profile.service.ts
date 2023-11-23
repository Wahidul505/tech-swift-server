import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { checkUserMatch } from '../../../utils/checkUserMatched';
import { IProfile } from './profile.interface';
import { Profile } from './profile.model';

const insertIntoDB = async (
  payload: IProfile,
  user: JwtPayload
): Promise<IProfile> => {
  const isProfileExist = await Profile.findOne({ user: user?.userId });
  if (isProfileExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You have already created your profile'
    );
  }
  payload.user = user?.userId;

  const result = await Profile.create(payload);

  return result;
};

const getSingleFromDB = async (user: JwtPayload): Promise<IProfile | null> => {
  const result = await Profile.findOne({ user: user?.userId });
  return result;
};

const updateFromDB = async (
  id: string,
  user: JwtPayload,
  payload: Partial<IProfile>
): Promise<IProfile | null> => {
  const isProfileExist = await Profile.findById(id);
  checkUserMatch(user?.userId, isProfileExist?.user);
  const result = await Profile.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteFromDB = async (id: string, user: JwtPayload): Promise<void> => {
  const isProfileExist = await Profile.findById(id);
  checkUserMatch(user?.userId, isProfileExist?.user);
  await Profile.findByIdAndDelete(id);
};

export const ProfileService = {
  insertIntoDB,
  getSingleFromDB,
  updateFromDB,
  deleteFromDB,
};
