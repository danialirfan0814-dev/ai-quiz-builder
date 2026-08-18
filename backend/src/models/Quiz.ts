import mongoose, { Schema, Document } from 'mongoose';

export interface IQuiz extends Document {
  _id: string;
  title: string;
  description: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  inputType: 'text' | 'pdf' | 'image';
  numberOfQuestions: number;
  createdAt: Date;
  updatedAt: Date;
}

const quizSchema = new Schema<IQuiz>(
  {
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    inputType: { type: String, enum: ['text', 'pdf', 'image'], required: true },
    numberOfQuestions: { type: Number, default: 10 },
  },
  { timestamps: true }
);

export default mongoose.model<IQuiz>('Quiz', quizSchema);
