import { Document, Schema, model } from "mongoose";

export interface IWorkspace extends Document  {
  name: string;
  description: string;
  owner: Schema.Types.ObjectId;
  members: Schema.Types.ObjectId[];
  channels: Schema.Types.ObjectId[];
}

export const workspaceSchema = new Schema<IWorkspace>({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: [true, "name must be unique"],
    trim: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "owner is required"],
  },
  members: [
    {
      memberId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "memberId is required"],
      },
      role: {
        type: String,
        enum: [ "admin", "member"],
        default: "member",
      },
    }
  ],
  channels: [
    {
      type: Schema.Types.ObjectId,
      ref: "Channel",
    }
  ]
}, {
  timestamps: true
});

export const Workspace = model<IWorkspace>("Workspace", workspaceSchema);