import express from 'express';

const router = express.Router();
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

router.get('/', getProducts);

//@desc Fetch all product
//@desc GET  /api/product/:id
//@desc Public
router.get('/:id', getProductById);

export default router;
