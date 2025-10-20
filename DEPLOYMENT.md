# Vercel 部署指南

## 📋 部署前准备

### 1. 准备数据库（PlanetScale 推荐）

#### 方式一：使用 PlanetScale（免费）

1. **注册 PlanetScale 账户**
   - 访问：https://planetscale.com/
   - 使用 GitHub 账户登录（推荐）

2. **创建数据库**
   - 点击 "Create a new database"
   - 数据库名称：`blog-db`（或自定义）
   - 选择区域：Asia Pacific (Singapore) - 适合亚洲用户
   - 点击 "Create database"

3. **获取连接字符串**
   - 进入数据库页面
   - 点击 "Connect"
   - 选择 "Prisma" 格式
   - 点击 "New password" 创建密码
   - 复制连接字符串，格式类似：
     ```
     mysql://xxxxxxxx:pscale_pw_xxxxxxxx@aws.connect.psdb.cloud/blog-db?sslaccept=strict
     ```
   - 保存这个连接字符串，稍后要用

#### 方式二：其他数据库选项

- **Railway**：https://railway.app/
- **Supabase**：https://supabase.com/
- **AWS RDS**：适合企业级应用
- **阿里云 RDS**：国内用户推荐

---

## 🚀 部署到 Vercel

### 方法一：通过 GitHub 部署（推荐）

#### 步骤 1：推送代码到 GitHub

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Blog project with Next.js"

# 在 GitHub 创建新仓库后，关联远程仓库
git remote add origin https://github.com/your-username/your-repo-name.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

#### 步骤 2：连接 Vercel

1. **访问 Vercel**
   - 打开：https://vercel.com/
   - 使用 GitHub 账户登录

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择你刚刚推送的 GitHub 仓库
   - 点击 "Import"

3. **配置项目**
   - Project Name：保持默认或自定义
   - Framework Preset：自动检测为 "Next.js"
   - Root Directory：`./`
   - Build Command：保持默认 `next build`
   - Output Directory：保持默认 `.next`

#### 步骤 3：配置环境变量 ⚠️ 重要！

在部署前，必须添加环境变量：

1. 展开 "Environment Variables" 部分
2. 添加以下变量：

| Name | Value | Environment |
|------|-------|-------------|
| `DATABASE_URL` | `your-planetscale-connection-string` | Production, Preview, Development |
| `JWT_SECRET` | `your-random-secret-key-at-least-32-chars` | Production, Preview, Development |

**示例：**
```
DATABASE_URL=mysql://xxxxxxxx:pscale_pw_xxxxxxxx@aws.connect.psdb.cloud/blog-db?sslaccept=strict
JWT_SECRET=super-secret-jwt-key-change-this-to-random-string-min-32-characters
```

**⚠️ 注意事项：**
- `DATABASE_URL` 必须是生产环境的数据库地址（PlanetScale 或其他）
- `JWT_SECRET` 建议使用随机生成的 32+ 位字符串
- 不要使用本地数据库地址（如 localhost 或 192.168.x.x）

#### 步骤 4：部署

1. 点击 "Deploy" 按钮
2. 等待构建完成（通常 2-3 分钟）
3. 构建成功后，Vercel 会提供访问链接

#### 步骤 5：初始化生产数据库

部署成功后，需要初始化数据库表：

```bash
# 方法一：本地连接生产数据库
DATABASE_URL="your-production-db-url" npx prisma db push

# 方法二：添加测试数据
DATABASE_URL="your-production-db-url" npm run seed
```

或者使用 Prisma Studio 管理：
```bash
DATABASE_URL="your-production-db-url" npx prisma studio
```

---

### 方法二：使用 Vercel CLI

#### 安装 Vercel CLI

```bash
npm i -g vercel
```

#### 登录

```bash
vercel login
```

#### 部署到预览环境

```bash
vercel
```

#### 部署到生产环境

```bash
vercel --prod
```

#### 添加环境变量（CLI 方式）

```bash
vercel env add DATABASE_URL production
vercel env add JWT_SECRET production
```

