import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { IWishList } from './wishList.interface';
import { WishList } from './wishList.model';

const insertIntoDB = async (
  user: JwtPayload,
  payload: IWishList
): Promise<IWishList> => {
  const isWishListExist = await WishList.findOne({ user: user?.userId });
  if (isWishListExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You already have a wish list');
  }
  payload.user = user?.userId;
  const result = await WishList.create(payload);
  return result;
};

const getSingleFromDB = async (user: JwtPayload): Promise<IWishList | null> => {
  const result = await WishList.findOne({ user: user?.userId }).populate(
    'products.productId'
  );
  return result;
};

const updateFromDB = async (
  id: string,
  user: JwtPayload,
  payload: Partial<IWishList>
): Promise<IWishList | null> => {
  const result = await WishList.findOneAndUpdate(
    { _id: id, user: user?.userId },
    payload,
    {
      new: true,
    }
  ).populate('products.productId');
  return result;
};

export const WishListService = {
  insertIntoDB,
  getSingleFromDB,
  updateFromDB,
};
