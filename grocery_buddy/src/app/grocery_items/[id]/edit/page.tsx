'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface Store {
  id: string
  name: string
}

export default function EditGroceryItemPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState('')
  const [stores, setStores] = useState<Store[]>([])
  const [formData, setFormData] = useState({
    name: '',
    quantity: '1',
    units: '',
    store_id: '',
    is_purchased: false,
  })

  useEffect(() => {
    fetchData()
  }, [params.id])

  const fetchData = async () => {
    try {
      const [itemRes, storesRes] = await Promise.all([
        fetch(`/api/grocery_items/${params.id}`),
        fetch('/api/stores')
      ])
      
      if (!itemRes.ok) throw new Error('Failed to fetch item')
      if (!storesRes.ok) throw new Error('Failed to fetch stores')
      
      const itemData = await itemRes.json()
      const storesData = await storesRes.json()
      
      setFormData({
        name: itemData.name || '',
        quantity: itemData.quantity?.toString() || '1',
        units: itemData.units || '',
        store_id: itemData.store_id || '',
        is_purchased: itemData.is_purchased ?? false,
      })
      setStores(storesData)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    } finally {
      setFetchLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData({ ...formData, [name]: checked })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/grocery_items/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          quantity: Number(formData.quantity),
          units: formData.units || null,
          store_id: formData.store_id || null,
          is_purchased: formData.is_purchased,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update item')
      }

      router.push(`/grocery_items/${params.id}`)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) return <div className="p-6 bg-gray-900 min-h-screen text-white">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Edit Grocery Item</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-600/20 border border-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Item Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Milk, Bread, Apples"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-orange-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
                step="0.01"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Units</label>
              <input
                type="text"
                name="units"
                value={formData.units}
                onChange={handleChange}
                placeholder="e.g., lbs, oz, gallons"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Store</label>
            <select
              name="store_id"
              value={formData.store_id}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-orange-500 outline-none"
            >
              <option value="">No store assigned</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_purchased"
              name="is_purchased"
              checked={formData.is_purchased}
              onChange={handleChange}
              className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-orange-500 focus:ring-orange-500"
            />
            <label htmlFor="is_purchased" className="text-sm font-semibold">
              Item is purchased
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded font-semibold disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => router.push(`/grocery_items/${params.id}`)}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}