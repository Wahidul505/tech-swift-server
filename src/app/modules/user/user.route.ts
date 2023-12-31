import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDB);

export const UserRoutes = router;
