# 🤝 Contributing Guide

## Getting Started

1. Fork repository
2. Clone fork anda
3. Buat feature branch: `git checkout -b feature/awesome-feature`
4. Make changes
5. Commit: `git commit -m 'Add awesome feature'`
6. Push: `git push origin feature/awesome-feature`
7. Open Pull Request

## Code Standards

### TypeScript
- Gunakan strict mode
- Type semua variables
- Avoid `any` type

### Components (React)
- Functional components with hooks
- Props dengan TypeScript interface
- Use Tailwind classes untuk styling

### API Routes (Express)
- Use async/await
- Proper error handling
- Request validation

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: Feature baru
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code refactor
- `test`: Tests

Example:
```
feat(quiz): add export to PDF feature

Implemented functionality to export quiz results as PDF document.
Addresses issue #123
```

## Pull Request Process

1. Update README jika ada perubahan behavior
2. Test semua perubahan locally
3. Ensure branch is up to date dengan main
4. Provide clear PR description
5. Link related issues

## Reporting Issues

Bila melaporkan bug:
1. Describe the issue clearly
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots/logs if applicable
5. System information (OS, Node version, etc)

## Feature Requests

1. Describe the feature
2. Use case & benefit
3. Possible implementation
4. Examples from other apps (if any)

## Development Setup

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Run development
npm run dev

# Lint
cd backend && npm run lint
cd ../frontend && npm run lint
```

## Testing

Gunakan Postman atau Thunder Client untuk test API endpoints.

## Need Help?

- Create discussion di GitHub
- Mention maintainers
- Check existing issues first

Terima kasih atas kontribusi! 🙏
