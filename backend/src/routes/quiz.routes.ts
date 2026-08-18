import express from 'express';
import { createQuiz, getQuiz, getAllQuizzes, deleteQuiz } from '../controllers/quiz.controller';

const router = express.Router();

router.post('/create', createQuiz);
router.get('/:id', getQuiz);
router.get('/', getAllQuizzes);
router.delete('/:id', deleteQuiz);

export default router;
