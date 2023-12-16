import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { IFilters } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from './user.constants';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.register(req.body);
  sendResponse<string>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Account created!',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.login(req.body);
  sendResponse<string>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await UserService.getAllFromDB(
    filters as IFilters,
    paginationOptions
  );
  sendResponse<IUser[]>(res, {
    success: true,
    message: 'Users fetched',
    statusCode: httpStatus.OK,
    meta: result.meta,
    data: result.data,
  });
});

export const UserController = {
  register,
  login,
  getAllFromDB,
};
