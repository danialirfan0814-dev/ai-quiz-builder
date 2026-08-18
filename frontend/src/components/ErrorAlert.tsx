import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-gap-3 mb-4">
      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
      <p className="text-red-200 flex-1">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-300 hover:text-red-100 transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
