import mongoose, { Schema, Document } from 'mongoose';

export interface IResult extends Document {
  _id: string;
  quizId: string;
  userAnswers: {
    questionId: string;
    answer: string | string[];
  }[];
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: Date;
}

const resultSchema = new Schema<IResult>(
  {
    quizId: { type: String, required: true, ref: 'Quiz' },
    userAnswers: [
      {
        questionId: { type: String, required: true },
        answer: { type: Schema.Types.Mixed, required: true },
      },
    ],
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    percentage: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IResult>('Result', resultSchema);
