import { JwtPayload } from 'jsonwebtoken';
import { IWishList } from './wishList.interface';
import { WishList } from './wishList.model';

const insertIntoDB = async (
  user: JwtPayload,
  payload: IWishList
): Promise<IWishList> => {
  const isWishListExist = await WishList.findOne({ user: user?.userId });
  let result;
  if (isWishListExist) {
    result = await WishList.findOneAndUpdate({ user: user?.userId }, payload, {
      new: true,
    }).populate('products.productId');
  }
  payload.user = user?.userId;
  result = await WishList.create(payload);
  return result;
};

const getSingleFromDB = async (
  userId: string,
  user: JwtPayload
): Promise<IWishList | null> => {
  console.log(user?.userId);
  const result = await WishList.findOne({ user: userId }).populate(
    'products.productId'
  );
  return result;
};

export const WishListService = {
  insertIntoDB,
  getSingleFromDB,
};
