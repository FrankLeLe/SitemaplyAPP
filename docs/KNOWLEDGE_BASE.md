# Sitemaply 项目知识库

**项目名**: Sitemaply  
**类型**: ToC SEO 工具 - XML Sitemap 生成器  
**状态**: Phase 3 完成（60%）  
**创建时间**: 2026-03-24  
**部署平台**: Cloudflare Pages  

---

## 📊 **项目概况**

### **核心价值**
- 免费在线 XML Sitemap 生成工具
- 3 秒内爬取网站并生成 sitemap.xml
- 无需注册，即开即用
- 支持最多 100 页免费爬取

### **目标用户**
- 中小网站站长
- SEO 从业者
- 独立开发者
- 博客作者

### **技术栈**
| 层级 | 技术 | 说明 |
|------|------|------|
| **前端** | Next.js 14 + TypeScript | 静态导出 |
| **UI** | TailwindCSS + Shadcn/ui | 组件库 |
| **后端** | Cloudflare Pages Functions | JavaScript 爬虫 |
| **爬虫** | cheerio + fetch | HTML 解析 |
| **部署** | Cloudflare Pages | 自动 HTTPS + CDN |
| **CI/CD** | GitHub Actions | 自动部署 |

---

## 🎯 **市场验证数据**

### **关键词研究**
| 关键词 | 搜索量 | 增长率 | 竞争度 |
|--------|--------|--------|--------|
| sitemap generator | 11/100 | +319% | 低 ✅ |
| xml sitemap | 高 | +50% | 中 |
| seo tools | 高 | +30% | 高 |

### **竞品分析**
| 竞品 | 定价 | 限制 | 差异化机会 |
|------|------|------|------------|
| XML-Sitemaps.com | $5.99/月 | 500 页免费 | 完全免费 |
| Screaming Frog | £149/年 | 500 页免费 | 轻量级 |
| SmallSEOTools | 免费 + 广告 | 功能分散 | 专注单一功能 |

### **商业模式**
```
免费层：
- 最多 100 页
- 基础 XML 格式
- 手动下载

Pro 层（未来）:
- $9 一次性付费
- 无限页面
- 自动更新
- API 访问
```

---

## 📁 **项目结构**

```
sitemap-generator/
├── src/
│   └── app/
│       ├── page.tsx          # 主页面
│       ├── layout.tsx        # 布局
│       └── globals.css       # 全局样式
├── functions/
│   └── api/
│       └── generate.ts       # API + 爬虫逻辑
├── components/
│   └── ui/                   # Shadcn 组件
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions
├── next.config.ts            # Next.js 配置
├── package.json              # 依赖配置
├── wrangler.toml             # Cloudflare 配置
└── CLOUDFLARE_DEPLOY.md      # 部署文档
```

---

## 🚀 **部署架构**

```
┌──────────────────────────────────────┐
│  GitHub                              │
│  github.com/FrankLeLe/SitemaplyAPP  │
│  ↓ Git Push 自动触发                 │
└──────────────────────────────────────┘
                ↓
┌──────────────────────────────────────┐
│  GitHub Actions                      │
│  - npm install                       │
│  - npm run build                     │
│  - wrangler pages deploy            │
└──────────────────────────────────────┘
                ↓
┌──────────────────────────────────────┐
│  Cloudflare Pages                    │
│  - 前端：.next (静态文件)            │
│  - 后端：functions/api/generate.ts  │
│  - 域名：sitemaply.pages.dev        │
│  - 自动 HTTPS + 全球 CDN             │
└──────────────────────────────────────┘
```

---

## 📈 **项目进度**

### **Phase 1: 核心开发** ✅ 100%
- 项目创建
- 后端爬虫开发
- 前端 UI 开发
- API 代理配置
- GitHub 仓库创建

### **Phase 2: 测试优化** ✅ 100%
- 功能测试（7/7 通过）
- 性能优化（并发爬取）
- 错误处理增强
- 日志记录完善
- GPT-5.4 测试

