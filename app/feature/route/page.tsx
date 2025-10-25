import Link from 'next/link';

export default function RoutePage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Route Demo Page
        </h1>

        <nav className="space-x-4 mb-8">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            Home
          </Link>
          <Link
            href="/posts"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            Posts
          </Link>
        </nav>

        
      </div>
    </div>
  );
}
