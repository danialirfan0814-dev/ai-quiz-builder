export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const DIFFICULTY_LEVELS = [
  { value: 'easy', label: '🟢 Senang', color: 'from-green-500 to-green-600' },
  { value: 'medium', label: '🟡 Medium', color: 'from-yellow-500 to-yellow-600' },
  { value: 'hard', label: '🔴 Susah', color: 'from-red-500 to-red-600' },
];

export const INPUT_TYPES = [
  { value: 'text', label: '📝 Teks', icon: 'FileText' },
  { value: 'pdf', label: '📄 PDF', icon: 'File' },
  { value: 'image', label: '🖼️ Gambar', icon: 'Image' },
];

export const QUESTION_TYPES = [
  { value: 'multiple-choice', label: 'Pilihan Berganda' },
  { value: 'true-false', label: 'Benar/Salah' },
  { value: 'short-answer', label: 'Jawapan Pendek' },
];
