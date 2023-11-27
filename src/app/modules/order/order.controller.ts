import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { paginationFields } from '../../../constants/pagination';
import { IFilters } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { orderFilterableFields } from './order.constants';
import { IOrder } from './order.interface';
import { OrderService } from './order.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.insertIntoDB(
    req.body,
    req.user as JwtPayload
  );
  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order confirmed',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, orderFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await OrderService.getAllFromDB(
    filters as IFilters,
    paginationOptions
  );
  sendResponse<IOrder[]>(res, {
    success: true,
    message: 'Orders fetched',
    statusCode: httpStatus.OK,
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getSingleFromDB(req.params.id as string);
  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched',
    data: result,
  });
});

const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.params?.userId;
  const result = await OrderService.getMyOrders(userId, req.user as JwtPayload);
  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Orders fetched',
    data: result,
  });
});

const getMySingleOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getMySingleOrder(
    req.params.id,
    req.user as JwtPayload
  );
  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Order fetched',
    data: result,
  });
});

export const OrderController = {
  insertIntoDB,
  getAllFromDB,
  getSingleFromDB,
  getMyOrders,
  getMySingleOrder,
};
