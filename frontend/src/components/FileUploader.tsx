import React, { useState } from 'react';
import { Upload, FileText, File, Image } from 'lucide-react';
import { processAPI } from '../services/api';
import Loading from './Loading';
import ErrorAlert from './ErrorAlert';

interface FileUploaderProps {
  inputType: 'text' | 'pdf' | 'image';
  onSuccess: (data: any) => void;
  onError: (error: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ inputType, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const getIcon = () => {
    switch (inputType) {
      case 'pdf':
        return <File className="w-12 h-12 text-red-500" />;
      case 'image':
        return <Image className="w-12 h-12 text-purple-500" />;
      default:
        return <FileText className="w-12 h-12 text-blue-500" />;
    }
  };

  const handleTextSubmit = async () => {
    if (!text.trim()) {
      onError('Sila masukkan teks');
      return;
    }
    setLoading(true);
    try {
      const response = await processAPI.processText(text);
      onSuccess(response.data.data);
    } catch (error: any) {
      onError(error.response?.data?.message || 'Gagal memproses teks');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    try {
      let response;
      if (inputType === 'pdf') {
        response = await processAPI.processPDF(file);
      } else if (inputType === 'image') {
        response = await processAPI.processImage(file);
      }
      onSuccess(response?.data.data);
    } catch (error: any) {
      onError(error.response?.data?.message || 'Gagal memuat fail');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="Memproses fail..." />;

  return (
    <div className="card-base">
      <div className="flex flex-col items-center justify-center gap-4">
        {getIcon()}
        {inputType === 'text' ? (
          <div className="w-full">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Masukkan teks kuiz di sini..."
              className="input-base h-64 resize-none"
            />
            <button onClick={handleTextSubmit} className="btn-primary w-full mt-4">
              Seteruskan
            </button>
          </div>
        ) : (
          <label className="w-full cursor-pointer">
            <input
              type="file"
              accept={inputType === 'pdf' ? '.pdf' : 'image/*'}
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
              }}
              className="hidden"
            />
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 hover:border-blue-500 transition-colors text-center">
              <Upload className="w-8 h-8 mx-auto mb-2" />
              <p className="text-slate-300">Klik atau seret fail di sini</p>
              <p className="text-xs text-slate-500 mt-1">
                {inputType === 'pdf' ? 'PDF files only' : 'Image files only'}
              </p>
            </div>
          </label>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
