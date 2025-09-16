import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";

const userRepo = new UserRepository();
const userService = new UserService(userRepo);

export const UserController = {
  async createUser(req: Request, res: Response) {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: user
    });
  }
};