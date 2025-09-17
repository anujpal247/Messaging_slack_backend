import { Document, Schema, model } from "mongoose";
export interface IChannel extends Document {
  name: string;
}

export const channelSchema = new Schema<IChannel>({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: [true, "name must be unique"],
    trim: true,
  },
}, {
  timestamps: true
});

export const Channel = model<IChannel>("Channel", channelSchema);
