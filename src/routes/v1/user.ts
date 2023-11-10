import { Router } from 'express';
import { UserController } from '../../controller/user';
import { FormValidation } from '../../middleware/validations/user';

const router = Router();

router
  .post(
    '/user/register',
    FormValidation.validateUserForm,
    UserController.addUser,
  )
  .post(
    '/user/login',
    UserController.login,
  );

export default router;
