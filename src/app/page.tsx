'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Loader2, CheckCircle, Globe, Zap, Shield } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function Home() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    
    try {
      const res = await fetch(`${API_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, max_pages: 100 })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.detail || 'Failed to generate sitemap')
      }
      
      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    }
    
    setLoading(false)
  }

  const downloadSitemap = () => {
    if (!result?.sitemap) return
    const blob = new Blob([result.sitemap], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sitemap.xml'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <Zap className="h-4 w-4" />
            Free Sitemap Generator
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900">
            Generate XML Sitemap
            <span className="block text-blue-600">in 3 Seconds</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Free forever. No signup required. Generate SEO-friendly sitemaps for websites up to 100 pages.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Globe className="h-12 w-12 mx-auto text-blue-600 mb-2" />
              <CardTitle>Fast Crawling</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600">
              Intelligent crawler finds all pages in seconds
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-2" />
              <CardTitle>SEO Ready</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600">
              Google-compliant XML format with metadata
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 mx-auto text-purple-600 mb-2" />
              <CardTitle>100% Free</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600">
              No credit card, no signup, no limits
            </CardContent>
          </Card>
        </div>

        {/* Generator Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Enter Your Website URL</CardTitle>
            <CardDescription>We'll crawl your site and generate an XML sitemap</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="flex-1 text-lg"
                />
                <Button type="submit" disabled={loading} size="lg" className="px-8">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Crawling...
                    </>
                  ) : (
                    'Generate'
                  )}
                </Button>
              </div>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                ❌ {error}
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 font-medium">
                    <CheckCircle className="h-5 w-5" />
                    Successfully found {result.pages_count} pages!
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={downloadSitemap} size="lg" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download sitemap.xml
                  </Button>
                </div>

                {/* Sample Pages */}
                {result.sample_pages && result.sample_pages.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Sample Pages Found:</h4>
                    <div className="bg-gray-50 rounded-lg p-3 max-h-40 overflow-y-auto">
                      <ul className="space-y-1 text-sm text-gray-600">
                        {result.sample_pages.map((page: string, i: number) => (
                          <li key={i} className="truncate">• {page}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="mt-16 space-y-6">
          <h2 className="text-2xl font-bold text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">1</div>
              <h3 className="font-semibold">Enter URL</h3>
              <p className="text-gray-600 text-sm">Paste your website URL</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">2</div>
              <h3 className="font-semibold">We Crawl</h3>
              <p className="text-gray-600 text-sm">Our bot finds all pages</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">3</div>
              <h3 className="font-semibold">Download</h3>
              <p className="text-gray-600 text-sm">Get your XML sitemap</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Built with ❤️ for SEO professionals</p>
          <p className="mt-2">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            {' | '}
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
          </p>
        </footer>
      </div>
    </main>
  )
}
