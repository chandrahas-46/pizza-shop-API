import { cartModel } from "./cart.schema.js";
import { productModel } from "../Products/product.schema.js"

export default class CartController {
    async addPizzaToCart(req, res) {
        // If [product_id] & [userID] are not available in [Product & User] collection then catch err because [productID & userID in cart are refers to [Product & User]]
        const  product_id = req.params.productId;
        const { quantity, size } = req.body;
        const userID = req.userID;       //taken from JWT payload

        try {
            let newCartItem = await cartModel.create({ productID: product_id, userID, quantity, size });
            res.status(201).send({
                success: true,
                message: 'Cart item added successfully',
                cartItem: newCartItem
            });
        }
        catch (error) {
            console.error('Error in Add Pizza to cart', error);
            res.status(500).send({
                success: false,
                message: 'Error in Add Pizza to cart'
            });
        }
    }

    async viewCart(req, res) {
        const user_id = req.userID;       //taken from JWT payload
        try {
            // let allItems_cart = await cartModel.find();
            let allItems_cart = await cartModel.find({userID: user_id})
            .populate({ path: 'productID', model: productModel });
            // Populate the productID field with product details

            res.status(200).send({
                success: true,
                message: "Here, You can find all your cart items!",
                cart: allItems_cart
            });
        }
        catch (error) {
            console.error('Error in View Cart', error);
            res.status(500).send({
                success: false,
                message: 'Error in View Cart'
            });
        }
    }

    async updateCart(req, res) {
        const cartItem_id = req.params.id;
        const { quantity } = req.body;
        const user_id = req.userID;       //taken from JWT payload
        try {
            const updatedCartItem = await cartModel.findOneAndUpdate(
                { _id: cartItem_id, userID: user_id },
                { quantity: quantity },
                { new: true }
            );

            if (!updatedCartItem) {
                return res.status(400).send({
                    success: false,
                    message: 'Cart item not found'
                });
            }

            res.status(200).send({
                success: true,
                message: 'Cart item updated successfully',
                cart: updatedCartItem
            });
        }
        catch (error) {
            console.error('Error in update cart', error);
            res.status(500).send({
                success: false,
                message: 'Error in update cart'
            });
        }
    }


    async deleteCart(req, res) {
        const cart_id = req.params.id;   //cart_item id
        // [PENDING: use (userID) also for delete cartItem because cartItem_id may be same for two users ]
        try {
            const deletedCartItem = await cartModel.findByIdAndDelete(cart_id);

            if (!deletedCartItem) {
                return res.status(400).send({
                    success: false,
                    message: 'Cart item not found'
                });
            }
    
            res.status(200).send({
                success: true,
                message: 'Cart item deleted successfully'
            });
        } catch (error) {
            console.error('Error in Delete Cart Item', error);
            res.status(500).send({
                success: false,
                message: 'Error in Delete Cart Item'
            });
        }
    }
    
}