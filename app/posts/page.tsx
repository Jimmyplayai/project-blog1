'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Post {
  id: number
  title: string
  content: string
  createdAt: string
  author: {
    id: number
    name: string | null
    email: string
  }
}

interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
}

export default function PostsPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchPosts(currentPage)
  }, [currentPage])

  const fetchPosts = async (page: number) => {
    try {
      setLoading(true)
      const res = await fetch(`/api/posts?page=${page}&limit=10`)

      if (res.status === 401) {
        router.push('/login')
        return
      }

      if (!res.ok) {
        throw new Error('Failed to fetch posts')
      }

      const data = await res.json()
      setPosts(data.posts)
      setPagination(data.pagination)
    } catch (err) {
      setError('Failed to load posts, please try again later')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
      router.refresh()
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts yet</p>
            <p className="text-gray-400 text-sm mt-2">Create your first post!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="font-medium">
                    {post.author.name || post.author.email}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
              </article>
            ))}
          </div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-sm text-gray-700">
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={currentPage === pagination.totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
