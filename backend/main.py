from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import xml.etree.ElementTree as ET
from datetime import datetime

app = FastAPI(title="Sitemap Generator API")

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    url: str
    max_pages: int = 100
    exclude_paths: list = []

def is_valid_url(url: str, base_domain: str) -> bool:
    """检查 URL 是否属于同一域名"""
    try:
        parsed = urlparse(url)
        return parsed.netloc == base_domain and parsed.scheme in ['http', 'https']
    except:
        return False

def crawl_site(start_url: str, max_pages: int = 100, exclude_paths: list = []) -> list:
    """爬取网站所有页面"""
    visited = set()
    to_visit = [start_url]
    pages = []
    
    base_domain = urlparse(start_url).netloc
    
    while to_visit and len(pages) < max_pages:
        url = to_visit.pop(0)
        if url in visited:
            continue
        
        # 检查是否排除
        if any(exclude in url for exclude in exclude_paths):
            continue
        
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (compatible; SitemapGeneratorBot/1.0)'
            }
            response = requests.get(url, headers=headers, timeout=10, allow_redirects=True)
            
            if response.status_code != 200:
                continue
            
            # 检查内容类型
            content_type = response.headers.get('Content-Type', '')
            if 'text/html' not in content_type:
                continue
            
            visited.add(url)
            pages.append(url)
            
            # 解析页面找链接
            soup = BeautifulSoup(response.text, 'html.parser')
            for link in soup.find_all('a', href=True):
                next_url = urljoin(url, link['href'])
                if is_valid_url(next_url, base_domain):
                    if next_url not in visited and next_url not in to_visit:
                        to_visit.append(next_url)
            
            print(f"[{len(pages)}/{max_pages}] Crawled: {url}")
            
        except Exception as e:
            print(f"Error crawling {url}: {str(e)}")
            continue
    
    return pages

def generate_sitemap_xml(pages: list, base_url: str) -> str:
    """生成 XML Sitemap"""
    ns = 'http://www.sitemaps.org/schemas/sitemap/0.9'
    root = ET.Element('{%s}urlset' % ns)
    
    for page in sorted(pages):
        url_elem = ET.SubElement(root, '{%s}url' % ns)
        loc = ET.SubElement(url_elem, '{%s}loc' % ns)
        loc.text = page
        
        # 添加 lastmod
        lastmod = ET.SubElement(url_elem, '{%s}lastmod' % ns)
        lastmod.text = datetime.now().strftime('%Y-%m-%d')
        
        # 添加 changefreq
        changefreq = ET.SubElement(url_elem, '{%s}changefreq' % ns)
        changefreq.text = 'monthly'
        
        # 添加 priority
        priority = ET.SubElement(url_elem, '{%s}priority' % ns)
        if page == base_url or page == base_url + '/':
            priority.text = '1.0'
        else:
            priority.text = '0.5'
    
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + ET.tostring(root, encoding='unicode')

@app.get("/")
def read_root():
    return {"status": "ok", "service": "Sitemap Generator API"}

@app.post("/api/generate")
def generate_sitemap(request: GenerateRequest):
    """生成 Sitemap"""
    try:
        # 验证 URL
        if not request.url.startswith(('http://', 'https://')):
            raise HTTPException(status_code=400, detail="URL must start with http:// or https://")
        
        # 爬取网站
        pages = crawl_site(request.url, request.max_pages, request.exclude_paths)
        
        if not pages:
            raise HTTPException(status_code=404, detail="No pages found. Check if the website is accessible.")
        
        # 生成 sitemap
        sitemap_xml = generate_sitemap_xml(pages, request.url)
        
        return {
            "success": True,
            "url": request.url,
            "pages_count": len(pages),
            "sitemap": sitemap_xml,
            "sample_pages": pages[:10]
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
