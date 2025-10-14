'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Navbar from '../../components/Navbar'

interface GroceryItem {
  id: string
  name: string
  quantity: number
  units: string | null
  is_purchased: boolean
  store_id: string | null
  inventory_id: string | null
  user_id: string
  created_at: string
}

interface Store {
  id: string
  name: string
}

export default function GroceryItemsPage() {
  const [items, setItems] = useState<GroceryItem[]>([])
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [itemsRes, storesRes] = await Promise.all([
        fetch('/api/grocery_items'),
        fetch('/api/stores')
      ])
      
      if (!itemsRes.ok) throw new Error('Failed to fetch grocery items')
      if (!storesRes.ok) throw new Error('Failed to fetch stores')
      
      const itemsData = await itemsRes.json()
      const storesData = await storesRes.json()
      
      setItems(itemsData)
      setStores(storesData)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const response = await fetch(`/api/grocery_items/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete item')
      setItems(items.filter(i => i.id !== id))
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    }
  }

  const purchaseItem = async (item: GroceryItem) => {
    setError('')
    setSuccessMessage('')

    try {
      const response = await fetch(`/api/grocery_items/${item.id}/purchase`, {
        method: 'POST',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to purchase item')
      }

      const result = await response.json()
      
      // Update the item in the list
      setItems(items.map(i => 
        i.id === item.id ? { ...i, is_purchased: true } : i
      ))

      // Show success message
      if (result.inventory_updated) {
        setSuccessMessage(`✓ ${item.name} purchased and marked as in stock!`)
      } else {
        setSuccessMessage(`✓ ${item.name} purchased!`)
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    }
  }

  const togglePurchased = async (item: GroceryItem) => {
    try {
      const response = await fetch(`/api/grocery_items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: item.name,
          quantity: item.quantity,
          units: item.units,
          store_id: item.store_id,
          is_purchased: !item.is_purchased,
        }),
      })
      if (!response.ok) throw new Error('Failed to update item')
      setItems(items.map(i => 
        i.id === item.id ? { ...i, is_purchased: !i.is_purchased } : i
      ))
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    }
  }

  const updateStore = async (itemId: string, storeId: string) => {
    const item = items.find(i => i.id === itemId)
    if (!item) return

    try {
      const response = await fetch(`/api/grocery_items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: item.name,
          quantity: item.quantity,
          units: item.units,
          store_id: storeId || null,
          is_purchased: item.is_purchased,
        }),
      })
      if (!response.ok) throw new Error('Failed to update store')
      setItems(items.map(i => 
        i.id === itemId ? { ...i, store_id: storeId || null } : i
      ))
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    }
  }

  const getStoreName = (storeId: string | null) => {
    if (!storeId) return 'No store assigned'
    const store = stores.find(s => s.id === storeId)
    return store ? store.name : 'Unknown store'
  }

  if (loading) return <div className="p-6 bg-gray-900 min-h-screen text-white">Loading grocery items...</div>
  if (error) return <div className="p-6 bg-gray-900 min-h-screen text-red-600">Error: {error}</div>

  const unpurchasedItems = items.filter(item => !item.is_purchased)
  const purchasedItems = items.filter(item => item.is_purchased)

  // Group unpurchased items by store
  const itemsByStore = unpurchasedItems.reduce((acc, item) => {
    const storeKey = item.store_id || 'unassigned'
    if (!acc[storeKey]) {
      acc[storeKey] = []
    }
    acc[storeKey].push(item)
    return acc
  }, {} as Record<string, GroceryItem[]>)

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-6 md:ml-56">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Grocery List</h1>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/stores/new')}
              className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg font-semibold"
            >
              + Add Store
            </button>
            <button
              onClick={() => router.push('/grocery_items/new')}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold"
            >
              + Add Item
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-600/20 border border-red-600 rounded">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-green-600/20 border border-green-600 rounded animate-pulse">
            {successMessage}
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p>No grocery items yet. Add your first item!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Shopping List - Grouped by Store */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Shopping List ({unpurchasedItems.length})</h2>
              
              {stores.length === 0 && unpurchasedItems.length > 0 && (
                <div className="mb-4 p-4 bg-yellow-600/20 border border-yellow-600 rounded">
                  <p className="text-yellow-400">💡 Create stores to organize your shopping list better!</p>
                </div>
              )}

              <div className="space-y-6">
                {/* Unassigned Items */}
                {itemsByStore.unassigned && itemsByStore.unassigned.length > 0 && (
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-4 text-gray-400">📋 Unassigned Items ({itemsByStore.unassigned.length})</h3>
                    <div className="space-y-3">
                      {itemsByStore.unassigned.map((item) => (
                        <GroceryItemRow
                          key={item.id}
                          item={item}
                          stores={stores}
                          onUpdateStore={updateStore}
                          onPurchase={purchaseItem}
                          onDelete={deleteItem}
                          router={router}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Items Grouped by Store */}
                {stores.map((store) => {
                  const storeItems = itemsByStore[store.id] || []
                  if (storeItems.length === 0) return null

                  return (
                    <div key={store.id} className="bg-gray-800 rounded-lg p-4">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        🏪 {store.name} <span className="text-sm text-gray-400">({storeItems.length})</span>
                      </h3>
                      <div className="space-y-3">
                        {storeItems.map((item) => (
                          <GroceryItemRow
                            key={item.id}
                            item={item}
                            stores={stores}
                            onUpdateStore={updateStore}
                            onPurchase={purchaseItem}
                            onDelete={deleteItem}
                            router={router}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Purchased Items */}
            {purchasedItems.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-400">✓ Purchased ({purchasedItems.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {purchasedItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-800/50 rounded-lg p-4 opacity-75"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold line-through text-gray-400">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            {item.quantity} {item.units || 'item(s)'}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            📍 {getStoreName(item.store_id)}
                          </p>
                          {item.inventory_id && (
                            <p className="text-sm text-green-500 mt-1">
                              ✓ Inventory updated
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => togglePurchased(item)}
                          className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm"
                        >
                          ↺ Mark Unpurchased
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  )
}

function GroceryItemRow({
  item,
  stores,
  onUpdateStore,
  onPurchase,
  onDelete,
  router
}: {
  item: GroceryItem
  stores: Store[]
  onUpdateStore: (itemId: string, storeId: string) => void
  onPurchase: (item: GroceryItem) => void
  onDelete: (id: string) => void
  router: any
}) {
  return (
    <div className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold mb-1">{item.name}</h4>
          <p className="text-sm text-gray-400">
            {item.quantity} {item.units || 'item(s)'}
          </p>
          {item.inventory_id && (
            <p className="text-sm text-blue-400 mt-1">
              🔗 Linked to inventory
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <select
            value={item.store_id || ''}
            onChange={(e) => onUpdateStore(item.id, e.target.value)}
            className="px-3 py-2 bg-gray-600 border border-gray-500 rounded hover:bg-gray-500 transition text-sm min-w-[150px]"
          >
            <option value="">📍 Assign Store</option>
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                🏪 {store.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => onPurchase(item)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm whitespace-nowrap font-semibold"
              title="Purchase item (marks inventory as in stock)"
            >
              ✓ Purchase
            </button>
            <button
              onClick={() => router.push(`/grocery_items/${item.id}/edit`)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
              title="Edit item"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm"
              title="Delete item"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}