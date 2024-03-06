import mongoose from "mongoose";
import { orderModel } from "./order.schema.js";
import { cartModel } from "../Cart/cart.schema.js";
import { getUserCartItems } from "./cartTotalAmount.js";

export default class OrderController {
    async placeOrder(req, res) {
        const userID = req.userID;       //taken from JWT payload
        const { status, shippingAddress, phone } = req.body;

        if (!shippingAddress && !phone) {
            return res.status(400).json({
                success: false,
                message: "Shipping address and phone is required."
            });
        }

        const session = await mongoose.startSession();
        
        try {
            // [ A. Start transaction ]
            session.startTransaction();

            // 1. Calculate cartItems and [ cartTotalAmount.js ]: Calculate totalAmount for each cart item.
            const userCartItems = await getUserCartItems(userID, session);
            if (userCartItems.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Your cart is now empty, Please add items into cart first."
                });
            }

            const finalTotalAmount = userCartItems.reduce((acc, item)=>acc+item.totalAmount, 0);
            if ( finalTotalAmount === 0 ) {
                return res.status(400).json({
                    success: false,
                    message: "Something went to wrong in calculating totalPrice" 
                });
            }

            // 2. Create an order record.
            // Create a new character within a transaction. Note that you **must**
            // pass an array as the first parameter to `create()` if you want to
            // specify options.
            const newOrder = await orderModel.create([{ 
                orderItems: userCartItems, 
                shippingAddress, 
                phone, 
                status, 
                totalPrice: finalTotalAmount, 
                userID 
            }], {session});
         
            // 3. Reduce the stock. [ Not Applicable here ]

            // 4. Clear the cart items.
            await cartModel.deleteMany({ userID: userID }, {session});

            // [ B. Commit and End transaction ]
            await session.commitTransaction();
            session.endSession();

            return res.status(200).send({
                success: true,
                message: "Order placed successfully!",
                Order: newOrder
            });
        }
        catch (error) {
            console.error('Error in placeOrder', error);
            // [ C. Rollback transaction on error ]
            await session.abortTransaction();
            session.endSession();
            res.status(500).send({
                success: false,
                message: 'Error in placeOrder'
            });
        }
    }


    async orderHistory(req, res) {
        const userID = req.userID;       //taken from JWT payload
        try {
            const orders = await orderModel.find({ userID: userID });
            if (orders) {
                res.status(200).send({
                    success: true,
                    message: "Here, You can find All your Orders by userID!",
                    orders: orders,
                });
            } 
            else {
                return res.status(404).send({ 
                    success: false, 
                    message: "Not Found any order!!"
                });
            }
        }
        catch (error) {
            console.error('Error in order history', error);
            res.status(500).send({
                success: false,
                message: 'Error in order history'
            });
        }
    }


    async orderDetails(req, res) {
        const order_id = req.params.id;
        const userID = req.userID;       //taken from JWT payload
        try {
            // const order = await orderModel.findById({ userID: userID, _id: order_id });
            const order = await orderModel.findOne({ _id: order_id, userID: userID });
            if (order) {
                return res.status(200).send({
                    success: true,
                    message: "Here, You can find your Order-Details by userId and order_id!!",
                    orderDetails: order,
                });
            } 
            else {
                return res.status(404).send({ 
                    success: false, 
                    message: "Order not found!"
                });
            }
        }
        catch (error) {
            console.error('Error in order details', error);
            res.status(500).send({
                success: false,
                message: 'Error in order details'
            });
        }
    }

}