---

## ✅ 部署后检查清单

完成部署后，请检查以下项目：

- [ ] 网站可以正常访问
- [ ] 首页加载正常
- [ ] 可以成功注册新用户
- [ ] 可以成功登录
- [ ] 文章列表页面显示正常（需要先登录）
- [ ] API 路由正常响应
- [ ] 没有控制台错误

---

## 🎨 配置自定义域名（可选）

1. 进入 Vercel 项目设置
2. 点击 "Domains" 选项卡
3. 输入你的域名（如 `blog.yourdomain.com`）
4. 按照提示配置 DNS 记录：
   - 类型：`CNAME`
   - 名称：`blog`（或 `@` 用于根域名）
   - 值：`cname.vercel-dns.com`
5. 等待 DNS 生效（通常几分钟到几小时）

---

## 🔧 常见问题解决

### 问题 1：数据库连接失败

**错误信息：**
```
Error: P1001: Can't reach database server
```

**解决方案：**
1. 检查 `DATABASE_URL` 是否正确配置
2. 确认数据库服务正在运行
3. 检查数据库防火墙设置
4. 确认数据库允许从任何 IP 连接（或添加 Vercel IP 白名单）

### 问题 2：环境变量未生效

**解决方案：**
1. 在 Vercel 项目设置中重新检查环境变量
2. 确保环境变量应用于所有环境（Production, Preview, Development）
3. 重新部署项目：`vercel --prod`

### 问题 3：Prisma Client 未生成

**错误信息：**
```
@prisma/client did not initialize yet
```

**解决方案：**
- 确保 `package.json` 中有：
  ```json
  "postinstall": "prisma generate"
  ```
- 重新部署

### 问题 4：构建超时

**解决方案：**
1. 检查 Vercel 构建日志
2. 确认依赖安装正常
3. 考虑升级 Vercel 计划（如果项目较大）

### 问题 5：登录后 JWT 验证失败

**解决方案：**
1. 确认 `JWT_SECRET` 环境变量已设置
2. 确保 `JWT_SECRET` 至少 32 位
3. 重新部署后清除浏览器 Cookie

---

## 📊 监控和日志

### 查看部署日志

1. 进入 Vercel 项目页面
2. 点击 "Deployments" 选项卡
3. 选择具体的部署查看日志

### 实时日志

```bash
vercel logs [deployment-url]
```

### 性能监控

Vercel 自带性能监控，在项目页面可以查看：
- 页面加载时间
- API 响应时间
- 错误率

---

## 🔄 更新部署

### 自动部署

配置好 GitHub 后，每次推送代码都会自动触发部署：

```bash
git add .
git commit -m "Update: your changes"
git push
```

### 手动部署

使用 Vercel CLI：
```bash
vercel --prod
```

### 回滚部署

1. 进入 Vercel 项目页面
2. 点击 "Deployments"
3. 找到之前的稳定版本
4. 点击 "..." → "Promote to Production"

---

## 🎯 生产环境优化建议

1. **数据库优化**
   - 使用连接池
   - 添加索引优化查询
   - 定期备份数据

2. **性能优化**
   - 启用图片优化
   - 使用 Next.js Image 组件
   - 配置合适的缓存策略

3. **安全优化**
   - 使用强密码策略
   - 启用 HTTPS（Vercel 自动配置）
   - 定期更新依赖
   - 配置 CORS 策略

4. **监控告警**
   - 设置 Vercel 通知
   - 集成错误追踪（如 Sentry）
   - 配置性能监控

---

## 🎉 部署完成！

恭喜！你的博客已经成功部署到 Vercel。

**接下来可以做什么：**

1. 分享你的博客链接给朋友
2. 继续开发新功能
3. 配置自定义域名
4. 添加评论功能
5. 集成 Google Analytics
6. 优化 SEO

如有问题，可以：
- 查看 Vercel 文档：https://vercel.com/docs
- 查看 Next.js 文档：https://nextjs.org/docs
- 查看 Prisma 文档：https://www.prisma.io/docs
