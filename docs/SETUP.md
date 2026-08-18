# 🚀 Setup & Installation Guide

## Prerequisites

- **Node.js** v18 atau lebih tinggi
- **MongoDB** running locally atau MongoDB Atlas
- **Google Gemini API Key** (dapatkan dari https://ai.google.dev/)

## 📥 Installation

### 1. Clone Repository

```bash
git clone https://github.com/danialirfan0814-dev/ai-quiz-builder.git
cd ai-quiz-builder
```

### 2. Setup Backend

```bash
cd backend
npm install
```

**Buat file `.env`:**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quiz-builder
GEMINI_API_KEY=your_gemini_api_key_here
CORS_ORIGIN=http://localhost:3000
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

**Buat file `.env`:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🏃 Running Development Server

### Option 1: Separate Terminals

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Option 2: Concurrently

```bash
npm run dev
```

## 🐳 Using Docker

### Setup Environment

Buat file `.env.docker` di root directory:
```env
GEMINI_API_KEY=your_api_key
```

### Run dengan Docker Compose

```bash
docker-compose up -d
```

Dapatkan logs:
```bash
docker-compose logs -f
```

Stop services:
```bash
docker-compose down
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 📚 Getting Google Gemini API Key

1. Pergi ke https://ai.google.dev/
2. Klik "Get API Key"
3. Pilih project atau buat project baru
4. Copy API key
5. Paste ke `.env` file sebagai `GEMINI_API_KEY`

## 🛠️ Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve dist folder dengan web server
```

## ⚠️ Troubleshooting

### MongoDB Connection Error
- Pastikan MongoDB service sedang berjalan
- Periksa `MONGODB_URI` di `.env`

### GEMINI API Error
- Pastikan API key sah dan aktif
- Periksa quota usage di Google AI Studio

### Port Already in Use
```bash
# Find process using port
lsof -i :3000
lsof -i :5000

# Kill process
kill -9 <PID>
```

## 📝 Project Structure

```
ai-quiz-builder/
├── backend/
│   ├── src/
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route handlers
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   └── server.ts      # Main server file
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # Zustand store
│   │   ├── styles/        # CSS files
│   │   └── config/        # Config constants
│   ├── public/            # Static files
│   ├── package.json
│   └── tsconfig.json
├── docs/                  # Documentation
├── docker-compose.yml
└── README.md
```

## ✨ Next Steps

1. Setup dan jalankan aplikasi
2. Buat kuiz pertama anda dari teks/PDF/gambar
3. Pilih tahap kesukaran (Senang, Medium, Susah)
4. AI akan menjana soalan secara otomatis
5. Mainkan kuiz dan lihat keputusan anda

## 📞 Support

Jika ada isu, sila buat issue di GitHub atau hubungi developer.
