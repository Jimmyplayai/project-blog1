# Next.js Blog with Authentication

> A simple full-stack blog application built with Next.js + Vercel, featuring user authentication and article listing. Supports rapid local development and deployment.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project demonstrates a simple full-stack application with:

- User authentication (Register / Login / Logout)
- Article listing page for authenticated users
- Next.js API Routes for handling authentication logic
- Support for local development and Vercel deployment

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 18, Tailwind CSS |
| Backend | Next.js API Routes (Serverless Functions) |
| Database | PlanetScale / MySQL |
| ORM | Prisma |
| Deployment | Vercel |
| State Management | React Context / SWR / TanStack Query |

---

## Features

1. **User Authentication**
   - Login page `/login`
   - Register page `/register`
   - Authentication validation and encrypted password storage

2. **Article Listing**
   - Article list page `/posts`
   - Display articles with pagination
   - Authentication required to access

3. **API Support**
   - `/api/auth/login` → User login
   - `/api/auth/register` → User registration
   - `/api/posts` → Get article list

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd project-blog1
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Then edit the `.env` file with your configuration:

```env
DATABASE_URL="mysql://username:password@host:3306/database_name"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

### 4. Initialize Database

```bash
# Sync Prisma schema to database
npx prisma db push

# Or use migration (recommended for production)
npx prisma migrate dev --name init
```

### 5. Seed Test Data (Optional)

```bash
npm run seed
```

This will create:
- 2 test users (test@example.com / admin@example.com, password: 123456)
- 8 sample articles

### 6. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

---

## Environment Variables

Create a `.env` file in the project root:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `mysql://user:pass@localhost:3306/blog_db` |
| `JWT_SECRET` | JWT encryption key | `your-random-secret-key-min-32-chars` |

**Important Notes**:
- Use strong passwords and secure JWT_SECRET in production
- Never commit the `.env` file to Git

---

## Database

### Local Development - MySQL

#### Option 1: Docker Quick Start (Recommended)

```bash
docker run --name mysql-blog \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=blog_db \
  -p 3306:3306 \
  -d mysql:8.0
```

Then configure `.env`:
```env
DATABASE_URL="mysql://root:password@localhost:3306/blog_db"
```

#### Option 2: Local MySQL Installation

1. Download and install MySQL: https://dev.mysql.com/downloads/mysql/
2. Create database:
```sql
CREATE DATABASE blog_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
3. Configure `DATABASE_URL` in `.env` file

### Production - PlanetScale (Recommended)

PlanetScale is a Serverless MySQL platform, perfect for use with Vercel.

#### 1. Create PlanetScale Account

Visit https://planetscale.com/ and sign up (free tier available)

#### 2. Create Database

```bash
# Install PlanetScale CLI (optional)
brew install planetscale/tap/pscale

# Login
pscale auth login

# Create database
pscale database create blog-db --region ap-southeast
```

Or create via Web UI:
1. Login to PlanetScale Dashboard
2. Click "Create a new database"
3. Choose region (select closest to your users)
4. Complete creation

#### 3. Get Connection String

In PlanetScale Dashboard:
1. Navigate to your database
2. Click "Connect"
3. Select "Prisma" format
4. Copy connection string to `.env` file

Example:
```env
DATABASE_URL="mysql://xxxxx:pscale_pw_xxxxx@aws.connect.psdb.cloud/blog-db?sslaccept=strict"
```

#### 4. Initialize Database Tables

```bash
npx prisma db push
```

### Database Management Tools

View and manage data:

```bash
# Prisma Studio (recommended)
npx prisma studio

# Or use other tools:
# - TablePlus
# - MySQL Workbench
# - phpMyAdmin
```

---

## Deployment

### Deploy to Vercel

#### Method 1: Via GitHub (Recommended)

1. **Push Code to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

2. **Connect Vercel**

- Visit https://vercel.com/
- Click "New Project"
- Import your GitHub repository
- Vercel will automatically detect the Next.js project

3. **Configure Environment Variables**

Add environment variables in Vercel project settings:

- Go to Project → Settings → Environment Variables
- Add the following variables:
  ```
  DATABASE_URL=<your-planetscale-connection-string>
  JWT_SECRET=<your-jwt-secret>
  ```

4. **Deploy**

- Click "Deploy"
- Vercel will automatically build and deploy your project
- Access link will be provided after deployment

5. **Initialize Production Database**

```bash
# Use production DATABASE_URL
DATABASE_URL="your-production-url" npx prisma db push

# Add test data
DATABASE_URL="your-production-url" npm run seed
```

#### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Configure Custom Domain (Optional)

1. Go to Vercel project settings
2. Navigate to "Domains" tab
3. Add your domain
4. Configure DNS as instructed

### Post-Deployment Checklist

- [ ] Environment variables correctly configured
- [ ] Database connection successful
- [ ] Can register and login normally
- [ ] Article list page accessible
- [ ] API routes working properly

### Common Deployment Issues

**Issue 1: Database Connection Failed**
```
Solution: Check DATABASE_URL is correct, ensure PlanetScale database is created
```

**Issue 2: JWT Verification Failed**
```
Solution: Ensure JWT_SECRET environment variable is set and consistent with development
```

**Issue 3: Prisma Client Not Generated**
```
Solution: Ensure package.json has "postinstall": "prisma generate"
```

### Adding Test Data

After deployment, create users via the registration page, or use Prisma Studio:

```bash
# Connect to production database
DATABASE_URL="your-production-url" npx prisma studio
```

---

## Project Structure

```
project-blog1/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API Routes
│   │   ├── auth/         # Authentication endpoints
│   │   └── posts/        # Posts endpoints
│   ├── login/            # Login page
│   ├── register/         # Register page
│   ├── posts/            # Posts list page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── lib/                   # Utility functions
│   ├── prisma.ts         # Prisma client
│   └── auth.ts           # Auth utilities
├── prisma/               # Prisma schema and migrations
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding
├── middleware.ts         # Next.js middleware for auth
├── .env                  # Environment variables (not in git)
├── .env.example          # Environment template
└── package.json          # Dependencies and scripts
```

---

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database with test data
```

---

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register new user
  - Body: `{ email, password, name? }`
  - Returns: User object and sets auth cookie

- **POST** `/api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: User object and sets auth cookie

- **POST** `/api/auth/logout` - Logout user
  - Returns: Success message and clears auth cookie

### Posts

- **GET** `/api/posts` - Get paginated posts (requires authentication)
  - Query: `?page=1&limit=10`
  - Returns: Posts array with pagination info

- **POST** `/api/posts` - Create new post (requires authentication)
  - Body: `{ title, content, published? }`
  - Returns: Created post object

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

If you have any questions or need help, please:
- Check the [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guide
- Visit [Next.js Documentation](https://nextjs.org/docs)
- Visit [Prisma Documentation](https://www.prisma.io/docs)
- Visit [Vercel Documentation](https://vercel.com/docs)

---

## Acknowledgments

- Built with [Next.js 15](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database ORM by [Prisma](https://www.prisma.io/)
- Deployed on [Vercel](https://vercel.com/)

---

**Happy Coding! 🚀**
