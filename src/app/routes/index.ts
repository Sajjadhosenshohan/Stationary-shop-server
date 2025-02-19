import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { productRoutes } from '../modules/productManagement/product.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/product',
    route: productRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
