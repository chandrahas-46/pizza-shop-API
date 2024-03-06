// ************** [ COMMON: RESPONSE BODY ] ****************
export const internalServerError = {
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