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
  console.log(isProfileExist);
  if (!isProfileExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Profile does not exist');
  }
  checkUserMatch(user?.userId, isProfileExist?.user);
  const result = await Profile.findOneAndUpdate({ user: userId }, payload, {
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
  insertIntoDB,
  getSingleFromDB,
  updateFromDB,
  deleteFromDB,
};
