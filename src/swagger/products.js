import { internalServerError } from "./common.js";

const invalidProductData = {
    description: 'Invalid Data provided',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'The fields field1, field2 and field3 are required',
            },
          },
        },
      },
    },
};

// ************* [ BODY Parameters ] *************
export const productBody = {
    type: "object",
    properties: {
        name: {
            type: "string",
            example: "Margarita Pizza",
        },
        type: {
            type: 'string',
            example: 'Veg/Non-Veg',
        },
        price: {
            type: "object",
            example: {
                size: {
                    small: 100,
                    medium: 150,
                    large: 200
                }
            }
        },
        tags: {
            type: ["string"],
            example: ["tag1", "tag2"],
        },
        
        image: {
            type: 'string',
            example: 'image_link || This is optional'
        }      
    },
    required: ['name', 'price']
}

// ******************************************************************************
export const addProduct = {
    tags: ["Products"], 
    description: "Creates a pizza",
    // security: [{ "JWT": {} }],
    requestBody: {
        required: true,
        content: {
            "application/json":{
                schema: {
                    $ref: '#/components/schemas/productBody',
                }
            }
        }
    },
    responses: {
        '201': {
          description: 'Create Product',
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
                        example: "Product created successfully"
                    },
                    product: {
                        type: 'object',
                        example: {
                            "_id": "65e221cba2ce041be19ad3e6",
                            "name": "Burger Pizza",
                            "price": {
                                "size": {
                                    "small": 100,
                                    "medium": 200,
                                    "large": 300
                                }
                            },
                            "type": "Veg",
                            "tags": [
                                "pizza",
                                "spicy",
                                "salad",
                                "snacks"
                            ],
                            "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
                            "dateCreated": "2024-03-01T18:43:23.862Z"
                        }
                    }
                }
              }
            },
          },
        },
        '400': invalidProductData,
        '500': internalServerError,
      }
}

// ***********************************************************************
export const getAllProduct = {
    tags: ["Products"], 
    description: "Get all pizzas",
    responses: {
        '200': {
            description: 'Get All products',
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
                                example: "Get all Products successfully"
                            },
                            products: {
                                type: 'array',
                                example: [{
                                    "_id": "65e221cba2ce041be19ad3e6",
                                    "name": "Burger Pizza",
                                    "price": {
                                        "size": {
                                            "small": 100,
                                            "medium": 200,
                                            "large": 300
                                        }
                                    },
                                    "type": "Veg",
                                    "tags": [
                                        "pizza",
                                        "spicy",
                                        "salad",
                                        "snacks"
                                    ],
                                    "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
                                    "dateCreated": "2024-03-01T18:43:23.862Z"
                                },
                                {
                                    "_id": "65e22904181b7a2ee35fe1e4",
                                    "name": "Chicken Burger Pizza",
                                    "price": {
                                        "size": {
                                            "small": 100,
                                            "medium": 200,
                                            "large": 300
                                        }
                                    },
                                    "type": "Non-Veg",
                                    "tags": [
                                        "pizza",
                                        "salad",
                                        "snacks"
                                    ],
                                    "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
                                    "dateCreated": "2024-03-01T19:14:12.461Z"
                                }]
                            },
                            
                        }
                    }
                }
            }
        },
        '400': {
            description: 'Not Found any product',
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
                            example: 'Not Found any product, You can add new Product',
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
export const getOneProduct = {
    tags: ["Products"], 
    description: "Get pizzas by its ID",
    parameters: [
        {
            in: "path",
            name: "product_Id",
            required: true,
            description: "ID of the product",
            schema: {
                type: "string"
            }
        }
    ],
    // parameters: [
    //     {
    //       name: 'arg',
    //       in: 'query',
    //       description: 'argument',
    //       required: true,
    //       type: 'string',
    //     }
    // ],
    responses: {
        '200': {
            description: 'Get product by product ID',
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
                                example: "Get Product successfully"
                            },
                            products: {
                                type: 'object',
                                example: {
                                    "_id": "65e221cba2ce041be19ad3e6",
                                    "name": "Burger Pizza",
                                    "price": {
                                        "size": {
                                            "small": 100,
                                            "medium": 200,
                                            "large": 300
                                        }
                                    },
                                    "type": "Veg",
                                    "tags": [
                                        "pizza",
                                        "spicy",
                                        "salad",
                                        "snacks"
                                    ],
                                    "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
                                    "dateCreated": "2024-03-01T18:43:23.862Z"
                                }
                            },
                            
                        }
                    }
                }
            }
        },
        '400': {
            description: 'Not Found searched product',
            content: {
                'application/json': {
                    schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Not Found searched product',
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
export const updateProduct = {
    tags: ["Products"], 
    description: "Update Product by its ID and body parameter",
    parameters: [
        {
            in: "path",
            name: "product_Id",
            required: true,
            description: "ID of the product",
            schema: {
                type: "string"
            }
        }
    ],
    requestBody: {
        description: "Keep only those attributes which you want to update",
        required: true,
        content: {
            "application/json":{
                schema: {
                    $ref: '#/components/schemas/productBody',
                }
            }
        }
    },
    responses: {
        '200': {
            description: 'Update Product',
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
                                example: "Product updated successfully"
                            },
                            products: {
                                type: 'object',
                                example: {
                                    "_id": "65e221cba2ce041be19ad3e6",
                                    "name": "updated Burger Pizza",
                                    "price": {
                                        "size": {
                                            "small": 100,
                                            "medium": 200,
                                            "large": 300
                                        }
                                    },
                                    "type": "Veg",
                                    "tags": [
                                        "pizza",
                                        "spicy",
                                        "salad",
                                        "snacks"
                                    ],
                                    "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
                                    "dateCreated": "2024-03-01T18:43:23.862Z"
                                }
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
export const deleteProduct = {
    tags: ["Products"], 
    description: "Delete Product by its ID",
    parameters: [
        {
            in: "path",
            name: "product_Id",
            required: true,
            description: "ID of the product",
            schema: {
                type: "string"
            }
        }
    ],
    responses: {
        '200': {
            description: 'Delete Product',
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
                                example: "Product deleted successfully"
                            }                            
                        }
                    }
                }
            }
        },
        '500': internalServerError
    }
}
