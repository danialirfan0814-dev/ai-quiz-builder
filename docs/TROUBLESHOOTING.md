# 🆘 Troubleshooting Guide

## Backend Issues

### MongoDB Connection Failed

**Problem**: `MongooseError: connect ECONNREFUSED`

**Solutions**:
1. Pastikan MongoDB running:
   ```bash
   mongod
   ```
2. Periksa `MONGODB_URI` di `.env`
3. Jika using MongoDB Atlas:
   ```
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/quiz-builder
   ```

### GEMINI API Error

**Problem**: `Error: API key not valid`

**Solutions**:
1. Verify API key di https://ai.google.dev/
2. Pastikan API key correct di `.env`
3. Check quota usage
4. Generate new key jika expired

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE :::5000`

**Solutions**:
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>

# Or change PORT di .env
PORT=5001
```

### CORS Error

**Problem**: `Access to XMLHttpRequest blocked by CORS policy`

**Solutions**:
1. Pastikan `CORS_ORIGIN` di backend `.env`:
   ```
   CORS_ORIGIN=http://localhost:3000
   ```
2. Frontend harus access correct URL
3. Production, update origin ke domain benar

## Frontend Issues

### API Connection Failed

**Problem**: `Cannot GET /api/quiz`

**Solutions**:
1. Pastikan backend running di port 5000
2. Verify `REACT_APP_API_URL` di `.env`
3. Check browser console untuk error details
4. Reload halaman (Ctrl+Shift+R)

### File Upload Not Working

**Problem**: Upload frozen atau error

**Solutions**:
1. Check file size (max 50MB)
2. Verify file format (PDF, JPG, PNG)
3. Check console untuk error message
4. Ensure backend multer middleware working

### Page Not Loading

**Problem**: Blank page atau infinite loading

**Solutions**:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Check console untuk JavaScript errors
4. Verify all environment variables
5. Restart dev server

## Common Errors

### "Missing required fields"

Solution: Pastikan semua mandatory fields filled:
- Quiz: title, content, difficulty, inputType
- Questions: quizId, content, difficulty
- Results: quizId, userAnswers

### "File not uploaded"

Solution:
1. Pastikan file dipilih
2. Check file size
3. Browser permissions untuk file access
4. Try refresh dan upload lagi

### "No questions found"

Solution:
1. Jalankan `/questions/generate` endpoint
2. Pastikan API key aktif
3. Check Gemini quota
4. Try dengan content lebih pendek dulu

## Performance Issues

### Slow Question Generation

Sebab:
- Large content (5000+ words)
- Many questions requested (40+)
- Gemini API slow

Solution:
- Kurangi content length
- Reduce number of questions
- Check internet connection
- Gemini API rate limit - tunggu beberapa minit

### UI Lag/Freezing

Sebab:
- Too many re-renders
- Large data processing
- Low browser memory

Solution:
1. Close unused tabs
2. Restart browser
3. Check system RAM
4. Update browser ke latest version

## Docker Issues

### Container Won't Start

```bash
# Check logs
docker-compose logs

# Rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Permission Denied

```bash
# Linux/Mac
sudo docker-compose up -d

# Or add user to docker group
sudo usermod -aG docker $USER
```

## Database Issues

### MongoDB Data Loss

Solution:
1. Ensure volume mounted di docker-compose
2. Backup data regularly
3. Use MongoDB Atlas untuk production

### Database Quota Exceeded

Solution:
1. MongoDB Atlas - upgrade plan
2. Local MongoDB - clear old data
3. Archive old quizzes/results

## Network Issues

### Timeout Errors

Solution:
1. Check internet connection
2. Increase timeout di axios config
3. Check firewall rules
4. API server status

## Getting Help

1. Check this guide first
2. Search GitHub issues
3. Create new issue dengan:
   - Error message
   - Steps to reproduce
   - System info
   - Screenshots
4. Mention @maintainer

## Emergency Reset

Jika semua tidak working:

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start

# Or full reset
rm -rf .env
git checkout .env.example
cp .env.example .env
# Edit .env dengan correct values
```

---

**Still stuck?** Open an issue di GitHub! 🆘
