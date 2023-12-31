import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IProfile } from './profile.interface';
import { ProfileService } from './profile.service';

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.params?.userId;
  const result = await ProfileService.getSingleFromDB(
    userId,
    req?.user as JwtPayload
  );
  sendResponse<IProfile>(res, {
    success: true,
    message: 'Profile fetched',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateFromDB = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const payload = req.body;
  const user = req.user as JwtPayload;
  const result = await ProfileService.updateFromDB(userId, user, payload);
  sendResponse<IProfile>(res, {
    success: true,
    message: 'Profile saved',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = req.user as JwtPayload;
  await ProfileService.deleteFromDB(userId, user);
  sendResponse<IProfile>(res, {
    success: true,
    message: 'Profile deleted',
    statusCode: httpStatus.OK,
  });
});

export const ProfileController = {
  getSingleFromDB,
  updateFromDB,
  deleteFromDB,
};
