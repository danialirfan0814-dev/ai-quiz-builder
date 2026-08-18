import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Memuatkan...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
        <Loader className="absolute inset-0 w-16 h-16 text-blue-500 animate-spin" />
      </div>
      <p className="text-slate-300 text-lg font-medium">{message}</p>
    </div>
  );
};

export default Loading;
