import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Quiz from '../models/Quiz';

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, description, content, difficulty, inputType, numberOfQuestions } = req.body;

    if (!title || !content || !difficulty || !inputType) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const quiz = new Quiz({
      _id: uuidv4(),
      title,
      description,
      content,
      difficulty,
      inputType,
      numberOfQuestions: numberOfQuestions || 10,
    });

    await quiz.save();
    res.status(201).json({ success: true, data: quiz });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    res.status(200).json({ success: true, data: quiz });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: quizzes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findByIdAndDelete(id);

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    res.status(200).json({ success: true, message: 'Quiz deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
