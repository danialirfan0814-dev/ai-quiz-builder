import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateQuestionsWithAI = async (
  content: string,
  difficulty: 'easy' | 'medium' | 'hard',
  numberOfQuestions: number = 10
): Promise<any[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const difficultyInstructions = {
      easy: 'Buat soalan yang mudah dan langsung berkaitan dengan kandungan. Fokus pada fakta utama.',
      medium: 'Buat soalan tahap menengah yang memerlukan pemahaman lebih dalam tentang kandungan.',
      hard: 'Buat soalan yang sukar dan memerlukan analisis mendalam, pemikiran kritis, dan aplikasi konsep.',
    };

    const prompt = `
Tugas: Buat ${numberOfQuestions} soalan kuiz berdasarkan kandungan berikut. Tahap kesukaran: ${difficulty}.
${difficultyInstructions[difficulty]}

Kandungan:
${content}

Untuk setiap soalan, format jawapan dalam JSON seperti berikut (pastikan JSON sah):
[
  {
    "type": "multiple-choice",
    "question": "Teks soalan",
    "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
    "correctAnswer": "Jawapan yang betul",
    "explanation": "Penjelasan mengapa jawapan ini betul"
  },
  {
    "type": "true-false",
    "question": "Teks soalan",
    "correctAnswer": "true" atau "false",
    "explanation": "Penjelasan"
  }
]

Pastikan JSON sah dan boleh diparse.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Extract JSON from response
    const jsonMatch = responseText.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from response');
    }

    const questions = JSON.parse(jsonMatch[0]);
    return questions;
  } catch (error: any) {
    console.error('Error generating questions with AI:', error);
    throw new Error(`Failed to generate questions: ${error.message}`);
  }
};
