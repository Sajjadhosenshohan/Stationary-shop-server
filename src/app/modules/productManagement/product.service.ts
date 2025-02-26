import QueryBuilder from '../../builder/QueryBuilder';
import { TOrderProduct } from '../PaymentMangement/payment.interface';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const addProductDataIntoDB = async (payload: TOrderProduct) => {
  console.log(payload)
  const result = await Product.create(payload);
  console.log(result)
  return result;
};

const getAllProductDataFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Product.find({ isDeleted: false }),
    query
  )
    .search(["title", "authorName", "category"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await courseQuery.countTotal(); 
  const result = await courseQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getAProductDataFromDB = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};


const deletedProductIntoDB = async (id: string, productInfo: Partial<TProduct>) => {
  // Update product by setting isDeleted to true
  const result = await Product.findByIdAndUpdate(id, { ...productInfo }, { new: true });
  return result;
};
const updateProductIntoDB = async (id: string, productInfo: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, { ...productInfo }, { new: true });
  return result;
};
export const productServices = {
  addProductDataIntoDB,
  getAllProductDataFromDB,
  deletedProductIntoDB,
  updateProductIntoDB,
  getAProductDataFromDB
};
