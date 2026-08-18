import express from 'express';
import { getQuestions, generateQuestions } from '../controllers/question.controller';

const router = express.Router();

router.get('/:quizId', getQuestions);
router.post('/generate', generateQuestions);

export default router;
