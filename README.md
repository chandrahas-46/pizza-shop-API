# pizza-shop-API
This is pizza-shop application REST API that provides endpoints for user authentication, product management, cart management, and order management. And securing the cart and order using JWT.

## Features

- User registration
- User login
- Product creation, deletion, and retrieval with product id
- Cart creation, update, deletion, and retrieval
- Order creation, update, history, and details
- JWT-based authentication

## Tech Stack
**Backend:**
- Node.js
- Express.js
- MongoDB [Mongoose]
- JWT

**Data Storage:** 
- MongoDB

**User Authentication:**
- JSON Web Tokens (JWT)
- 
## API Reference

#### User Authentication
- `POST /api/users/signup` - Register a new user.
- `POST /api/users/signin` -    Login with an existing user.

#### Products
- `POST /api/products` -    Create a new product.
- `GET /api/products` -    Get all products.
- `GET /api/products/:id` -   Get a single product by ID.
- `PATCH /api/products/:id` -    Update existing product by ID.
- `DELETE /api/products/:id` -   Delete a product by ID.

#### Cart
- `POST /api/cart/:productId` -    Create a new cart item for a product.
- `GET /api/cart` -    Get all cart items for a specific user.
- `PATCH /api/cart/{cartItemId}` -   Update a cart item by ID.
- `DELETE /api/cart/{cartItemId}` -   Delete a cart item by ID.

#### Order
- `POST /api/order` -    Create an order.
- `GET /api/order` -   Get an user orders history.
- `GET /api/order/:orderId` -   Get an user orders history details by ID.

