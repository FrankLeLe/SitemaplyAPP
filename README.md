# 🗺️ Sitemap Generator

Free XML Sitemap Generator for SEO professionals.

## Features

- ✅ Free forever (up to 100 pages)
- ✅ No signup required
- ✅ Google-compliant XML format
- ✅ Fast crawling (3 seconds)
- ✅ Download instantly

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, Shadcn/ui
- **Backend**: Python FastAPI, BeautifulSoup
- **Deployment**: Vercel (Frontend) + Railway (Backend)

## Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

API runs on `http://localhost:8000`

### Frontend

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## API Endpoints

### POST /api/generate

Generate sitemap for a website.

**Request**:
```json
{
  "url": "https://example.com",
  "max_pages": 100,
  "exclude_paths": ["/admin", "/private"]
}
```

**Response**:
```json
{
  "success": true,
  "url": "https://example.com",
  "pages_count": 42,
  "sitemap": "<?xml version=\"1.0\"...>",
  "sample_pages": ["https://example.com/page1", ...]
}
```

## Deployment

### Backend (Railway)

1. Create new project on Railway
2. Connect GitHub repo
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel)

1. Import project on Vercel
2. Set environment variable: `NEXT_PUBLIC_API_URL`
3. Deploy

## Monetization

### Free Tier
- Up to 100 pages
- Basic XML format
- Manual download

### Pro ($9 one-time)
- Unlimited pages
- Auto-update (weekly)
- Priority support
- No ads

## License

MIT
