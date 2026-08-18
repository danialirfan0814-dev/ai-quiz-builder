# 📚 Dokumentasi API - AI Quiz Builder

## Base URL
```
http://localhost:5000/api
```

## Authentication
Tidak memerlukan authentication untuk versi MVP ini.

---

## 🎯 Quiz Endpoints

### 1. Buat Kuiz Baru
**POST** `/quiz/create`

**Request Body:**
```json
{
  "title": "Sejarah Malaysia",
  "description": "Kuiz tentang sejarah negara Malaysia",
  "content": "Teks atau kandungan yang akan dijadikan soalan...",
  "difficulty": "easy",
  "inputType": "text",
  "numberOfQuestions": 10
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "uuid",
    "title": "Sejarah Malaysia",
    "description": "Kuiz tentang sejarah negara Malaysia",
    "content": "...",
    "difficulty": "easy",
    "inputType": "text",
    "numberOfQuestions": 10,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### 2. Dapatkan Semua Kuiz
**GET** `/quiz`

**Response (200 OK):**
```json
{
  "success": true,
  "data": [...]
}
```

### 3. Dapatkan Kuiz Tertentu
**GET** `/quiz/:id`

**Response (200 OK):**
```json
{
  "success": true,
  "data": { ... }
}
```

### 4. Hapus Kuiz
**DELETE** `/quiz/:id`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Quiz deleted successfully"
}
```

---

## 📝 Input Processing Endpoints

### 1. Proses Teks
**POST** `/process/text`

**Request Body:**
```json
{
  "text": "Kandungan teks yang ingin diproses..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "inputType": "text",
    "content": "...",
    "wordCount": 250
  }
}
```

### 2. Proses PDF
**POST** `/process/pdf`

**Request:**
- Content-Type: multipart/form-data
- File: [PDF file]

**Response:**
```json
{
  "success": true,
  "data": {
    "inputType": "pdf",
    "content": "...",
    "pages": 5,
    "wordCount": 1250
  }
}
```

### 3. Proses Gambar (OCR)
**POST** `/process/image`

**Request:**
- Content-Type: multipart/form-data
- File: [Image file]

**Response:**
```json
{
  "success": true,
  "data": {
    "inputType": "image",
    "content": "...",
    "confidence": 95.5,
    "wordCount": 150
  }
}
```

---

## ❓ Question Endpoints

### 1. Dapatkan Soalan Kuiz
**GET** `/questions/:quizId`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "uuid",
      "quizId": "uuid",
      "type": "multiple-choice",
      "question": "Soalan di sini?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A",
      "explanation": "Penjelasan jawapan",
      "difficulty": "easy"
    }
  ]
}
```

### 2. Jana Soalan dengan AI
**POST** `/questions/generate`

**Request Body:**
```json
{
  "quizId": "uuid",
  "content": "Kandungan untuk dijana soalan...",
  "difficulty": "medium",
  "numberOfQuestions": 10
}
```

**Response:**
```json
{
  "success": true,
  "data": [...]
}
```

---

## 🏆 Result Endpoints

### 1. Hantar Keputusan Kuiz
**POST** `/results/submit`

**Request Body:**
```json
{
  "quizId": "uuid",
  "userAnswers": [
    {
      "questionId": "uuid",
      "answer": "A"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "uuid",
    "quizId": "uuid",
    "userAnswers": [...],
    "score": 8,
    "totalQuestions": 10,
    "percentage": 80,
    "grade": "A",
    "completedAt": "2024-01-01T00:00:00Z"
  }
}
```

### 2. Dapatkan Keputusan Kuiz
**GET** `/results/:quizId`

**Response:**
```json
{
  "success": true,
  "data": [...]
}
```

---

## 🔧 Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Missing required fields"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Quiz not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## 📊 Difficulty Levels

- **easy**: Soalan mudah, fokus fakta asas
- **medium**: Soalan tahap menengah, memerlukan pemahaman
- **hard**: Soalan sukar, memerlukan analisis mendalam

## 🎯 Question Types

- **multiple-choice**: Pilihan berganda (A, B, C, D)
- **true-false**: Soalan benar/salah
- **short-answer**: Jawapan pendek

## 📤 Input Types

- **text**: Teks input langsung
- **pdf**: File PDF
- **image**: Gambar dengan OCR
