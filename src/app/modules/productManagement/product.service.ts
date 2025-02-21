import QueryBuilder from '../../builder/QueryBuilder';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const addProductDataIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductDataFromDB = async (query: Record<string, unknown>) => {
  // const result = await Product.find({ isDeleted: false });
  // return result;

  const courseQuery = new QueryBuilder(
    Product.find(),
    query,
  )
    .search(["title", "author", "category"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();

  return {
    meta,
    result,
  };
};


const deletedProductIntoDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(id, { isDeleted: true });
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
  updateProductIntoDB
};
