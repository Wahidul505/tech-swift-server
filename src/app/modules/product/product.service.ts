import { IProduct } from './product.interface';
import { Product } from './product.model';

const insertIntoDB = async (payload: IProduct): Promise<IProduct> => {
  const result = await Product.create(payload);
  return result;
};

const getAllFromDB = async (): Promise<IProduct[]> => {
  const result = await Product.find().populate('category');
  return result;
};

const getSingleFromDB = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findById(id).populate('category');
  return result;
};

const updateFromDB = async (
  id: string,
  payload: Partial<IProduct>
): Promise<IProduct | null> => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('category');
  return result;
};

const deleteFromDB = async (id: string): Promise<void> => {
  await Product.findByIdAndDelete(id);
};

export const ProductService = {
  insertIntoDB,
  getAllFromDB,
  getSingleFromDB,
  updateFromDB,
  deleteFromDB,
};
