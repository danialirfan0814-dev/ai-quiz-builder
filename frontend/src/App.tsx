import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CreateQuiz from './pages/CreateQuiz';
import QuizPlayer from './pages/QuizPlayer';
import Results from './pages/Results';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateQuiz />} />
          <Route path="/quiz/:id" element={<QuizPlayer />} />
          <Route path="/results/:id" element={<Results />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
