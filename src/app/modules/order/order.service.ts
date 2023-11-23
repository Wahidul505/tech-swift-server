import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { SortOrder } from 'mongoose';
import Stripe from 'stripe';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IFilters, IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Product } from '../product/product.model';
import { orderSearchableFields } from './order.constants';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const stripe = new Stripe(config.stripe_sk as string);

const insertIntoDB = async (
  payload: IOrder,
  user: JwtPayload
): Promise<IOrder> => {
  let totalPrice = 0;

  payload.user = user?.userId;

  if (payload?.products?.length < 1) {
    payload.totalPrice = totalPrice;
  } else {
    const orderedProducts = await Promise.all(
      payload.products.map(async product => {
        const productData = await Product.findById(product?.productId).lean();
        const price = productData?.price;
        return {
          price: price as number,
          quantity: product?.quantity,
        };
      })
    );

    // Calculate total price
    const calculatedTotalPrice = orderedProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    // +10 dollar for delivery charge
    totalPrice = Number(calculatedTotalPrice.toFixed(2)) + 10;
  }
  payload.totalPrice = totalPrice;

  if (payload?.payment === 'gateway') {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: payload?.totalPrice * 100,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    if (!paymentIntent.client_secret) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to make payment');
    }

    payload.transactionId = paymentIntent.client_secret;
  }

  payload.status = 'confirmed';

  const result = await Order.create(payload);
  return result;
};

const getAllFromDB = async (
  filters: IFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IOrder[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: orderSearchableFields.map(field => ({
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

  const result = await Order.find(whereConditions)
    .populate('products.productId')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFromDB = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById(id)
    .populate('user')
    .populate('products.productId');
  return result;
};

const getMyOrders = async (user: JwtPayload): Promise<IOrder[] | null> => {
  const result = await Order.find({ user: user?.userId }).populate(
    'products.productId'
  );
  return result;
};

const getMySingleOrder = async (
  id: string,
  user: JwtPayload
): Promise<IOrder | null> => {
  const result = await Order.findOne({ _id: id, user: user?.userId }).populate(
    'products.productId'
  );
  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB,
  getSingleFromDB,
  getMyOrders,
  getMySingleOrder,
};
