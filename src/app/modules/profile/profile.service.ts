import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { checkUserMatch } from '../../../utils/checkUserMatched';
import { IProfile } from './profile.interface';
import { Profile } from './profile.model';

const getSingleFromDB = async (
  userId: string,
  user: JwtPayload
): Promise<IProfile | null> => {
  checkUserMatch(userId, user?.userId);
  const result = await Profile.findOne({ user: userId });
  return result;
};

const updateFromDB = async (
  userId: string,
  user: JwtPayload,
  payload: Partial<IProfile>
): Promise<IProfile | null> => {
  const isProfileExist = await Profile.findOne({ user: userId });

  let result;
  if (!isProfileExist) {
    console.log(payload);
    result = await Profile.create(payload);
  }
  checkUserMatch(user?.userId, isProfileExist?.user);
  result = await Profile.findOneAndUpdate({ user: userId }, payload, {
    new: true,
  });
  return result;
};

const deleteFromDB = async (
  userId: string,
  user: JwtPayload
): Promise<void> => {
  const isProfileExist = await Profile.findOne({ user: userId });
  if (!isProfileExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Profile does not exist');
  }
  checkUserMatch(user?.userId, isProfileExist?.user);
  await Profile.findOneAndDelete({ user: userId });
};

export const ProfileService = {
  getSingleFromDB,
  updateFromDB,
  deleteFromDB,
};
