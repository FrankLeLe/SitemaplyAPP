# 🗺️ Sitemaply

**Free XML Sitemap Generator - Generate sitemaps in 3 seconds**

A fast, free, and easy-to-use XML sitemap generator for SEO professionals and website owners.

🌐 **Live Demo**: [Coming Soon](https://sitemaply.app)

---

## ✨ Features

- 🚀 **Fast Crawling** - Generate sitemaps in seconds
- 🆓 **100% Free** - No signup, no credit card required
- 📄 **SEO Ready** - Google-compliant XML format
- 💾 **Instant Download** - Get your sitemap.xml immediately
- 🔒 **Privacy First** - We don't store your data

---

## 🎯 How to Use

1. Enter your website URL
2. Click "Generate Sitemap"
3. Wait for crawling to complete
4. Download your sitemap.xml file

**That's it!** Your sitemap is ready to submit to Google Search Console.

---

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Shadcn/ui

### Backend
- Python FastAPI
- BeautifulSoup4
- Requests

### Deployment
- Frontend: Vercel
- Backend: Railway

---

## 🚀 Self-Host

### Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

API will run on `http://localhost:8000`

### Frontend

```bash
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

---

## 📦 API Usage

### Generate Sitemap

**Endpoint**: `POST /api/generate`

**Request**:
```json
{
  "url": "https://example.com",
  "max_pages": 100
}
```

**Response**:
```json
{
  "success": true,
  "url": "https://example.com",
  "pages_count": 42,
  "sitemap": "<?xml version=\"1.0\"...>",
  "sample_pages": [...]
}
```

---

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

---

## 🙏 Support

If you find this project helpful, consider:
- ⭐ Starring this repository
- 🐛 Reporting bugs
- 💡 Suggesting features

---

**Built with ❤️ for SEO professionals**
