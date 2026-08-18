import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Award } from 'lucide-react';
import { resultAPI } from '../services/api';
import Loading from './Loading';

interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  grade: string;
}

interface ResultsDisplayProps {
  quizId: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ quizId }) => {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await resultAPI.getResults(quizId);
        if (response.data.data.length > 0) {
          setResult(response.data.data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [quizId]);

  if (loading) return <Loading />;

  if (!result) {
    return <div className="text-center text-slate-400">No results found</div>;
  }

  const gradeColor =
    result.percentage >= 80
      ? 'from-green-500 to-green-600'
      : result.percentage >= 60
      ? 'from-yellow-500 to-yellow-600'
      : result.percentage >= 40
      ? 'from-orange-500 to-orange-600'
      : 'from-red-500 to-red-600';

  return (
    <div className="card-base text-center">
      <div className="flex justify-center mb-4">
        <Award className={`w-16 h-16 text-${result.percentage >= 80 ? 'green' : 'orange'}-500`} />
      </div>
      <h2 className="text-3xl font-bold mb-2">Keputusan Kuiz</h2>
      <div className={`bg-gradient-to-r ${gradeColor} p-8 rounded-lg mb-6`}>
        <p className="text-6xl font-bold text-white">{result.grade}</p>
        <p className="text-xl text-white mt-2">{result.percentage.toFixed(1)}%</p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-slate-400">Markah</p>
          <p className="text-2xl font-bold text-green-400">{result.score}</p>
        </div>
        <div>
          <p className="text-slate-400">Jumlah Soalan</p>
          <p className="text-2xl font-bold text-blue-400">{result.totalQuestions}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
