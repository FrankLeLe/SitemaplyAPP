# Sitemaply 项目运维库

**项目**: Sitemaply - XML Sitemap 生成器  
**部署平台**: Cloudflare Pages  
**运维状态**: 自动化（GitHub Actions + Cloudflare）  

---

## 📋 **运维概览**

### **架构**

```
┌──────────────────┐     ┌──────────────────┐
│  GitHub Push     │ →   │ GitHub Actions   │
│  (git push)      │     │ (自动构建部署)   │
└──────────────────┘     └──────────────────┘
                                ↓
                       ┌──────────────────┐
                       │ Cloudflare Pages │
                       │ - 前端托管       │
                       │ - Functions      │
                       │ - CDN            │
                       └──────────────────┘
                                ↓
                       ┌──────────────────┐
                       │  用户访问        │
                       │ sitemaply.pages.dev │
                       └──────────────────┘
```

---

## 🔧 **日常运维**

### **1. 监控检查**

**每日检查清单**:
- [ ] 网站可访问性测试
- [ ] API 功能测试
- [ ] 错误日志检查
- [ ] 使用量监控

**检查命令**:
```bash
# 测试网站可访问性
curl -o /dev/null -s -w "%{http_code}\n" https://sitemaply.pages.dev

# 测试 API 功能
curl -X POST https://sitemaply.pages.dev/api/generate \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","max_pages":5}'

# 查看部署状态
wrangler pages deployment list --project-name=sitemaply
```

---

### **2. 日志查看**

**Cloudflare Dashboard**:
```
1. 访问 https://dash.cloudflare.com
2. Workers & Pages → sitemaply
3. Deployments → 查看部署历史
4. Functions → 查看日志
```

**GitHub Actions**:
```
1. 访问 https://github.com/FrankLeLe/SitemaplyAPP/actions
2. 查看构建日志
3. 检查失败任务
```

---

### **3. 性能监控**

**关键指标**:
| 指标 | 阈值 | 告警 |
|------|------|------|
| 响应时间 | <500ms | >1s |
| 错误率 | <1% | >5% |
| 可用性 | >99% | <95% |
| 构建时间 | <60s | >120s |

**监控工具**:
- Cloudflare Analytics（流量分析）
- GitHub Actions（构建监控）
- Uptime Robot（可用性监控，可选）

---

## 🚨 **故障排查**

### **常见问题 1: 网站 404**

**现象**: 访问 https://sitemaply.pages.dev 返回 404

**可能原因**:
1. 部署失败
2. 输出目录错误
3. 项目名称错误

**排查步骤**:
```bash
# 1. 检查部署状态
wrangler pages deployment list --project-name=sitemaply

# 2. 检查输出目录
ls -la out/

# 3. 重新部署
wrangler pages deploy out --project-name=sitemaply
```

**解决方案**:
```bash
# 清理并重新构建
rm -rf .next out
npm run build
wrangler pages deploy out --project-name=sitemaply
```

---

### **常见问题 2: API 500 错误**

**现象**: POST /api/generate 返回 500

**可能原因**:
1. Pages Functions 错误
2. 爬虫超时
3. 内存不足

**排查步骤**:
```bash
# 1. 查看 Functions 日志
# Cloudflare Dashboard → Workers & Pages → sitemaply → Functions → Logs

# 2. 测试小网站
curl -X POST https://sitemaply.pages.dev/api/generate \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","max_pages":1}'

# 3. 检查代码
cat functions/api/generate.ts
```

**解决方案**:
```typescript
// 添加错误处理
try {
  const response = await fetch(url);
  // ...
} catch (error) {
  console.error('Crawl error:', error);
  return new Response(JSON.stringify({ error: error.message }), { status: 500 });
}
```

---

### **常见问题 3: 部署失败**

**现象**: `wrangler pages deploy` 失败

**可能原因**:
1. Token 过期
2. 项目不存在
3. 文件太大

**排查步骤**:
```bash
# 1. 验证 Token
wrangler whoami

# 2. 检查项目
wrangler pages project list

# 3. 检查文件大小
du -sh out/
```

**解决方案**:
```bash
# 重新认证
export CLOUDFLARE_API_TOKEN="新的 Token"

# 创建项目（如果不存在）
curl -X POST "https://api.cloudflare.com/client/v4/accounts/ACCOUNT_ID/pages/projects" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"sitemaply"}'

# 清理大文件
rm -rf out/cache
wrangler pages deploy out --project-name=sitemaply
```

---

### **常见问题 4: GitHub Actions 失败**

**现象**: GitHub Actions 构建失败

**可能原因**:
1. Secrets 配置错误
2. npm 依赖问题
3. 构建脚本错误

**排查步骤**:
```
1. 访问 GitHub Actions 页面
2. 点击失败的任务
3. 查看日志
4. 定位错误行
```

