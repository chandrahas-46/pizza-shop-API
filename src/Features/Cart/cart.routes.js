// 1. Import express.
import express from 'express';
import CartController from './cart.controller.js';

// 2. Initialize Express router.
const cartRouter = express.Router();
const cartController = new CartController();

// All the paths to the controller methods.
// localhost/api/cart
cartRouter.post('/:productId', cartController.addPizzaToCart);
cartRouter.get('/', cartController.viewCart);
cartRouter.patch('/:id', cartController.updateCart);
cartRouter.delete('/:id', cartController.deleteCart);

export default cartRouter;