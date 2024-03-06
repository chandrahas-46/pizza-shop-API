// 1. Import express.
import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from "../../Middlewares/jwt.middleware.js"

// 2. Initialize Express router.
const userRouter = express.Router();
const userController = new UserController();

// All the paths to the controller methods.

// localhost/api/users 
userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
userRouter.patch('/resetPassword', jwtAuth, userController.resetPassword);
// userRouter.post('/signin', (req, res)=>{
//     userController.signIn(req, res);
// });

export default userRouter;
