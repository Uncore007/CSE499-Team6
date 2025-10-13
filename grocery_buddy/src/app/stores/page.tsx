'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Navbar from '../../components/Navbar'

interface Store {
  id: string
  name: string
  user_id: string
  created_at: string
}

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchStores()
  }, [])

  const fetchStores = async () => {
    try {
      const response = await fetch('/api/stores')
      if (!response.ok) throw new Error('Failed to fetch stores')
      const data = await response.json()
      setStores(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const deleteStore = async (id: string) => {
    if (!confirm('Are you sure you want to delete this store?')) return

    try {
      const response = await fetch(`/api/stores/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete store')
      setStores(stores.filter(s => s.id !== id))
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) return <div className="p-6 bg-gray-900 min-h-screen text-white">Loading stores...</div>
  if (error) return <div className="p-6 bg-gray-900 min-h-screen text-red-600">Error: {error}</div>

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">My Stores</h1>
            <button
              onClick={() => router.push('/stores/new')}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold"
            >
              Add New Store
            </button>
          </div>

          {stores.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p>No stores yet. Create your first store!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center text-2xl">
                        🏪
                      </div>
                      <h3 className="text-xl font-semibold">{store.name}</h3>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => router.push(`/stores/${store.id}`)}
                      className="flex-1 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => router.push(`/stores/${store.id}/edit`)}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteStore(store.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}