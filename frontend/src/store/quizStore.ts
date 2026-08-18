import { create } from 'zustand';

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  inputType: 'text' | 'pdf' | 'image';
  numberOfQuestions: number;
  createdAt: string;
  updatedAt: string;
}

interface QuizStore {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  setQuizzes: (quizzes: Quiz[]) => void;
  setCurrentQuiz: (quiz: Quiz) => void;
  addQuiz: (quiz: Quiz) => void;
  removeQuiz: (id: string) => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  quizzes: [],
  currentQuiz: null,
  setQuizzes: (quizzes) => set({ quizzes }),
  setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),
  addQuiz: (quiz) => set((state) => ({ quizzes: [...state.quizzes, quiz] })),
  removeQuiz: (id) =>
    set((state) => ({ quizzes: state.quizzes.filter((q) => q._id !== id) })),
}));
