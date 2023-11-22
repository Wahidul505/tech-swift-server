import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/', CategoryController.insertIntoDB);
router.get('/', CategoryController.getAllFromDB);
router.get('/:id', CategoryController.getSingleFromDB);
router.patch('/:id', CategoryController.updateFromDB);
router.delete('/:id', CategoryController.deleteFromDB);

export const CategoryRoutes = router;
