import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting to seed data...')

  // Create test users
  const hashedPassword = await bcrypt.hash('123456', 10)

  const user1 = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin',
    },
  })

  console.log('Users created:', { user1, user2 })

  // Create test posts
  const posts = [
    {
      title: 'Welcome to My Blog',
      content: `This is my first blog post.

I'll be sharing my learning experiences, technical insights, and life reflections here.

I hope this blog can document my growth journey and help others along the way.

Let's learn together and make progress!`,
      published: true,
      authorId: user1.id,
    },
    {
      title: 'Introduction to Next.js 15 New Features',
      content: `Next.js 15 brings many exciting new features:

1. **Performance Optimization**: 30% faster startup time
2. **React 19 Support**: Full support for the latest React features
3. **Turbopack**: Faster build tool
4. **Improved Caching**: Smarter data caching strategies
5. **Enhanced Server Actions**: More powerful server-side operations

These new features make the development experience smoother and significantly improve application performance.`,
      published: true,
      authorId: user2.id,
    },
    {
      title: 'How to Learn Programming',
      content: `Learning programming is a gradual process. Here are some suggestions:

**1. Build a Strong Foundation**
- Learn the basic syntax of a programming language
- Understand data structures and algorithms
- Master fundamental programming thinking

**2. Practice is Key**
- Write more code, work on more projects
- Participate in open source projects
- Solve real-world problems

**3. Continuous Learning**
- Stay updated with technology trends
- Read excellent code
- Join tech communities

**4. Be Patient**
Programming takes time to learn. Don't rush, enjoy the learning process.`,
      published: true,
      authorId: user1.id,
    },
    {
      title: 'TypeScript Best Practices',
      content: `TypeScript makes JavaScript development more reliable. Here are some best practices:

1. **Use Types Wisely**
   - Avoid using any
   - Leverage interface and type
   - Use generics to improve code reusability

2. **Strict Mode**
   - Enable strict mode
   - Use strictNullChecks
   - Configure noImplicitAny

3. **Toolchain Configuration**
   - Configure ESLint
   - Use Prettier for code formatting
   - Integrate into CI/CD pipeline

Following these practices will make your TypeScript projects more robust and maintainable.`,
      published: true,
      authorId: user2.id,
    },
    {
      title: 'Full Stack Development Guide for Beginners',
      content: `Full stack development requires knowledge of both frontend and backend:

**Frontend Skills**
- HTML/CSS/JavaScript basics
- React/Vue/Angular frameworks
- Responsive design
- Frontend build tools

**Backend Skills**
- Node.js/Python/Java languages
- Database design (SQL/NoSQL)
- RESTful API design
- Server deployment

**General Skills**
- Git version control
- Linux basic commands
- Network protocol knowledge
- Software engineering thinking

The learning path for full stack development is long, but mastering it will make you more versatile in development.`,
      published: true,
      authorId: user1.id,
    },
    {
      title: 'Prisma ORM Experience',
      content: `Prisma is a modern ORM tool with an excellent user experience:

**Advantages:**
✅ Type-safe database queries
✅ Auto-generated type definitions
✅ Intuitive Schema definition
✅ Powerful migration tools
✅ Excellent developer experience

**Common Commands:**
- prisma init - Initialize project
- prisma db push - Sync database
- prisma migrate dev - Create migration
- prisma studio - Visual database management

**Usage Tips:**
1. Design data models carefully
2. Leverage relational queries
3. Pay attention to performance optimization
4. Use transactions to ensure data consistency

Prisma makes database operations simple and safe!`,
      published: true,
      authorId: user2.id,
    },
    {
      title: 'Vercel Deployment in Practice',
      content: `Vercel is the best choice for deploying Next.js applications:

**Why Choose Vercel?**
- Optimized for Next.js
- Automatic HTTPS certificates
- Global CDN acceleration
- Zero-configuration deployment
- Generous free tier

**Deployment Steps:**
1. Connect GitHub repository
2. Configure environment variables
3. Click deploy button
4. Wait for build to complete

**Important Notes:**
- Ensure environment variables are correctly configured
- Database connection should use production address
- Check build logs to troubleshoot issues
- Configure custom domain

With just a few simple steps, your application can go live!`,
      published: true,
      authorId: user1.id,
    },
    {
      title: 'Deep Understanding of React Hooks',
      content: `React Hooks have changed the way we write components:

**Common Hooks:**

1. **useState** - State management
2. **useEffect** - Side effect handling
3. **useContext** - Context usage
4. **useRef** - Reference management
5. **useMemo** - Performance optimization
6. **useCallback** - Callback optimization

**Best Practices:**
- Follow the Rules of Hooks
- Split components appropriately
- Avoid premature optimization
- Handle dependency arrays correctly

**Custom Hooks:**
Encapsulating reusable logic into custom Hooks can greatly improve code maintainability.

Mastering Hooks is essential on the path to becoming a React expert!`,
      published: true,
      authorId: user2.id,
    },
  ]

  for (const post of posts) {
    const created = await prisma.post.create({
      data: post,
    })
    console.log(`Post created: ${created.title}`)
  }

  console.log('Data seeding completed!')
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
