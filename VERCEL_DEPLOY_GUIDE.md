# Vercel 部署完整指南

## 📋 部署前准备清单

- [x] 代码已推送到 GitHub
- [x] 数据库已配置（阿里云 MySQL）
- [x] 数据库表已创建
- [x] 测试数据已填充
- [ ] 准备环境变量

---

## 🚀 部署步骤

### 步骤 1：访问 Vercel

1. 打开浏览器，访问：**https://vercel.com/**
2. 点击右上角 **Sign Up** 或 **Login**
3. 选择 **Continue with GitHub** 使用 GitHub 账户登录

### 步骤 2：导入项目

1. 登录成功后，点击 **Add New...** → **Project**
2. 在 **Import Git Repository** 页面，找到你的仓库
   - 如果看不到仓库，点击 **Adjust GitHub App Permissions**
   - 授权 Vercel 访问你的 GitHub 仓库
3. 找到 `project-blog1` 仓库，点击 **Import**

### 步骤 3：配置项目

Vercel 会自动检测到这是 Next.js 项目，配置如下：

```
Project Name: project-blog1 (可以修改)
Framework Preset: Next.js (自动检测)
Root Directory: ./ (保持默认)
Build Command: next build (保持默认)
Output Directory: .next (保持默认)
Install Command: npm install (保持默认)
```

**保持所有默认设置即可！**

### 步骤 4：配置环境变量 ⚠️ 最重要！

在部署前，**必须**配置环境变量：

1. 点击 **Environment Variables** 展开
2. 添加以下两个环境变量：

#### 环境变量 1：DATABASE_URL

**Name (名称)**:
```
DATABASE_URL
```

**Value (值)**:
```
mysql://blog_user:5N83Cew1yi5DTkY8sryY@47.243.27.51:3306/blog_db
```

**Environments (环境)**:
- ✅ Production
- ✅ Preview
- ✅ Development

#### 环境变量 2：JWT_SECRET

**Name (名称)**:
```
JWT_SECRET
```

**Value (值)**:
```
d5b7bcbf089be198e78226989781eb6655a8d3a8b857e15c304c6c20c47b26f8
```

**Environments (环境)**:
- ✅ Production
- ✅ Preview
- ✅ Development

### 步骤 5：开始部署

1. 确认环境变量已经添加完成
2. 点击页面底部的 **Deploy** 按钮
3. 等待构建完成（通常需要 2-3 分钟）

你会看到构建进度：
```
→ Building...
→ Installing dependencies...
→ Running build command...
→ Deployment complete!
```

### 步骤 6：获取部署链接

部署成功后，Vercel 会显示：
- ✅ **Congratulations!** 或 **Ready**
- 提供访问链接，格式如：`https://project-blog1-xxx.vercel.app`

点击 **Visit** 或 **Continue to Dashboard** 查看你的网站。

---

## 🎯 部署后测试

### 1. 访问你的网站

点击 Vercel 提供的链接，例如：
```
https://project-blog1-xxx.vercel.app
```

### 2. 测试功能

#### 测试注册
1. 访问：`https://your-app.vercel.app/register`
2. 注册一个新账户

#### 测试登录
1. 访问：`https://your-app.vercel.app/login`
2. 使用以下测试账户登录：
   - **Email**: `test@example.com`
   - **Password**: `123456`

#### 查看文章列表
1. 登录后自动跳转到：`/posts`
2. 应该能看到 8 篇英文博客文章

### 3. 检查功能清单

- [ ] 首页加载正常
- [ ] 可以访问注册页面
- [ ] 可以注册新用户
- [ ] 可以使用测试账户登录
- [ ] 登录后能看到文章列表
- [ ] 文章内容显示正常
- [ ] 翻页功能正常
- [ ] 退出登录功能正常

---

## 🔧 常见问题解决

### 问题 1：构建失败 - "Cannot find module"

**原因**：依赖安装失败

**解决方案**：
1. 检查 `package.json` 是否正确
2. 在 Vercel 项目设置中，重新部署：
   - 进入项目 Dashboard
   - 点击 **Deployments**
   - 点击最新的部署
   - 点击右上角 **...** → **Redeploy**

### 问题 2：500 错误 - 数据库连接失败

**原因**：环境变量配置错误或数据库无法访问

**解决方案**：
1. 检查 Vercel 环境变量是否正确配置
2. 确认 DATABASE_URL 格式正确
3. 测试数据库是否可以从外部访问：
   ```bash
   mysql -h 47.243.27.51 -u blog_user -p
   ```
4. 检查阿里云安全组是否开放 3306 端口

### 问题 3：登录后跳转到登录页

**原因**：JWT_SECRET 未配置或 Cookie 问题

**解决方案**：
1. 确认 JWT_SECRET 环境变量已配置
2. 检查浏览器是否阻止了第三方 Cookie
3. 清除浏览器 Cookie 和缓存后重试

### 问题 4：Prisma Client 未生成

**原因**：postinstall 脚本未执行

**解决方案**：
确认 `package.json` 中有：
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

如果没有，添加后重新部署。

### 问题 5：文章列表为空

**原因**：数据库没有数据

**解决方案**：
在本地运行 seed 命令填充数据（已经完成）

---

## 📊 查看部署日志

如果部署失败，查看详细日志：

1. 进入 Vercel 项目 Dashboard
2. 点击 **Deployments**
3. 点击失败的部署
4. 查看 **Building** 和 **Functions** 标签的日志
5. 根据错误信息进行调试

---

## 🎨 配置自定义域名（可选）

### 如果你有自己的域名：

1. 进入 Vercel 项目 Dashboard
2. 点击 **Settings** → **Domains**
3. 输入你的域名，例如：`blog.yourdomain.com`
4. 按照提示配置 DNS 记录：

在你的域名提供商处添加 CNAME 记录：
```
Type: CNAME
Name: blog (或 @ 用于根域名)
Value: cname.vercel-dns.com
TTL: 3600
```

5. 等待 DNS 生效（通常几分钟到几小时）
6. Vercel 会自动配置 HTTPS 证书

---

## 🔄 后续更新部署

每次代码更新后，只需要推送到 GitHub：

```bash
git add .
git commit -m "Update: your changes"
git push
```

Vercel 会自动检测到更新并重新部署！

---

## 📱 Vercel 移动端管理

Vercel 也提供了移动应用，可以：
- 查看部署状态
- 查看实时日志
- 管理环境变量
- 查看分析数据

在 App Store 或 Google Play 搜索 "Vercel" 下载。

---

## 🎉 恭喜！

你的博客已经成功部署到 Vercel！

**接下来可以做什么？**

1. 分享你的博客链接给朋友
2. 继续开发新功能
3. 配置自定义域名
4. 查看访问分析
5. 集成 Google Analytics
6. 优化 SEO

**需要帮助？**
- Vercel 文档：https://vercel.com/docs
- Next.js 文档：https://nextjs.org/docs
- Prisma 文档：https://www.prisma.io/docs

---

## 📞 支持

如果遇到问题，可以：
- 查看 Vercel Dashboard 的日志
- 访问 Vercel Discord 社区
- 在 GitHub Issues 提问
