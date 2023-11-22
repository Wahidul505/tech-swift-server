import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/', ProductController.insertIntoDB);
router.get('/', ProductController.getAllFromDB);
router.get('/:id', ProductController.getSingleFromDB);
router.patch('/:id', ProductController.updateFromDB);
router.delete('/:id', ProductController.deleteFromDB);

export const ProductRoutes = router;
