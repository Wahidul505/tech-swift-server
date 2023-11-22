import { ICategory } from './category.interface';
import { Category } from './category.model';

const insertIntoDB = async (payload: ICategory): Promise<ICategory> => {
  const result = await Category.create(payload);
  return result;
};

const getAllFromDB = async (): Promise<ICategory[]> => {
  const result = await Category.find();
  return result;
};

const getSingleFromDB = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findById(id);
  return result;
};

const updateFromDB = async (
  id: string,
  payload: Partial<ICategory>
): Promise<ICategory | null> => {
  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<void> => {
  await Category.findByIdAndDelete(id);
};

export const CategoryService = {
  insertIntoDB,
  getAllFromDB,
  getSingleFromDB,
  updateFromDB,
  deleteFromDB,
};
