import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.services';

const createRegisterUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Registration successfully',
    data: result,
  });
});


const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken } = result;

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'logged in successfully!',
    data: {
      accessToken,
    },
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await AuthServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User information retrieved successfully',
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const email = req.params.email;

  const result = await AuthServices.getSingleUserFromDB(email);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User information retrieved successfully',
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const {email,...data} = req.body;
  const result = await AuthServices.updateUserInfoFromDB(email,data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});
const DeactivateAccount = catchAsync(async (req, res) => {
  // console.log(req.body.id);
  const result = await AuthServices.deactivateAccount(req.body.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Account Deactivate successfully',
    data: result,
  });
});
const ActivateAccount = catchAsync(async (req, res) => {
  // console.log(req.body.id);
  const result = await AuthServices.activeAccountIntoDB(req.body.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Account Activate successfully',
    data: result,
  });
});
const ChangeRole = catchAsync(async (req, res) => {

  const result = await AuthServices.changeRoleFromDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Role Changed successfully',
    data: result,
  });
});

export const AuthController = {
  createRegisterUser,
  loginUser,
  getAllUser,
  DeactivateAccount,
  ActivateAccount,
  ChangeRole,
  getSingleUser,
  updateUser
};
