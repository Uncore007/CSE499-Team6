'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface Store {
  id: string
  name: string
  user_id: string
  created_at: string
}

export default function StoreDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [store, setStore] = useState<Store | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStore()
  }, [params.id])

  const fetchStore = async () => {
    try {
      const response = await fetch(`/api/stores/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch store')
      const data = await response.json()
      setStore(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this store?')) return

    try {
      const response = await fetch(`/api/stores/${params.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete store')
      router.push('/stores')
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) return <div className="p-6 bg-gray-900 min-h-screen text-white">Loading...</div>
  if (error) return <div className="p-6 bg-gray-900 min-h-screen text-red-600">Error: {error}</div>
  if (!store) return <div className="p-6 bg-gray-900 min-h-screen text-white">Store not found</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/stores')}
          className="mb-6 text-orange-500 hover:text-orange-400"
        >
          ← Back to Stores
        </button>

        <div className="bg-gray-800 rounded-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-violet-600 rounded-lg flex items-center justify-center text-4xl">
                🏪
              </div>
              <div>
                <h1 className="text-4xl font-bold">{store.name}</h1>
                <p className="text-gray-400 mt-2">
                  Created on {new Date(store.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/stores/${store.id}/edit`)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded font-semibold"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h2 className="text-xl font-semibold mb-4">Store Information</h2>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span className="font-semibold">Store ID:</span>
                <span className="text-gray-400">{store.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Name:</span>
                <span>{store.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}