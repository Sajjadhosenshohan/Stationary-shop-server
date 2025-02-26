import express from 'express';
import { productController } from './product.controller';
import { USER_ACCESS_ROLE } from '../auth/auth.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/add-product',auth(USER_ACCESS_ROLE.admin), productController.addProductData);
router.get('/',  productController.getAllProductData);
router.get('/:productId',  productController.getAProductData);
router.put('/delete-product',auth(USER_ACCESS_ROLE.admin,USER_ACCESS_ROLE.user), productController.deleteProductData);
router.put('/update-product',auth(USER_ACCESS_ROLE.admin,USER_ACCESS_ROLE.user), productController.updateProductData);

export const productRoutes = router;
