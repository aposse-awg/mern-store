const express = require('express');
const upload = require('../libs/storage');
const { addProduct, getProducts, deleteProduct } = require('../controllers/productController');
const api = express.Router();

api.post('/products', upload.single('image'), addProduct);
api.get ('/products', getProducts);
api.delete('/products/:id', deleteProduct);
module.exports = api;