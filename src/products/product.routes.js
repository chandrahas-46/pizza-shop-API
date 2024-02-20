// 1. Import express.
import express from 'express';
import ProductController from './product.controller.js';
import ProductExternalDataController from './product.externalDataController.js';

// 2. Initialize Express router.
const productRouter = express.Router();
const productController = new ProductController();
const productExternalDataController = new ProductExternalDataController();

// All the paths to the controller methods.
productRouter.post('/add', productExternalDataController.fetchAndSaveToMongoDB);
productRouter.post('/', productController.addProduct);
productRouter.get('/', productController.getAllProducts);
productRouter.get('/:_id', productController.getOneProducts);
productRouter.patch('/:_id', productController.updateProduct);
productRouter.delete('/:_id', productController.deleteProduct);


export default productRouter;
