import { Request, Response } from 'express';
import pdfParse from 'pdf-parse';
import Tesseract from 'tesseract.js';

export const processText = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: 'Text is required' });
    }

    res.status(200).json({
      success: true,
      data: {
        inputType: 'text',
        content: text,
        wordCount: text.split(' ').length,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const processPDF = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const data = await pdfParse(req.file.buffer);

    res.status(200).json({
      success: true,
      data: {
        inputType: 'pdf',
        content: data.text,
        pages: data.numpages,
        wordCount: data.text.split(' ').length,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const processImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const result = await Tesseract.recognize(req.file.buffer, 'eng');
    const text = result.data.text;

    res.status(200).json({
      success: true,
      data: {
        inputType: 'image',
        content: text,
        confidence: result.data.confidence,
        wordCount: text.split(' ').length,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
