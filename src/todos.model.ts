import { Document, model, Schema } from 'mongoose';

export interface iTodoDocument extends Document {
  userId: string;
  todo: string;
  achieved: boolean;
  joinedAt: Date;
}

const todoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  todo: {
    type: String,
    required: true,
  },
  achieved: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const Todo = model<iTodoDocument>('Todo', todoSchema);