**解决方案**:
```yaml
# 检查 .github/workflows/deploy.yml
# 确认 Secrets 配置正确
# 重新运行任务
```

---

## 🔄 **更新流程**

### **代码更新**

```bash
# 1. 修改代码
vim src/app/page.tsx

# 2. 提交代码
git add .
git commit -m "feat: 添加新功能"
git push origin main

# 3. 自动部署（GitHub Actions 触发）
# 访问 GitHub Actions 查看部署进度
```

### **配置更新**

```bash
# 1. 修改配置
vim next.config.ts

# 2. 重新构建
npm run build

# 3. 手动部署
wrangler pages deploy out --project-name=sitemaply
```

### **紧急修复**

```bash
# 1. 创建 hotfix 分支
git checkout -b hotfix/urgent-fix

# 2. 修复代码
vim functions/api/generate.ts

# 3. 快速部署
npm run build
wrangler pages deploy out --project-name=sitemaply

# 4. 提交代码
git add .
git commit -m "fix: 紧急修复"
git push origin main
```

---

## 📊 **成本管理**

### **Cloudflare 免费额度**

| 资源 | 免费额度 | 实际使用 | 状态 |
|------|----------|----------|------|
| 构建次数 | 500 次/月 | ~30 次/月 | ✅ 充足 |
| 带宽 | 100GB/月 | <1GB/月 | ✅ 充足 |
| Functions 请求 | 100,000 次/天 | <100 次/天 | ✅ 充足 |
| CPU 时间 | 10ms/请求 | ~5ms/请求 | ✅ 充足 |

### **成本优化建议**

1. **减少构建次数**
   - 合并小改动
   - 使用 `git push --no-verify` 跳过 CI（谨慎使用）

2. **优化带宽**
   - 启用 CDN 缓存
   - 压缩静态资源

3. **优化 Functions**
   - 减少 CPU 使用
   - 缓存爬取结果

---

## 🔐 **安全管理**

### **访问控制**

**GitHub Secrets**:
```
CLOUDFLARE_API_TOKEN: 定期轮换
CLOUDFLARE_ACCOUNT_ID: 只读
```

**Cloudflare 权限**:
```
API Token 权限:
- Cloudflare Pages: Edit
- Account Settings: Read
```

### **安全最佳实践**

1. **Token 管理**
   - 不在代码中硬编码 Token
   - 使用 GitHub Secrets
   - 定期轮换 Token

2. **依赖安全**
   ```bash
   # 检查依赖漏洞
   npm audit
   
   # 修复漏洞
   npm audit fix
   ```

3. **代码审查**
   - PR 必须 review
   - 自动化测试必须通过
   - 敏感信息必须加密

---

## 📈 **数据分析**

### **流量分析**

**Cloudflare Analytics**:
```
1. 访问 Cloudflare Dashboard
2. Workers & Pages → sitemaply
3. Analytics → 查看流量数据
```

**关键指标**:
- 独立访客数
- 页面浏览量
- API 调用次数
- 地理分布

### **用户行为分析**

**追踪事件**:
- 首页访问
- API 调用
- sitemap 下载
- 错误发生

**工具**:
- Cloudflare Web Analytics（免费）
- Google Analytics（可选）

---

## 🛠️ **运维工具**

### **命令行工具**

```bash
# Cloudflare 管理
wrangler whoami                      # 查看当前用户
wrangler pages project list          # 列出项目
wrangler pages deployment list       # 列出部署
wrangler pages deploy out            # 部署

# GitHub 管理
gh auth status                       # 查看认证状态
gh run list                          # 查看 Actions 运行
gh run view                          # 查看运行详情
```

### **监控脚本**

```bash
#!/bin/bash
# 健康检查脚本

# 检查网站可访问性
STATUS=$(curl -o /dev/null -s -w "%{http_code}\n" https://sitemaply.pages.dev)
if [ $STATUS -ne 200 ]; then
  echo "❌ 网站不可用：HTTP $STATUS"
  exit 1
fi

# 检查 API 功能
RESPONSE=$(curl -s -X POST https://sitemaply.pages.dev/api/generate \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","max_pages":1}')
if echo $RESPONSE | grep -q "success"; then
  echo "✅ API 正常"
else
  echo "❌ API 异常"
  exit 1
fi

echo "✅ 健康检查通过"
```

---

## 📞 **应急联系**

### **升级流程**

```
P3 - 小问题 → 记录 → 下次迭代修复
P2 - 中问题 → 24 小时内修复
P1 - 大问题 → 立即修复
P0 - 严重问题 → 立即修复 + 通知用户
```

### **通知渠道**

- GitHub Issues（Bug 报告）
- Email（紧急通知）
- Twitter（公告）

---

## 📚 **参考文档**

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Next.js 文档](https://nextjs.org/docs)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)

---

*最后更新：2026-03-25*  
*流星 (Meteor) - MVP 超级个体 AI 智能体*
