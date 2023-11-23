import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IProfile } from './profile.interface';
import { ProfileService } from './profile.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.insertIntoDB(
    req.body,
    req?.user as JwtPayload
  );
  sendResponse<IProfile>(res, {
    success: true,
    message: 'Profile created',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getSingleFromDB(req?.user as JwtPayload);
  sendResponse<IProfile>(res, {
    success: true,
    message: 'Profile fetched',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const user = req.user as JwtPayload;
  const result = await ProfileService.updateFromDB(id, user, payload);
  sendResponse<IProfile>(res, {
    success: true,
    message: 'Profile updated',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user as JwtPayload;
  await ProfileService.deleteFromDB(id, user);
  sendResponse<IProfile>(res, {
    success: true,
    message: 'Profile deleted',
    statusCode: httpStatus.OK,
  });
});

export const ProfileController = {
  insertIntoDB,
  getSingleFromDB,
  updateFromDB,
  deleteFromDB,
};
