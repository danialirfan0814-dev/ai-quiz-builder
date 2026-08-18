# 📖 Features Guide - AI Quiz Builder

## 🎯 Main Features

### 1. Multi-Format Input Support

#### Teks Input
- Masukkan teks langsung dari keyboard
- Copy-paste dari sumber lain
- Support unlimited length

#### PDF Upload
- Upload file PDF
- Automatic text extraction
- Multi-page support

#### Image Upload (OCR)
- Upload gambar dengan teks
- Automatic text recognition using Tesseract.js
- Support JPEG, PNG, WebP formats

### 2. Intelligent Question Generation

**Powered by Google Gemini AI**

#### Three Difficulty Levels:

**🟢 Senang (Easy)**
- Soalan berdasarkan fakta langsung
- Fokus pada poin-poin utama
- Format: Mostly multiple-choice
- Cocok untuk: Pemula, revisi cepat

**🟡 Medium**
- Memerlukan pemahaman lebih dalam
- Soalan tentang hubungan konsep
- Format: Mix of multiple-choice dan true/false
- Cocok untuk: Pemelajar sederhana, ujian menengah

**🔴 Susah (Hard)**
- Analisis mendalam diperlukan
- Aplikasi konsep dalam situasi baru
- Format: Complex multiple-choice, essay
- Cocok untuk: Ujian kewangan, sertifikasi

### 3. Dashboard

- **Kuiz Library**: Lihat semua kuiz yang telah dibuat
- **Quick Stats**: Bilangan soalan, tahap kesukaran
- **Actions**: Bermain, edit, atau hapus kuiz

### 4. Interactive Quiz Player

- **Progress Bar**: Lihat progress dalam kuiz
- **Question Navigation**: Pergi ke soalan sebelumnya/seterusnya
- **Instant Feedback**: Penjelasan untuk setiap jawapan
- **Score Calculation**: Otomatis mengira markah

### 5. Results & Analytics

- **Instant Results**: Lihat markah selepas menyelesaikan kuiz
- **Grade System**: A, B, C, F berdasarkan persentase
- **Score Breakdown**: Bilangan betul vs salah
- **Result History**: Simpan semua keputusan

## 🎮 How to Use

### Step 1: Pilih Input Type
```
Dashboard → Buat Kuiz Baru → Pilih Input Type
- Teks
- PDF
- Gambar
```

### Step 2: Upload/Input Kandungan
```
Selepas pilih input type:
- Masukkan teks, upload PDF, atau gambar
- Sistem akan proses kandungan
```

### Step 3: Tentukan Details Kuiz
```
- Tajuk kuiz
- Huraian (optional)
- Tahap kesukaran (Senang/Medium/Susah)
- Bilangan soalan (5-50)
```

### Step 4: AI Jana Soalan
```
Google Gemini AI akan:
- Analisa kandungan
- Jana soalan berdasarkan tahap kesukaran
- Format soalan dalam pelbagai jenis
```

### Step 5: Bermain Kuiz
```
- Baca setiap soalan
- Pilih jawapan
- Lihat penjelasan
- Lanjut ke soalan seterusnya
- Hantar apabila selesai
```

### Step 6: Lihat Keputusan
```
- Markah dan persentase
- Gred keseluruhan
- Cadangan untuk improvement
```

## 💡 Tips & Tricks

### Untuk Input Terbaik:
1. **Teks**: Copy dari buku teks atau artikel - lebih terstruktur, lebih bagus soalan
2. **PDF**: Pastikan quality tinggi untuk OCR yang lebih tepat
3. **Gambar**: Ambil foto dalam pencahayaan yang baik

### Untuk Soalan Terbaik:
1. Input kandungan yang jelas dan terstruktur
2. Pilih tahap kesukaran yang sesuai dengan target audience
3. Tentukan bilangan soalan yang mencukupi

### Strategi Belajar:
1. Mulai dengan soalan **Senang** untuk memahami konsep
2. Lanjut ke **Medium** untuk menguji pemahaman
3. Akhiri dengan **Susah** untuk sertifikasi dan expertise

## 🔐 Data Storage

- **Kuiz**: Disimpan di MongoDB
- **Soalan**: Generated sekali saja untuk efisiensi
- **Keputusan**: Semua hasil disimpan untuk tracking progress
- **Privasi**: Tiada data personal yang dikumpul (MVP)

## ⚡ Performance Tips

- Maximum file size untuk PDF/Image: 50MB
- Recommended content length: 500-5000 words
- Question generation time: 15-30 saat (depend on quantity)
- UI load time: < 1 second

## 🎓 Best Practices

1. **Untuk Guru**: Upload bab entri buku teks → Jana kuiz → Assign kepada murid
2. **Untuk Murid**: Buat kuiz dari nota → Revisi sebelum exam
3. **Untuk Trainer**: Input modul training → Create certification quiz
4. **Untuk Content Creator**: Buat kuiz berdasarkan video/artikel → Monetize

## 🚀 Advanced Features (Coming Soon)

- User authentication & profiles
- Shared quizzes dengan kelas/grup
- Detailed analytics & insights
- Custom theme & branding
- API access untuk integration
- Mobile app

## ❓ FAQ

**Q: Berapa lama untuk menjana soalan?**
A: Biasanya 15-30 saat, bergantung pada panjang kandungan dan bilangan soalan.

**Q: Boleh edit soalan selepas dijana?**
A: Dalam versi MVP, tidak. Coming soon dalam update berikutnya.

**Q: Berapa maksimum soalan yang boleh dijana?**
A: Maksimum 50 soalan per kuiz.

**Q: Soalan berkali-kali untuk kandungan sama akan berbeza?**
A: Ya, setiap kali AI dijana soalan baru (lebih interactive).

**Q: Boleh eksport hasil?**
A: Fitur ini akan datang dalam update berikutnya.
