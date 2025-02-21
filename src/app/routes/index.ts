import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { productRoutes } from '../modules/productManagement/product.route';
import { ssl_commerzRoutes } from '../ssl_commerz/ssl_commerz';
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
  {
    path: '/order',
    route: ssl_commerzRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
