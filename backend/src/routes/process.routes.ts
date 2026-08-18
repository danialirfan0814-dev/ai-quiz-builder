import express from 'express';
import multer from 'multer';
import { processText, processPDF, processImage } from '../controllers/process.controller';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/text', processText);
router.post('/pdf', upload.single('file'), processPDF);
router.post('/image', upload.single('file'), processImage);

export default router;
