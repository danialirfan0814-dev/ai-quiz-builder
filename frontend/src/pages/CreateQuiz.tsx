import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';
import { quizAPI, questionAPI } from '../services/api';
import { DIFFICULTY_LEVELS, INPUT_TYPES } from '../config/constants';
import { useQuizStore } from '../store/quizStore';
import FileUploader from '../components/FileUploader';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';

const CreateQuiz: React.FC = () => {
  const navigate = useNavigate();
  const { addQuiz } = useQuizStore();
  const [step, setStep] = useState(1);
  const [inputType, setInputType] = useState<'text' | 'pdf' | 'image'>('text');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputTypeSelect = (type: 'text' | 'pdf' | 'image') => {
    setInputType(type);
    setStep(2);
  };

  const handleContentReceived = (data: any) => {
    setContent(data.content);
    setStep(3);
  };

  const handleCreateQuiz = async () => {
    if (!title || !content) {
      setError('Sila isi semua medan yang diperlukan');
      return;
    }

    setLoading(true);
    try {
      // Create quiz
      const quizResponse = await quizAPI.create({
        title,
        description,
        content,
        difficulty,
        inputType,
        numberOfQuestions,
      });

      const quizId = quizResponse.data.data._id;
      addQuiz(quizResponse.data.data);

      // Generate questions
      setError('Menjana soalan dengan AI...');
      await questionAPI.generateQuestions({
        quizId,
        content,
        difficulty,
        numberOfQuestions,
      });

      setError('');
      navigate(`/quiz/${quizId}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal membuat kuiz');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message={error || 'Menjana kuiz....'} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Dashboard
        </button>

        {error && <ErrorAlert message={error} onDismiss={() => setError('')} />}

        {/* Step 1: Choose Input Type */}
        {step === 1 && (
          <div className="card-base">
            <div className="mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-lg font-bold">
                1
              </div>
              <h2 className="text-2xl font-bold">Pilih Jenis Input</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {INPUT_TYPES.map((type: any) => (
                <button
                  key={type.value}
                  onClick={() => handleInputTypeSelect(type.value)}
                  className="p-6 border-2 border-slate-600 rounded-lg hover:border-blue-500 hover:bg-slate-700/50 transition-all text-center"
                >
                  <p className="text-3xl mb-2">{type.label.split(' ')[0]}</p>
                  <p className="font-semibold">{type.label.split(' ').slice(1).join(' ')}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Upload Content */}
        {step === 2 && (
          <div>
            <div className="card-base mb-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-lg font-bold">
                  2
                </div>
                <h2 className="text-2xl font-bold">Muatkan Kandungan</h2>
              </div>
              <FileUploader
                inputType={inputType}
                onSuccess={handleContentReceived}
                onError={setError}
              />
            </div>
          </div>
        )}

        {/* Step 3: Quiz Details */}
        {step === 3 && (
          <div className="card-base">
            <div className="mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-lg font-bold">
                3
              </div>
              <h2 className="text-2xl font-bold">Perincian Kuiz</h2>
            </div>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold mb-2">Tajuk Kuiz</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masukkan tajuk kuiz"
                  className="input-base"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">Huraian</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Huraian kuiz (pilihan)"
                  className="input-base h-24 resize-none"
                />
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-semibold mb-2">Tahap Kesukaran</label>
                <div className="grid grid-cols-3 gap-3">
                  {DIFFICULTY_LEVELS.map((level: any) => (
                    <button
                      key={level.value}
                      onClick={() => setDifficulty(level.value)}
                      className={`p-3 rounded-lg font-semibold transition-all ${
                        difficulty === level.value
                          ? `bg-gradient-to-r ${level.color} text-white shadow-lg`
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Questions */}
              <div>
                <label className="block text-sm font-semibold mb-2">Bilangan Soalan</label>
                <input
                  type="number"
                  min="5"
                  max="50"
                  value={numberOfQuestions}
                  onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
                  className="input-base"
                />
              </div>

              {/* Preview */}
              <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
                <p className="text-sm text-slate-400 mb-2">Kandungan ({content.split(' ').length} perkataan)</p>
                <p className="text-sm text-slate-300 line-clamp-3">{content}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="btn-secondary flex-1"
                >
                  Kembali
                </button>
                <button
                  onClick={handleCreateQuiz}
                  className="btn-primary flex-1 inline-flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Jana Kuiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
