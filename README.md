# 🎯 AI Quiz Builder - Sistem Kuiz Universal

Sistem kuiz interaktif yang memungkinkan pengguna membuat kuiz dari berbagai format input (Teks, PDF, Gambar) dengan 3 tingkat kesukaran.

## ✨ Fitur Utama

- 📝 **Multi-Format Input**: Teks, PDF, Gambar (OCR)
- 🏆 **3 Tingkat Kesukaran**: Senang, Medium, Susah
- 🤖 **AI-Powered**: Generate soalan menggunakan Google Gemini API
- 🎨 **Modern UI**: Dashboard yang cantik dengan Tailwind CSS
- 📊 **Analytics**: Score tracking dan progress monitoring
- 📱 **Responsive**: Mobile & Desktop friendly

## 🛠️ Teknologi

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS + Shadcn/ui
- Axios (HTTP client)

**Backend:**
- Node.js + Express
- MongoDB
- TypeScript
- Google Gemini API
- Tesseract.js (OCR)
- pdf-parse (PDF processing)

## 📁 Struktur Projek

```
ai-quiz-builder/
├── frontend/                 # React Application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API services
│   │   ├── types/            # TypeScript types
│   │   ├── styles/           # Global styles
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── backend/                  # Express API
│   ├── src/
│   │   ├── routes/           # API routes
│   │   ├── controllers/      # Route handlers
│   │   ├── services/         # Business logic
│   │   ├── models/           # MongoDB models
│   │   ├── middleware/       # Custom middleware
│   │   ├── utils/            # Helper functions
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml        # Docker setup
├── .gitignore
└── package.json (root)
```

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB
- Google Gemini API Key

### Setup

```bash
# Clone repository
git clone https://github.com/danialirfan0814-dev/ai-quiz-builder.git
cd ai-quiz-builder

# Install dependencies
npm install

# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install
```

### Environment Variables

**Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/quiz-builder
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
NODE_ENV=development
```

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Run Development

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## 📚 API Endpoints

### Quiz Management
- `POST /api/quiz/create` - Buat kuiz baru
- `GET /api/quiz/:id` - Dapatkan detail kuiz
- `GET /api/quizzes` - Dapatkan semua kuiz
- `DELETE /api/quiz/:id` - Hapus kuiz

### Input Processing
- `POST /api/process/text` - Process teks input
- `POST /api/process/pdf` - Upload dan process PDF
- `POST /api/process/image` - Upload dan process gambar (OCR)

### Questions
- `GET /api/questions/:quizId` - Dapatkan soalan kuiz
- `POST /api/questions/generate` - Generate soalan dengan AI

### Results
- `POST /api/results/submit` - Submit jawaban
- `GET /api/results/:quizId` - Dapatkan hasil kuiz

## 🎨 UI Components

- Dashboard
- Quiz Creator Form
- File Uploader (Teks, PDF, Gambar)
- Difficulty Selector
- Quiz Player
- Results & Analytics

## 📖 Dokumentasi

Lihat folder `docs/` untuk dokumentasi lengkap API dan implementasi.

## 🤝 Contributing

Buat feature branch baru dan submit PR.

## 📄 License

MIT
