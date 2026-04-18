# Company Website - Full Stack Setup

This repository now contains:

- `frontend`: Next.js (latest stable) + React + TypeScript
- `backend`: Node.js + Express + TypeScript + MongoDB Node driver

## Versions used

- Node.js runtime detected: `v22.22.0` (above Node 16)
- Next.js: `16.2.4`
- React: `19.2.4`
- Express: `5.2.1`
- MongoDB Node.js driver: `7.1.1`

## Run frontend

```bash
cd frontend
cp .env.local.example .env.local
npm run dev
```

Frontend runs at `http://localhost:3000`.

## Run backend

```bash
cd backend
cp .env.example .env
npm run dev
```

Backend runs at `http://localhost:5000`.

Health endpoint:

- `GET http://localhost:5000/api/health`

## Production backend

```bash
cd backend
npm run build
npm run start
```
