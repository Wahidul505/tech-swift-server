import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { WishListController } from './wishList.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  WishListController.insertIntoDB
);

router.get(
  '/:userId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  WishListController.getSingleFromDB
);

export const WishListRoutes = router;
