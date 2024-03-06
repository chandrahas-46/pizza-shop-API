// import { json } from "express";
// ************** [ COMMON: RESPONSE BODY ] ****************
const internalServerError = {
    description: "Internal Server Error",
    content: {
        'application/json': {
            schema: {
            type: 'object',
            properties: {
                success: {
                type: "boolean",
                example: false,
                },
                message: {
                type: "string",
                example: "Internal Server Error!"
                }
            },
            },
        },
    }
}

export const signUp = {
    tags: ["Users"],
    description: "User Signup",
    requestBody: {
        content: {
            "application/json":{
                schema: {
                    $ref: '#/components/schemas/signUpBody',
                }
            },
            // Not executing correctly
            // "multipart/form-data": {
            //     schema: {
            //         $ref: '#/components/schemas/signUpBody',
            //     }
            // }
        },
        required: true,
    },
    responses: {
        '201': {
            description: "Registration Completed successfully!",
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "User created successfully"
                    }
                  },
                },
              },
            },
        },
        '400': {
            description: "Duplicate user provided",
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: {
                                type: 'boolean',
                                example: false
                            },
                            message: {
                                type: 'string',
                                example: 'User already has an account',
                            },
                        },
                    },
                },
            }           
        },
        '500': internalServerError
    }
}

export const logIn = {
    "tags": ["Users"],
    // "summary": "Login",
    "description": "Login a user using email and password || User login to get token",
    "requestBody": {
        required: true,
        "content": {
            "application/json": {
                "schema": {
                    $ref: '#/components/schemas/logInBody',
                    // ********* OR ***********
                    // "type": "object",
                    // "properties": {
                    //     "email": {
                    //         "type": "string"
                    //     },
                    //     "password": {
                    //         "type": "string"
                    //     }
                    // }
                }
            },
            // Not executing correctly
            // "multipart/form-data": {
            //     schema: {
            //         $ref: '#/components/schemas/logInBody',
            //     }
            // }
        },
    },
    "responses": {
        "200": {
            description: "User Login successfully!",
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "User Login successfully"
                    }
      
                  },
                },
              },
            }
        },
        "400": {
            description: "Incorrect Credentials",
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: "boolean",
                      example: false,
                    },
                    message: {
                      type: "string",
                      example: "Invalid Email or Password"
                    }
      
                  },
                },
              },
            }
        },
        '500': internalServerError
    }
}


// ************* [ BODY Parameters ] *************
export const signUpBody = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'Chandra',
      },
      email: {
        type: 'string',
        example: 'abc@gmail.com'
      },
      password: {
        type: 'string',
        example: 'your_password'
      },
      type: {
        type: 'string',
        enum: ['Customer', 'Seller'],  // Add enum values to match userSchema
        example: 'Customer'
      },
    //   dateCreated: {
    //     type: 'string',  // Date type should be represented as string in Swagger
    //     format: 'date-time',  // Specify the format for date-time
    //     example: '2024-03-05T12:00:00Z'  // Provide an example date-time value
    //   }
    },
    required: ['name', 'email', 'password']
};

export const logInBody = {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: 'abc@gmail.com'
      },
      password: {
        type: 'string',
        example: 'your_password'
      }
    },
    // required: ['email', 'password']
}

