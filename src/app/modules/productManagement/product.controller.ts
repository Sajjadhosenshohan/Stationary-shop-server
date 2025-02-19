import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { productServices } from './product.service';

const addProductData = catchAsync(async (req, res) => {
  const result = await productServices.addProductDataIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product data added successfully',
    data: result,
  });
});
const getAllProductData = catchAsync(async (req, res) => {
  const result = await productServices.getAllProductDataFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'products data retrieved successfully',
    data: result,
  });
});

const deleteProductData = catchAsync(async (req, res) => {
  // console.log(req.body.id);
  const result = await productServices.deletedProductIntoDB(req.body.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product data deleted successfully',
    data: result,
  });
});
const updateProductData = catchAsync(async (req, res) => {
  const result = await productServices.updateProductIntoDB(req.body.BookId,req.body.bookInfo);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product data updated successfully',
    data: result,
  });
});

export const productController = {
  addProductData,
  getAllProductData,
  deleteProductData,
  updateProductData,
};
