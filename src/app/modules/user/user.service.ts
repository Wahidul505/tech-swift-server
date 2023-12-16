import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IFilters, IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { userSearchableFields } from './user.constants';
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
    role: result?.role,
    userId: result?._id,
    email: result?.email,
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
    role: isUserExist?.role,
    userId: isUserExist?._id,
    email: isUserExist?.email,
  };

  const token = jwtHelpers.createToken(
    userInfo,
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );
  return token;
};

const getAllFromDB = async (
  filters: IFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const UserService = {
  register,
  login,
  getAllFromDB,
};
