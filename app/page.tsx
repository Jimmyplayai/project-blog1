import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Blog
          </h1>
          <p className="text-gray-600 mb-8">
            A simple and elegant blog platform
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full py-3 px-4 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition duration-200"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="block w-full py-3 px-4 text-center text-indigo-600 bg-white border-2 border-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition duration-200"
          >
            Register
          </Link>

          <Link
            href="/posts"
            className="block w-full py-3 px-4 text-center text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition duration-200"
          >
            Browse Posts
          </Link>

          <Link
            href="/feature/route"
            className="block w-full py-3 px-4 text-center text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition duration-200"
          >
            Nextjs,Route
          </Link>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>Built with Next.js 15 + Prisma + MySQL</p>
        </div>
      </div>
    </div>
  )
}
