import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ICategory } from './category.interface';
import { CategoryService } from './category.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.insertIntoDB(req.body);
  sendResponse<ICategory>(res, {
    success: true,
    message: 'Category created',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllFromDB();
  sendResponse<ICategory[]>(res, {
    success: true,
    message: 'Categories fetched',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getSingleFromDB(req.params.id);
  sendResponse<ICategory>(res, {
    success: true,
    message: 'Category fetched',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await CategoryService.updateFromDB(id, payload);
  sendResponse<ICategory>(res, {
    success: true,
    message: 'Category updated',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  await CategoryService.deleteFromDB(id);
  sendResponse<ICategory>(res, {
    success: true,
    message: 'Category deleted',
    statusCode: httpStatus.OK,
  });
});

export const CategoryController = {
  insertIntoDB,
  getAllFromDB,
  getSingleFromDB,
  updateFromDB,
  deleteFromDB,
};
