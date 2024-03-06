// 1. Import libraries
import cors from 'cors';
import express from "express";
import swagger from "swagger-ui-express";
import userRouter from './src/Features/Users/user.routes.js';
import jwtAuth from './src/Middlewares/jwt.middleware.js';
import productRouter from './src/Features/Products/product.routes.js';
import cartRouter from './src/Features/Cart/cart.routes.js';
import orderRouter from './src/Features/Order/order.routes.js';
// SWAGGER DOCS
import { apiDocumentation } from './src/swagger/api_docs.js';
// import apiDocs from "./swagger.json" assert {type: 'json'};

// 2. create server
const server = express();
// SWAGGER DOCS
server.use('/docs', swagger.serve, swagger.setup(apiDocumentation));
// CORS
server.use(cors());

server.use(express.json());
// server.use(express.urlencoded({ extended: true }));

// 3. Default request
server.get('/', (req, res) => {
    res.send("Welcome to the New Pizza Shop Server")
});

server.use("/api/users", userRouter);
server.use("/api/products", productRouter);
server.use("/api/cart", jwtAuth, cartRouter);
server.use("/api/order", jwtAuth, orderRouter);

// 4. Middleware to handle 404 requests
server.use((req, res) => {
    res.status(404).send("API not found. Please check your documentation for more information");
})

export default server;
