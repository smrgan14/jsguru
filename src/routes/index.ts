import { Router } from 'express';
import docs from './v1/docs';
import user from './v1/user';
import product from './v1/product';

const router = Router();

router.use('/v1', docs);
router.use('/v1', user);
router.use('/v1', product);

export default router;
