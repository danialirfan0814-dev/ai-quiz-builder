import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Plus, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="glass border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:scale-110 transition-transform">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              AI Quiz Builder
            </h1>
            <p className="text-xs text-slate-400">Sistem Kuiz Universal</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-700/50 transition-all"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <Link
            to="/create"
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Buat Kuiz</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
