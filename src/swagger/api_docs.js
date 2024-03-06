import { signUp, logIn, signUpBody, logInBody } from "./users.js";
import { addProduct, getAllProduct, getOneProduct, updateProduct, deleteProduct, productBody } from "./products.js";
import { addPizzaToCart, viewCart, updateCartItem, deleteCartItem, cartItemSchema } from "./cart.js";
import { placeOrder, orderHistory, orderDetails, orderSchema } from "./orders.js";

export const apiDocumentation = {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        description: "API for Pizza-Shop Application [Live App](https://pizza-shop-250e2.web.app/)",
        title: "Pizza-Shop API - Documentation",
        contact: {
            name: "Chandrahas Patel",
            email: "chandrahaspatel32@gmail.com"
        },
        // license: {
        //     name: 'Apache 2.0',
        //     url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
        // },
    },
    servers: [
        {
            url: process.env.HOST_URL,
            description: "Production Server",
        },
        {
            // url: "http://localhost:3000",
            url: process.env.BASE_URL,
            description: "Local Server"
        },
    ],
    "components": {
        "securitySchemes": {
            "JWT": {
                "in": "header",
                "name": "Authorization",
                "type": "apiKey"
            }
        },
        "schemas": {
            signUpBody,
            logInBody,
            productBody,
            cartItemSchema,
            orderSchema
        }
    },
    tags: [
        {
          name: 'Users',
        },
        {
          name: 'Products'
        },
        {
          name: 'Cart'
        },
        {
          name: 'Orders'
        }
    ],
    paths: {
        "/api/users/signup": {
            post: signUp
        },
        "/api/users/signin": {
            post: logIn
        },
        // "/api/users/resetPassword": {

        // },
        "/api/products": {
            post: addProduct,
            get: getAllProduct,
        },
        "/api/products/{product_Id}": {
            get: getOneProduct,
            patch: updateProduct,
            delete: deleteProduct
        },
        "/api/cart/{productId}": {
            post: addPizzaToCart
        },
        "/api/cart": {
            get: viewCart
        },
        "/api/cart/{cartItemId}": {
            patch: updateCartItem,
            delete: deleteCartItem
        },
        
        "/api/order": {
            post: placeOrder,
            get: orderHistory
        },
        "/api/order/{orderId}": {
            get: orderDetails
        }
    }
}
