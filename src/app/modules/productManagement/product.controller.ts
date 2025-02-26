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
const getAProductData = catchAsync(async (req, res) => {
  const {productId} = req.params;
  console.log(productId)
  const result = await productServices.getAProductDataFromDB(productId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'product data retrieved successfully',
    data: result,
  });
});

const getAllProductData = catchAsync(async (req, res) => {
  const result = await productServices.getAllProductDataFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'products data retrieved successfully',
    data: result,
  });
});

const deleteProductData = catchAsync(async (req, res) => {
  const { productId, productInfo } = req.body;
  await productServices.updateProductIntoDB(productId, productInfo);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product data deleted successfully',
    data: null,
  });
});
const updateProductData = catchAsync(async (req, res) => {
  const result = await productServices.updateProductIntoDB(req.body.productId,req.body.productInfo);
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
  getAProductData
};
