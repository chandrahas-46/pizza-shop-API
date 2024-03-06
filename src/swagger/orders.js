import { internalServerError } from "./common.js";

// ************* [ BODY Parameters ] *************
export const orderBody = {
    type: "object",
    properties: {
        shippingAddress: {
            type: "string",
            example: "Address",
        },
        phone: {
            type: 'string',
            example: '9999888777',
        },
        status: {
            type: "string",
            enum: ['Progress', 'Shipped', 'Delivered', 'Canceled'],
            example: 'Progress'
        }, 
    },
    required: ['shippingAddress', 'phone']
}

// ******************************************************************************
export const placeOrder = {
    tags: ["Orders"], 
    description: "Place an order for all cartItems of an User || Remove all items from cart",
    security: [{ "JWT": {} }],
    requestBody: {
        required: true,
        content: {
            "application/json":{
                schema: orderBody
            }
        }
    },
    responses: {
        '201': {
          description: 'Create an Order',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: true,
                    },
                    message: {
                        type: "string",
                        example: "Order placed successfully"
                    },
                    Order: {
                        // [type: 'array'] because of [Transaction] : see (order.controller.js)
                        type: 'array',
                        example: [
                            {
                                "shippingAddress": "Bahuar",
                                "phone": "889888877",
                                "status": "Shipped",
                                "totalPrice": 1200,
                                "payment_mode": "Cash",
                                "userID": "65e210ac8cb8ee68b255d1c1",
                                "orderItems": [
                                    {
                                        "productID": "65e221cba2ce041be19ad3e6",
                                        "size": "large",
                                        "quantity": 4,
                                        "productInfo": {
                                            "name": "Burger Pizza",
                                            "price": {
                                                "size": {
                                                    "small": 100,
                                                    "medium": 200,
                                                    "large": 300
                                                }
                                            }
                                        },
                                        "totalAmount": 1200
                                    }
                                ],
                                "_id": "65e8693d2febb3308ebf1e56",
                                "orderDate": "2024-03-06T13:01:49.355Z"
                            }
                        ]
                    }
                }
              }
            },
          },
        },
        '404': {
            description: 'Check either cart is empty',
            content: {
                'application/json': {
                    schema: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false,
                        },
                        message: {
                            type: 'string',
                            example: 'Your cart is now empty, Please add items into cart first',
                        },
                    },
                    },
                },
            }
        },
        '500': internalServerError,
    }
}


// ***********************************************************************
export const orderHistory = {
    tags: ["Orders"], 
    description: "Get all orders of an User",
    security: [{ "JWT": {} }],
    responses: {
        '200': {
            description: 'View order history',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: {
                                type: 'boolean',
                                example: true,
                            },
                            message: {
                                type: "string",
                                example: "Here, You can find All your Orders"
                            },
                            orders: {
                                type: 'array',
                                example: [
                                    {
                                        "_id": "65e5d637dcb073ccc196ed8a",
                                        "shippingAddress": "Bahuar",
                                        "phone": "889888877",
                                        "status": "Shipped",
                                        "totalPrice": 400,
                                        "payment_mode": "Cash",
                                        "userID": "65e210ac8cb8ee68b255d1c1",
                                        "orderItems": [
                                            {
                                                "productID": "65e221cba2ce041be19ad3e6",
                                                "size": "medium",
                                                "quantity": 2,
                                                "productInfo": {
                                                    "name": "Burger Pizza",
                                                    "price": {
                                                        "size": {
                                                            "small": 100,
                                                            "medium": 200,
                                                            "large": 300
                                                        }
                                                    }
                                                },
                                                "totalAmount": 400
                                            }
                                        ],
                                        "orderDate": "2024-03-04T14:09:59.184Z"
                                    },
                                    {
                                        "_id": "65e8693d2febb3308ebf1e56",
                                        "shippingAddress": "Bahuar",
                                        "phone": "889888877",
                                        "status": "Shipped",
                                        "totalPrice": 1200,
                                        "payment_mode": "Cash",
                                        "userID": "65e210ac8cb8ee68b255d1c1",
                                        "orderItems": [
                                            {
                                                "productID": "65e221cba2ce041be19ad3e6",
                                                "size": "large",
                                                "quantity": 4,
                                                "productInfo": {
                                                    "name": "Burger Pizza",
                                                    "price": {
                                                        "size": {
                                                            "small": 100,
                                                            "medium": 200,
                                                            "large": 300
                                                        }
                                                    }
                                                },
                                                "totalAmount": 1200
                                            }
                                        ],
                                        "orderDate": "2024-03-06T13:01:49.355Z"
                                    }
                                ]
                            },
                            
                        }
                    }
                }
            }
        },
        '404': {
            description: 'Not Found any order',
            content: {
                'application/json': {
                    schema: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false,
                        },
                        message: {
                            type: 'string',
                            example: 'Order not found',
                        },
                    },
                    },
                },
            }
        },
        '500': internalServerError
    }
}


// ***********************************************************************
export const orderDetails = {
    tags: ["Orders"], 
    description: "Get order details by its ID",
    security: [{ "JWT": {} }],
    parameters: [
        {
            in: "path",
            name: "orderId",
            required: true,
            description: "ID of the order",
            schema: {
                type: "string"
            }
        }
    ],
    responses: {
        '200': {
            description: 'Get order details by order ID',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: {
                                type: 'boolean',
                                example: true,
                            },
                            message: {
                                type: "string",
                                example: "Get orderDetails successfully"
                            },
                            orderDetails: {
                                type: 'object',
                                example: {
                                    "_id": "65e8693d2febb3308ebf1e56",
                                    "shippingAddress": "Bahuar",
                                    "phone": "889888877",
                                    "status": "Shipped",
                                    "totalPrice": 1200,
                                    "payment_mode": "Cash",
                                    "userID": "65e210ac8cb8ee68b255d1c1",
                                    "orderItems": [
                                        {
                                            "productID": "65e221cba2ce041be19ad3e6",
                                            "size": "large",
                                            "quantity": 4,
                                            "productInfo": {
                                                "name": "Burger Pizza",
                                                "price": {
                                                    "size": {
                                                        "small": 100,
                                                        "medium": 200,
                                                        "large": 300
                                                    }
                                                }
                                            },
                                            "totalAmount": 1200
                                        }
                                    ],
                                    "orderDate": "2024-03-06T13:01:49.355Z"
                                }
                            },
                            
                        }
                    }
                }
            }
        },
        '404': {
            description: 'Not Found any order',
            content: {
                'application/json': {
                    schema: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false,
                        },
                        message: {
                            type: 'string',
                            example: 'Order not found',
                        },
                    },
                    },
                },
            }
        },
        '500': internalServerError
    }
}


// ************* [ Order Schema ] *************
export const orderSchema = {
    type: "object",
    properties: {
        shippingAddress: {
            type: "string",
            example: "Address",
        },
        phone: {
            type: 'string',
            example: '9999888777',
        },
        status: {
            type: "string",
            enum: ['Progress', 'Shipped', 'Delivered', 'Canceled'],
            example: 'Progress'
        },
        totalPrice: {
            type: "number",
            example: 1,
        },
        payment_mode: {
            type: "string",
            example: 'cash',
        },
        userID: {
            type: "string",
            example: '65e6ec97349192bc39ad76df',
        },
        orderItems: {
            type: "array",
            example: ["All cart items"]
        }
    },
    required: ['shippingAddress', 'phone', 'status', 'totalPrice', 'payment_mode', 'userID']
}