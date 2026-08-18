import express from 'express';
import { submitResult, getResults } from '../controllers/result.controller';

const router = express.Router();

router.post('/submit', submitResult);
router.get('/:quizId', getResults);

export default router;
