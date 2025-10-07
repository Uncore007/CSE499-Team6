'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface InventoryItem {
  id: string
  name: string
  in_stock: boolean
  user_id: string
  created_at: string
}

export default function InventoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [item, setItem] = useState<InventoryItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchItem()
  }, [params.id])

  const fetchItem = async () => {
    try {
      const response = await fetch(`/api/inventory/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch item')
      const data = await response.json()
      setItem(data)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const response = await fetch(`/api/inventory/${params.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete item')
      router.push('/inventory')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    }
  }

  const toggleStock = async () => {
    if (!item) return

    try {
      const response = await fetch(`/api/inventory/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ in_stock: !item.in_stock }),
      })
      if (!response.ok) throw new Error('Failed to update item')
      setItem({ ...item, in_stock: !item.in_stock })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    }
  }

  if (loading) return <div className="p-6 bg-gray-900 min-h-screen text-white">Loading...</div>
  if (error) return <div className="p-6 bg-gray-900 min-h-screen text-red-600">Error: {error}</div>
  if (!item) return <div className="p-6 bg-gray-900 min-h-screen text-white">Item not found</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/inventory')}
          className="mb-6 text-orange-500 hover:text-orange-400"
        >
          ← Back to Inventory
        </button>

        <div className="bg-gray-800 rounded-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-4xl ${
                item.in_stock ? 'bg-green-600' : 'bg-red-600'
              }`}>
                {item.in_stock ? '✓' : '✗'}
              </div>
              <div>
                <h1 className="text-4xl font-bold">{item.name}</h1>
                <p className={`text-lg mt-2 ${item.in_stock ? 'text-green-400' : 'text-red-400'}`}>
                  {item.in_stock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={toggleStock}
                className={`px-6 py-3 rounded font-semibold ${
                  item.in_stock 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {item.in_stock ? 'Mark Out of Stock' : 'Mark In Stock'}
              </button>
              <button
                onClick={() => router.push(`/inventory/${item.id}/edit`)}
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
            <h2 className="text-xl font-semibold mb-4">Item Information</h2>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span className="font-semibold">Item ID:</span>
                <span className="text-gray-400">{item.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Name:</span>
                <span>{item.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <span className={item.in_stock ? 'text-green-400' : 'text-red-400'}>
                  {item.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Created:</span>
                <span>{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}