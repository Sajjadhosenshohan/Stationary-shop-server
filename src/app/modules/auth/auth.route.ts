import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validation';
import { AuthValidation } from './auth.validation';

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

router.post('/admin/block-user', AuthController.DeactivateAccount);
router.post('/admin/make-active-user', AuthController.ActivateAccount);

router.get('/admin/get-all-user', AuthController.getAllUser);

router.post('/admin/change-user-role', AuthController.ChangeRole);

export const AuthRoutes = router;
