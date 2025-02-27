import express from 'express';
import { paymentController } from './payment.controller';
import { USER_ACCESS_ROLE } from '../auth/auth.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/success/:tranId', paymentController.paymentSuccess);
router.post('/failed/:tranId', paymentController.paymentFailed);
router.get('/get-admin-order-data', paymentController.getAdminOrderData);
router.post('/get-user-order-data',auth(USER_ACCESS_ROLE.admin,USER_ACCESS_ROLE.user), paymentController.getUserOrderData);
router.put('/change-order-status',auth(USER_ACCESS_ROLE.admin), paymentController.changeOrderStatus);
router.put('/delete-order',auth(USER_ACCESS_ROLE.admin,USER_ACCESS_ROLE.user), paymentController.DeleteOrder);
export const paymentRoutes = router;
