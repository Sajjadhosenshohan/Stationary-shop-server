import express from 'express';
import { paymentController } from './payment.controller';

const router = express.Router();

router.post('/success/:tranId', paymentController.paymentSuccess);
router.post('/failed/:tranId', paymentController.paymentFailed);
router.post('/get-admin-order-data', paymentController.getAdminOrderData);
router.post('/get-user-order-data', paymentController.getUserOrderData);
router.put('/change-order-status', paymentController.changeOrderStatus);
router.put('/delete-order', paymentController.DeleteOrder);
export const paymentRoutes = router;
