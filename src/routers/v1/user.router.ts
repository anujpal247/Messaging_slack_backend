import express from 'express';
import {  validateRequestBody } from '../../validators';
import { createUserSchema } from '../../validators/user.validator';
import { UserController } from '../../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/', 
  validateRequestBody(createUserSchema), 
  UserController.createUser
);


export default userRouter;