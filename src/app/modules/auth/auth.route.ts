import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validation';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ACCESS_ROLE } from './auth.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);
router.post(
  '/register',
  validateRequest(AuthValidation.RegisterValidationSchema),
  AuthController.createRegisterUser,
);

router.get('/get-single-user/:email', AuthController.getSingleUser);
router.put('/update-profile-data',auth(USER_ACCESS_ROLE.admin,USER_ACCESS_ROLE.user), AuthController.updateUser);

router.post('/admin/block-user',auth(USER_ACCESS_ROLE.admin), AuthController.DeactivateAccount);
router.post('/admin/make-active-user',auth(USER_ACCESS_ROLE.admin), AuthController.ActivateAccount);

router.get('/admin/get-all-user',auth(USER_ACCESS_ROLE.admin), AuthController.getAllUser);

router.post('/admin/change-user-role',auth(USER_ACCESS_ROLE.admin), AuthController.ChangeRole);

export const AuthRoutes = router;
