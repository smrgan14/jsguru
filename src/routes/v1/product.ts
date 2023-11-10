import { Router } from 'express';
import { ProductController } from '../../controller/product';
import { AuthRoutes } from '../../middleware/authMiddleware';
import { FormValidation } from '../../middleware/validations/product';

const router = Router();

router
  .post(
    '/products',
    AuthRoutes.protectRoutes,
    FormValidation.validateProductForm,
    ProductController.addProduct,
  )
  .get(
    '/products',
    AuthRoutes.protectRoutes,
    ProductController.getProducts,
  )
  .get(
    '/products/:uuid',
    AuthRoutes.protectRoutes,
    ProductController.getProductByUuid,
  )
  .delete(
    '/product/:uuid',
    AuthRoutes.protectRoutes,
    ProductController.deleteProduct,
  );

export default router;
