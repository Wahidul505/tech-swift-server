import httpStatus from 'http-status';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IUser } from './user.interface';
import { User } from './user.model';

const register = async (payload: IUser): Promise<string> => {
  const isUserExist = await User.findOne({ email: payload.email });

  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
  }

  payload.role = ENUM_USER_ROLE.CUSTOMER;

  const result = await User.create(payload);

  const userInfo = {
    role: result.role,
    userId: result.id,
  };

  const token = jwtHelpers.createToken(
    userInfo,
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );

  return token;
};

const login = async (payload: Partial<IUser>): Promise<string> => {
  const isUserExist = await User.findOne({ email: payload?.email }).select(
    '+password'
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  if (isUserExist.password !== payload.password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong Password');
  }

  const userInfo = {
    role: isUserExist.role,
    userId: isUserExist.id,
  };

  const token = jwtHelpers.createToken(
    userInfo,
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );
  return token;
};

export const UserService = {
  register,
  login,
};
