import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { paymentService } from './payment.service';

const paymentSuccess = catchAsync(async (req, res) => {
  const tranId = req.params.tranId;
  // console.log('Transaction ID:', tranId);
  await paymentService.paymentSuccessfullIntoDB(tranId);

  res.redirect(`http://localhost:5174/payment-successful/${req.params.tranId}`);
});
const paymentFailed = catchAsync(async (req, res) => {
  res.redirect(`http://localhost:5174/payment-failed/${req.params.tranId}`);
});

const getAdminOrderData = catchAsync(async (req, res) => {
  // console.log(req.body);
  const result = await paymentService.getAdminOrderDataFromDB(req.body.email);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order Data retrived successfully',
    data: result,
  });
});
const getUserOrderData = catchAsync(async (req, res) => {
  // console.log(req.body);
  const result = await paymentService.getUserOrderDataFromDB(req.body.email);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order Data retrieved successfully',
    data: result,
  });
});
const changeOrderStatus = catchAsync(async (req, res) => {
  const {id,orderStatus} = req.body
  // console.log(req.body);
  const result = await paymentService.changeOrderStatusIntoDB(id,orderStatus);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order cenceled successfully',
    data: result,
  });
});
const DeleteOrder = catchAsync(async (req, res) => {
  // console.log(req.body);
  const result = await paymentService.deleteOrderFromDB(req.body.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order deleted successfully',
    data: result,
  });
});

export const paymentController = {
  paymentSuccess,
  paymentFailed,
  getAdminOrderData,
  getUserOrderData,
  changeOrderStatus,
  DeleteOrder
};
