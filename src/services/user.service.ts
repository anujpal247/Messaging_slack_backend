import { IUser } from "../models/user.model";
import { IUserRepository } from "../repositories/user.repository";
import { BadRequestError, InternalServerError, NotFoundError } from "../utils/errors/app.error";
import { CreateUserDTO, UpdateUserDTO } from "../validators/user.validator";

export interface IUserService {
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: string): Promise<IUser>;
  getUserByEmail(email: string): Promise<IUser>;
  getUserByUsername(username: string): Promise<IUser>;
  createUser(data: CreateUserDTO): Promise<IUser>;
  updateUser(id: string, data: UpdateUserDTO): Promise<IUser>;
  deleteUser(id: string): Promise<boolean>;
}


export class UserService implements IUserService {

  private userRepo: IUserRepository;
  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
    console.log("User service initialized");
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await this.userRepo.getAllUsers();
    if (!users){
      throw new NotFoundError("Users not found");
    }
    return users
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await this.userRepo.getUserById(id);
    if (!user) {
      throw new NotFoundError(`User not found with id ${id}`);
    }
    return user
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const user = await this.userRepo.getUserByEmail(email);
    if (!user) {
      throw new NotFoundError(`User not found with email ${email}`);
    }
    return user
  }

  async getUserByUsername(username: string): Promise<IUser> {
    const user = await this.userRepo.getUserByUsername(username);
    if (!user) {
      throw new NotFoundError(`User not found with username ${username}`);
    }
    return user
  }

  async createUser(data: CreateUserDTO): Promise<IUser> {
    const userExists = await this.userRepo.getUserByEmail(data.email);
    if (userExists) {
      throw new BadRequestError(`User already exists with email ${data.email}`);
    }

    const user = await this.userRepo.createUser(data);
    if (!user){
      throw new InternalServerError("User not created");
    }
    return user
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<IUser> {
    const user = await this.userRepo.updateUser(id, data);
    if (!user){
      throw new BadRequestError(`User not updated with id ${id}`);
    }
    return user
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepo.deleteUser(id);
    if (!user){
      throw new BadRequestError(`User not deleted with id ${id}`);
    }
    return user
  }
}