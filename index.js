// 1. Import libraries
import './env.js';
import cors from 'cors';
import express from "express";
import { connectToDB } from './src/config/mongooseConfig.js';

import productRouter from './src/products/product.routes.js';

// 2. create server
const server = express();
// CORS
server.use(cors());

const PORT = process.env.PORT || 3000;
server.use(express.json());
// server.use(express.urlencoded({ extended: true }));

// 3. Default request
server.get('/', (req, res) => {
    res.send("Welcome to the New Pizza Shop Server")
});

server.use(
    '/api/products',
    productRouter
);

// 4. Middleware to handle 404 requests
server.use((req, res) => {
    res.status(404).send("API not found. Please check your documentation for more information");
})


// 5. server listening
server.listen(PORT, (err) => {
    if(err) console.log("server error on port 3000");
    console.log(`Server is running at ${PORT}`);
    connectToDB();
})