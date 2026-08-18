import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../config/constants';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Quiz API
export const quizAPI = {
  create: (data: any) => api.post('/quiz/create', data),
  getAll: () => api.get('/quiz'),
  getOne: (id: string) => api.get(`/quiz/${id}`),
  delete: (id: string) => api.delete(`/quiz/${id}`),
};

// Process API
export const processAPI = {
  processText: (text: string) => api.post('/process/text', { text }),
  processPDF: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/process/pdf', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  processImage: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/process/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Question API
export const questionAPI = {
  getQuestions: (quizId: string) => api.get(`/questions/${quizId}`),
  generateQuestions: (data: any) => api.post('/questions/generate', data),
};

// Result API
export const resultAPI = {
  submitResult: (data: any) => api.post('/results/submit', data),
  getResults: (quizId: string) => api.get(`/results/${quizId}`),
};

export default api;
