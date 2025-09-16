import express from 'express';
import {  validateRequestBody } from '../../validators';
import { createUserSchema, loginUserSchema } from '../../validators/user.validator';
import { UserController } from '../../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/signup', 
  validateRequestBody(createUserSchema), 
  UserController.createUser
);

userRouter.post('/login', 
  validateRequestBody(loginUserSchema),
  UserController.loginUser
)


export default userRouter;