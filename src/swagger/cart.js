import { internalServerError } from "./common.js";

// ************* [ BODY Parameters ] *************
export const cartItemSchema = {
    type: "object",
    properties: {
        productID: {
            type: "string",
            example: "65e221cba2ce041be19ad3e6",
        },
        userID: {
            type: 'string',
            example: '65e6ec97349192bc39ad76df',
        },
        size: {
            type: "string",
            enum: ['small', 'medium', 'large'],
            example: 'small'
        },
        quantity: {
            type: "number",
            example: 1,
        }   
    }
}

const cartItemBody = {
    type: "object",
    properties: {
        size: {
            type: "string",
            enum: ['small', 'medium', 'large'],
            example: 'small'
        },
        quantity: {
            type: "number",
            example: 1,
        }   
    }
}


// ******************************************************************************
export const addPizzaToCart = {
    tags: ["Cart"], 
    description: "Add a pizza into cart",
    security: [{ "JWT": {} }],
    parameters: [
        {
            in: "path",
            name: "productId",
            required: true,
            description: "ID of the product",
            // default: "1111",
            schema: {
                type: "string"
            }
        }
    ],
    requestBody: {
        required: true,
        content: {
            "application/json":{
                schema: cartItemBody
            }
        }
    },
    responses: {
        '201': {
          description: 'Add item into cart',
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
                        example: "Cart item added successfully"
                    },
                    cartItem: {
                        type: 'object',
                        example: {
                            "_id": "65e841ba0c9ce2e2d23e55a1",
                            "productID": "65e221cba2ce041be19ad3e6",
                            "userID": "65e210ac8cb8ee68b255d1c1",
                            "size": "small",
                            "quantity": 1,
                            "cartDate": "2024-03-06T10:13:14.203Z"
                        }
                    }
                }
              }
            },
          },
        },
        '500': internalServerError,
    }
}

// ***********************************************************************
export const viewCart = {
    tags: ["Cart"], 
    description: "Get all cart's item",
    security: [{ "JWT": {} }],
    responses: {
        '200': {
            description: 'View cart items',
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
                                example: "View cart items successfully"
                            },
                            cart: {
                                type: 'array',
                                example: [{
                                    "_id": "65e841ba0c9ce2e2d23e55a1",
                                    "productInfo": {
                                        "price": {
                                            "size": {
                                                "small": 100,
                                                "medium": 200,
                                                "large": 300
                                            }
                                        },
                                        "_id": "65e221cba2ce041be19ad3e6",
                                        "name": "Burger Pizza",
                                        "type": "Veg",
                                        "tags": [
                                            "pizza",
                                            "spicy",
                                            "salad",
                                            "snacks"
                                        ],
                                        "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
                                        "dateCreated": "2024-03-01T18:43:23.862Z",
                                    },
                                    "userID": "65e210ac8cb8ee68b255d1c1",
                                    "size": "large",
                                    "quantity": 4,
                                    "cartDate": "2024-03-06T10:13:14.203Z"
                                },]
                            },
                            
                        }
                    }
                }
            }
        },
        '500': internalServerError
    }
}

// ***********************************************************************
export const updateCartItem = {
    tags: ["Cart"], 
    description: "Update Cart item by its ID and body parameter",
    security: [{ "JWT": {} }],
    parameters: [
        {
            in: "path",
            name: "cartItemId",
            required: true,
            description: "ID of the cartItem",
            schema: {
                type: "string"
            }
        }
    ],
    requestBody: {
        required: true,
        content: {
            "application/json":{
                schema: {
                    type: "object",
                    properties: {
                        quantity: {
                            type: "number",
                            example: 1,
                        }   
                    }
                }
            }
        }
    },
    responses: {
        '200': {
            description: 'Update Cart item',
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
                                example: "Cart item updated successfully"
                            },
                            cart: {
                                type: 'array',
                                example: [{
                                    "_id": "65e841ba0c9ce2e2d23e55a1",
                                    "productInfo": {
                                        "price": {
                                            "size": {
                                                "small": 100,
                                                "medium": 200,
                                                "large": 300
                                            }
                                        },
                                        "_id": "65e221cba2ce041be19ad3e6",
                                        "name": "Burger Pizza",
                                        "type": "Veg",
                                        "tags": [
                                            "pizza",
                                            "spicy",
                                            "salad",
                                            "snacks"
                                        ],
                                        "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
                                        "dateCreated": "2024-03-01T18:43:23.862Z",
                                    },
                                    "userID": "65e210ac8cb8ee68b255d1c1",
                                    "size": "large",
                                    "quantity": 4,
                                    "cartDate": "2024-03-06T10:13:14.203Z"
                                },]
                            },                            
                        }
                    }
                }
            }
        },
        '404': {
            description: 'Cart item not found',
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
                            example: 'Cart item not found || Recheck your id',
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
export const deleteCartItem = {
    tags: ["Cart"], 
    description: "Delete cartItem by its ID",
    security: [{ "JWT": {} }],
    parameters: [
        {
            in: "path",
            name: "cartItemId",
            required: true,
            description: "ID of the cartItem",
            schema: {
                type: "string"
            }
        }
    ],
    responses: {
        '200': {
            description: 'Delete cartItem',
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
                                example: "cartItem deleted successfully"
                            }                            
                        }
                    }
                }
            }
        },
        '400': {
            description: 'Cart item not found',
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
                            example: 'Cart item not found || Already deleted',
                        },
                    },
                    },
                },
            }
        },
        '500': internalServerError
    }
}