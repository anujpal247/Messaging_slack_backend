import { IUser, User } from "../models/user.model"

interface IUserRepository {
  getUserByEmail(email: string): Promise<IUser | null>
  getUserByUsername(username: string): Promise<IUser | null>
  createUser(updateUserData : Partial<IUser>): Promise<IUser>
  updateUser(id : string, user : Partial<IUser>): Promise<IUser | null>
  deleteUser(id : string): Promise<boolean>
  getAllUsers(): Promise<IUser[]>
}

export class UserRepository implements IUserRepository {
  constructor() {
    console.log("User repository initialized");
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = User.findOne({ email: email });
    return user
  }
  async getUserByUsername(username: string): Promise<IUser | null> {
    const user = User.findOne({ username: username }).select("-password");
    return user
  }
  async createUser(userData : Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    await user.save();
    return user
  }
  async updateUser(id : string, updateUserData : Partial<IUser>): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(id, updateUserData, { new: true });
    return user
  }
  async deleteUser(id : string): Promise<boolean> {
    const user = await User.findByIdAndDelete(id);
    if (user) return true
    return false
  }
  async getAllUsers(): Promise<IUser[]> {
    const users = await User.find();
    return users
  }
}