import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username must be unique"],
    trim: true,
    match: [
      /^[a-zA-Z0-9_]{3,16}$/,
      "Username must be 3-16 characters long and can only contain letters, numbers, and underscores",
    ]
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email must be unique"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [ true, "password is required"],
  },
  avatar: {
    type: String,
  }
}, {
  timestamps: true,
});

userSchema.pre<IUser>("save", function (next) {
  const user = this;
  user.avatar = `https://robohash.org/${user.username}`;
  next();
});

export const User = mongoose.model<IUser>("User", userSchema);