import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const UserController = {
  register,
  login,
};
