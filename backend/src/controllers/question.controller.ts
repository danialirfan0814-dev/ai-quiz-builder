import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Question from '../models/Question';
import { generateQuestionsWithAI } from '../services/ai.service';

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const questions = await Question.find({ quizId }).sort({ createdAt: 1 });

    if (questions.length === 0) {
      return res.status(404).json({ success: false, message: 'No questions found' });
    }

    res.status(200).json({ success: true, data: questions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const generateQuestions = async (req: Request, res: Response) => {
  try {
    const { quizId, content, difficulty, numberOfQuestions } = req.body;

    if (!quizId || !content || !difficulty) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Delete existing questions for this quiz
    await Question.deleteMany({ quizId });

    // Generate questions with AI
    const generatedQuestions = await generateQuestionsWithAI(
      content,
      difficulty,
      numberOfQuestions || 10
    );

    // Save questions to database
    const questions = await Promise.all(
      generatedQuestions.map((q: any) =>
        new Question({
          _id: uuidv4(),
          quizId,
          type: q.type || 'multiple-choice',
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          difficulty,
        }).save()
      )
    );

    res.status(201).json({ success: true, data: questions });
  } catch (error: any) {
    console.error('Error generating questions:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
