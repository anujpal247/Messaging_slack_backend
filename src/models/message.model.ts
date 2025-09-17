import { Document, Schema, model, Types } from "mongoose";

export interface IMessage extends Document {
  body: string;
  image?: string;
  channelId: Types.ObjectId;
  sender: Types.ObjectId;
}

const messageSchema = new Schema<IMessage>({
  body: {
    type: String,
    required: [true, "body is required"],
  },
  image: {
    type: String,
  },
  channelId: {
    type: Schema.Types.ObjectId,
    ref: "Channel",
    required: [true, "channelId is required"],
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "sender is required"],
  }
}, 
{
  timestamps: true,
});

export const Message = model<IMessage>("Message", messageSchema);