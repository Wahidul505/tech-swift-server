import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.ADMIN), ProductController.insertIntoDB);

router.get('/', ProductController.getAllFromDB);

router.get('/:id', ProductController.getSingleFromDB);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ProductController.updateFromDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ProductController.deleteFromDB
);

export const ProductRoutes = router;
