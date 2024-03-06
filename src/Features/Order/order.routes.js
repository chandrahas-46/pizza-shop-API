// 1. Import express.
import express from 'express';
import OrderController from './order.controller.js';

// 2. Initialize Express router.
const orderRouter = express.Router();
const orderController = new OrderController();

// All the paths to the controller methods.
// localhost/api/order
orderRouter.post('/', orderController.placeOrder);
// orderRouter.patch('/:id', orderController.updateOrder);
orderRouter.get('/', orderController.orderHistory);
orderRouter.get('/:id', orderController.orderDetails);

export default orderRouter;
