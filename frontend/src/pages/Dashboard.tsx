import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Play, Plus } from 'lucide-react';
import { quizAPI } from '../services/api';
import { useQuizStore } from '../store/quizStore';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { quizzes, setQuizzes, removeQuiz } = useQuizStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await quizAPI.getAll();
      setQuizzes(response.data.data);
    } catch (err: any) {
      setError('Gagal memuatkan kuiz');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Adakah anda pasti ingin memadam kuiz ini?')) return;
    try {
      await quizAPI.delete(id);
      removeQuiz(id);
    } catch (err: any) {
      setError('Gagal memadam kuiz');
    }
  };

  if (loading) return <Loading message="Memuatkan kuiz..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Selamat Datang ke AI Quiz Builder
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Buat kuiz interaktif dari teks, PDF, atau gambar dengan AI yang berkuasa
          </p>
          <button
            onClick={() => navigate('/create')}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Buat Kuiz Baru
          </button>
        </div>

        {error && <ErrorAlert message={error} onDismiss={() => setError('')} />}

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-400 text-lg mb-4">Tiada kuiz lagi</p>
              <button
                onClick={() => navigate('/create')}
                className="btn-primary"
              >
                Buat Kuiz Pertama Anda
              </button>
            </div>
          ) : (
            quizzes.map((quiz) => (
              <div key={quiz._id} className="card-base group hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold line-clamp-2">{quiz.title}</h3>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-slate-700 rounded-full">
                        {quiz.inputType === 'text' ? '📝' : quiz.inputType === 'pdf' ? '📄' : '🖼️'} {quiz.inputType}
                      </span>
                      <span className="text-xs px-2 py-1 bg-slate-700 rounded-full">
                        {quiz.difficulty === 'easy' ? '🟢' : quiz.difficulty === 'medium' ? '🟡' : '🔴'} {quiz.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-400 text-sm line-clamp-2 mb-4">{quiz.description}</p>
                <p className="text-xs text-slate-500 mb-4">{quiz.numberOfQuestions} soalan</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/quiz/${quiz._id}`)}
                    className="btn-primary flex-1 inline-flex items-center justify-center gap-2 text-sm"
                  >
                    <Play className="w-4 h-4" />
                    Mula
                  </button>
                  <button
                    onClick={() => handleDelete(quiz._id)}
                    className="btn-secondary px-3 inline-flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