### **Phase 3: 部署上线** ✅ 80%
- Cloudflare Pages 创建 ✅
- 首次部署 ✅
- 静态导出配置 ✅
- JavaScript 爬虫重写 ✅
- GitHub Actions 配置 ✅
- GitHub Secrets 配置 ⏳
- 自动部署测试 ⏳

### **Phase 4: 产品发布** ⏳ 0%
- Product Hunt 准备
- Landing Page 优化
- 社交媒体准备
- Product Hunt 发布

### **Phase 5: 增长迭代** ⏳ 0%
- 用户反馈收集
- 功能迭代
- SEO 优化
- 数据分析

---

## 🔑 **关键决策**

### **决策 1: 选题方向**
- **选项**: AI 工具 vs SEO 工具 vs 小游戏
- **决策**: SEO 工具（sitemap generator）
- **原因**: +319% 增长，低竞争，刚需

### **决策 2: 部署方案**
- **选项**: 本地服务器 vs Vercel vs Cloudflare
- **决策**: Cloudflare Pages
- **原因**: 免费额度高，自动 HTTPS，Git 集成

### **决策 3: 后端架构**
- **选项**: Python 爬虫 + Railway vs JavaScript 爬虫 + Cloudflare
- **决策**: JavaScript 爬虫 + Cloudflare
- **原因**: 单一平台，管理简单，完全免费

### **决策 4: 变现模式**
- **选项**: 订阅制 vs 一次性付费 vs 广告
- **决策**: 免费 + Pro 一次性付费（未来）
- **原因**: ToC 用户对订阅敏感，一次性付费决策成本低

---

## 📊 **性能指标**

### **爬取性能**
| 网站规模 | 页面数 | 耗时 |
|----------|--------|------|
| 小网站 | 1-10 页 | <1 秒 |
| 中等网站 | 10-50 页 | 1-5 秒 |
| 大网站 | 50-100 页 | 5-10 秒 |

### **部署性能**
| 指标 | 数值 |
|------|------|
| 构建时间 | ~30 秒 |
| 部署时间 | ~10 秒 |
| CDN 节点 | 275+ 全球 |
| 首字节时间 | <50ms |

### **成本**
| 资源 | 免费额度 | 实际使用 |
|------|----------|----------|
| Cloudflare Pages | 500 次构建/月 | ~30 次/月 |
| 带宽 | 100GB/月 | <1GB/月 |
| Pages Functions | 100,000 次/天 | <100 次/天 |
| **月成本** | **$0** | **$0** |

---

## 📝 **访问地址**

| 环境 | URL | 说明 |
|------|-----|------|
| **生产环境** | https://sitemaply.pages.dev | 主域名 |
| **Preview 环境** | https://a41f868d.sitemaply.pages.dev | 最新部署 |
| **GitHub 仓库** | https://github.com/FrankLeLe/SitemaplyAPP | 源代码 |

---

## 📋 **待办事项**

### **高优先级（本周）**
- [ ] 配置 GitHub Secrets
- [ ] 测试自动部署
- [ ] 完整功能测试（爬取 + 下载）
- [ ] 添加 robots.txt 支持
- [ ] 添加 sitemap 索引文件支持

### **中优先级（下周）**
- [ ] Product Hunt 准备
- [ ] Landing Page 优化
- [ ] 添加使用教程
- [ ] 配置自定义域名（可选）

### **低优先级（未来）**
- [ ] Pro 版本开发
- [ ] 用户账户系统
- [ ] 历史记录功能
- [ ] API 开放

---

## 🎯 **成功指标**

### **短期（1 个月）**
- [ ] 1000 独立访客
- [ ] 100 次 sitemap 生成
- [ ] Product Hunt 发布
- [ ] 10 个用户反馈

### **中期（3 个月）**
- [ ] 10,000 独立访客
- [ ] 1000 次 sitemap 生成
- [ ] Pro 版本上线
- [ ] $500 收入

### **长期（6 个月）**
- [ ] 100,000 独立访客
- [ ] 10,000 次 sitemap 生成
- [ ] $5,000 MRR
- [ ] 自动化运营

---

*最后更新：2026-03-25*  
*流星 (Meteor) - MVP 超级个体 AI 智能体*
