import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';

const router = express.Router();

router.get(
  '/my-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.getMyOrders
);

router.get(
  '/my-order/:id',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.getMySingleOrder
);

router.post('/', auth(ENUM_USER_ROLE.CUSTOMER), OrderController.insertIntoDB);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderController.getAllFromDB);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), OrderController.getSingleFromDB);

export const OrderRoutes = router;
