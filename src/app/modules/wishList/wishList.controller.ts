import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IWishList } from './wishList.interface';
import { WishListService } from './wishList.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user as JwtPayload;
  const payload = req?.body;
  const result = await WishListService.insertIntoDB(user, payload);
  sendResponse<IWishList>(res, {
    success: true,
    message: 'Wish list updated',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user as JwtPayload;
  const userId = req?.params?.userId;
  const result = await WishListService.getSingleFromDB(userId, user);
  sendResponse<IWishList>(res, {
    success: true,
    message: 'Wish list fetched',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const WishListController = {
  insertIntoDB,
  getSingleFromDB,
};
