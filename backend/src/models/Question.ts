import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  _id: string;
  quizId: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>(
  {
    quizId: { type: String, required: true, ref: 'Quiz' },
    type: { type: String, enum: ['multiple-choice', 'true-false', 'short-answer'], required: true },
    question: { type: String, required: true },
    options: [String],
    correctAnswer: { type: Schema.Types.Mixed, required: true },
    explanation: { type: String },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IQuestion>('Question', questionSchema);
