import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';

export const checkUserMatch = (jwtUser: string, dbUser: any) => {
  if (jwtUser !== dbUser) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are forbidden');
  }
  return;
};
