export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateQuizDifficulty = (difficulty: string): boolean => {
  return ['easy', 'medium', 'hard'].includes(difficulty);
};

export const validateInputType = (type: string): boolean => {
  return ['text', 'pdf', 'image'].includes(type);
};

export const validateQuestionType = (type: string): boolean => {
  return ['multiple-choice', 'true-false', 'short-answer'].includes(type);
};
