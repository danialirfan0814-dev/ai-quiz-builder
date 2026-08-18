import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ResultsDisplay from '../components/ResultsDisplay';
import Loading from '../components/Loading';

const Results: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Dashboard
        </button>

        {id && <ResultsDisplay quizId={id} />}

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
