import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { questionAPI, resultAPI } from '../services/api';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';

const QuizPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await questionAPI.getQuestions(id!);
        setQuestions(response.data.data);
        setAnswers(new Array(response.data.data.length).fill(null));
      } catch (err: any) {
        setError('Failed to load questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      const userAnswers = questions.map((q, index) => ({
        questionId: q._id,
        answer: answers[index],
      }));

      await resultAPI.submitResult({
        quizId: id,
        userAnswers,
      });

      setSubmitted(true);
      setTimeout(() => navigate(`/results/${id}`), 2000);
    } catch (err: any) {
      setError('Failed to submit quiz');
    }
  };

  if (loading) return <Loading message="Memuatkan soalan..." />;
  if (!questions.length) return <ErrorAlert message="Tiada soalan ditemui" />;

  const current = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>

          {/* Progress Bar */}
          <div className="bg-slate-700/50 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-slate-400">
            <span>Soalan {currentIndex + 1}</span>
            <span>{questions.length}</span>
          </div>
        </div>

        {error && <ErrorAlert message={error} onDismiss={() => setError('')} />}

        {submitted ? (
          <div className="text-center text-green-400">
            <CheckCircle className="w-12 h-12 mx-auto mb-4" />
            <p>Kuiz berjaya dihantar!</p>
          </div>
        ) : (
          <>
            {/* Question Card */}
            <div className="card-base mb-8">
              <p className="text-sm text-slate-400 mb-4">Soalan {currentIndex + 1}</p>
              <h2 className="text-xl font-bold mb-6">{current.question}</h2>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {current.options?.map((option: string, index: number) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-700/50 transition-all"
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={answers[currentIndex] === option}
                      onChange={() => handleAnswer(option)}
                      className="w-5 h-5"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>

              {/* Explanation */}
              {current.explanation && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-sm text-blue-200">
                  <p className="font-semibold mb-1">💡 Penjelasan:</p>
                  <p>{current.explanation}</p>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sebelumnya
              </button>

              {currentIndex === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="btn-primary flex-1"
                >
                  Selesai & Hantar
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
                  className="btn-primary flex-1"
                >
                  Seterusnya
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPlayer;
