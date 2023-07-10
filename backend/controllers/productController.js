import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@desc Fetch all products
//@desc GET  /api/products
//@desc Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc Fetch all product
//@desc GET  /api/product/:id
//@desc Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

//@desc Delete a product
//@desc DELETE  /api/product/:id
//@desc Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

export { getProducts, getProductById, deleteProduct };
