import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.ADMIN), CategoryController.insertIntoDB);

router.get('/', CategoryController.getAllFromDB);

router.get('/:id', CategoryController.getSingleFromDB);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.updateFromDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteFromDB
);

export const CategoryRoutes = router;
