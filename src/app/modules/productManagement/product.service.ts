import { TProduct } from './product.interface';
import { Product } from './product.model';

const addProductDataIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductDataFromDB = async () => {
  const result = await Product.find({ isDeleted: false });
  return result;
};


const deletedProductIntoDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};
const updateProductIntoDB = async (id: string, bookInfo: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, { ...bookInfo});
  return result;
};
export const productServices = {
  addProductDataIntoDB,
  getAllProductDataFromDB,
  deletedProductIntoDB,
  updateProductIntoDB
};
