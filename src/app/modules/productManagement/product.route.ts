import express from 'express';
import { productController } from './product.controller';
import { USER_ACCESS_ROLE } from '../auth/auth.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/add-product', productController.addProductData);
router.get('/',  productController.getAllProductData);
router.put('/delete-product', productController.deleteProductData);
router.put('/update-product', productController.updateProductData);
// auth(USER_ROLE.superAdmin, USER_ROLE.admin),

export const productRoutes = router;
