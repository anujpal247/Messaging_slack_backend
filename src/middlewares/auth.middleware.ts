import { NextFunction, Request, Response } from "express";
import {StatusCodes} from "http-status-codes";
import jwt from "jsonwebtoken";
import { serverConfig } from "../config";

export async function isAuthenticated(req: Request, res: Response, next: NextFunction){

  const token = req.headers.authorization;

  
  if(!token){
    return res.status(StatusCodes.FORBIDDEN).json({
      message: "Unauthorized",
      success: false
    });
  }

  // TODO: Verify token
  const response = jwt.verify(token, serverConfig.JWT_SECRET)
  if(!response){
    return res.status(StatusCodes.FORBIDDEN).json({
      message: "Unauthorized",
      success: false
    });
  }
  console.log(response);
  next();
}