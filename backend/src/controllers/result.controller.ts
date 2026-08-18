import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Result from '../models/Result';
import Question from '../models/Question';

export const submitResult = async (req: Request, res: Response) => {
  try {
    const { quizId, userAnswers } = req.body;

    if (!quizId || !userAnswers) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Get all questions for the quiz
    const questions = await Question.find({ quizId });

    let score = 0;
    let totalQuestions = questions.length;

    // Calculate score
    userAnswers.forEach((answer: any) => {
      const question = questions.find((q) => q._id.toString() === answer.questionId);
      if (question) {
        if (Array.isArray(question.correctAnswer)) {
          if (Array.isArray(answer.answer)) {
            if (
              JSON.stringify(question.correctAnswer.sort()) ===
              JSON.stringify(answer.answer.sort())
            ) {
              score += 1;
            }
          }
        } else if (question.correctAnswer === answer.answer) {
          score += 1;
        }
      }
    });

    const percentage = (score / totalQuestions) * 100;

    const result = new Result({
      _id: uuidv4(),
      quizId,
      userAnswers,
      score,
      totalQuestions,
      percentage,
    });

    await result.save();

    res.status(201).json({
      success: true,
      data: {
        ...result.toObject(),
        grade: percentage >= 80 ? 'A' : percentage >= 60 ? 'B' : percentage >= 40 ? 'C' : 'F',
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getResults = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const results = await Result.find({ quizId }).sort({ completedAt: -1 });

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'No results found' });
    }

    res.status(200).json({ success: true, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
