import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';

const router = express.Router();

router.get(
  '/my-order/:userId',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.getMyOrders
);

router.get(
  '/my-order-single/:id',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.getMySingleOrder
);

router.post('/', auth(ENUM_USER_ROLE.CUSTOMER), OrderController.insertIntoDB);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderController.getAllFromDB);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), OrderController.getSingleFromDB);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), OrderController.proceedOrder);

export const OrderRoutes = router;
