import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.post('/add-product', productController.addProductData);
router.get('/',  productController.getAllProductData);
router.get('/:productId',  productController.getAProductData);
router.put('/delete-product', productController.deleteProductData);
router.put('/update-product', productController.updateProductData);
// auth(USER_ROLE.superAdmin, USER_ROLE.admin),

export const productRoutes = router;
