import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IProduct } from './product.interface';
import { ProductService } from './product.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.insertIntoDB(req.body);
  sendResponse<IProduct>(res, {
    success: true,
    message: 'Product created',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllFromDB();
  sendResponse<IProduct[]>(res, {
    success: true,
    message: 'Products fetched',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getSingleFromDB(req.params.id);
  sendResponse<IProduct>(res, {
    success: true,
    message: 'Product fetched',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await ProductService.updateFromDB(id, payload);
  sendResponse<IProduct>(res, {
    success: true,
    message: 'Product updated',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  await ProductService.deleteFromDB(id);
  sendResponse<IProduct>(res, {
    success: true,
    message: 'Product deleted',
    statusCode: httpStatus.OK,
  });
});

export const ProductController = {
  insertIntoDB,
  getAllFromDB,
  getSingleFromDB,
  updateFromDB,
  deleteFromDB,
};
