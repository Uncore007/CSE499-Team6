'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface InventoryItem {
  id: string
  name: string
  in_stock: boolean
}

interface RecipeInventoryItem {
  id: string
  qty: number | null
  unit: string | null
  inventory: InventoryItem
}

export default function RecipeIngredientsPage() {
  const params = useParams()
  const router = useRouter()
  const [recipeTitle, setRecipeTitle] = useState('')
  const [ingredients, setIngredients] = useState<RecipeInventoryItem[]>([])
  const [availableInventory, setAvailableInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [addFormData, setAddFormData] = useState({
    inventory_id: '',
    qty: '',
    unit: ''
  })

  useEffect(() => {
    fetchData()
  }, [params.id])

  const fetchData = async () => {
    try {
      const [recipeRes, ingredientsRes, inventoryRes] = await Promise.all([
        fetch(`/api/recipes/${params.id}`),
        fetch(`/api/recipes/${params.id}/inventory`),
        fetch('/api/inventory')
      ])

      if (!recipeRes.ok) throw new Error('Failed to fetch recipe')
      if (!ingredientsRes.ok) throw new Error('Failed to fetch ingredients')
      if (!inventoryRes.ok) throw new Error('Failed to fetch inventory')

      const recipeData = await recipeRes.json()
      const ingredientsData = await ingredientsRes.json()
      const inventoryData = await inventoryRes.json()

      setRecipeTitle(recipeData.title)
      setIngredients(ingredientsData)
      setAvailableInventory(inventoryData)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddIngredient = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch(`/api/recipes/${params.id}/inventory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inventory_id: addFormData.inventory_id,
          qty: addFormData.qty ? Number(addFormData.qty) : null,
          unit: addFormData.unit || null
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to add ingredient')
      }

      setAddFormData({ inventory_id: '', qty: '', unit: '' })
      setShowAddForm(false)
      fetchData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleUpdateIngredient = async (itemId: string, qty: string, unit: string) => {
    try {
      const response = await fetch(`/api/recipes/${params.id}/inventory/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qty: qty ? Number(qty) : null,
          unit: unit || null
        })
      })

      if (!response.ok) throw new Error('Failed to update ingredient')
      fetchData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleRemoveIngredient = async (itemId: string) => {
    if (!confirm('Remove this ingredient from the recipe?')) return

    try {
      const response = await fetch(`/api/recipes/${params.id}/inventory/${itemId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to remove ingredient')
      fetchData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) return <div className="p-6 bg-gray-900 min-h-screen text-white">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push(`/recipes/${params.id}`)}
          className="mb-6 text-orange-500 hover:text-orange-400"
        >
          ← Back to Recipe
        </button>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Ingredients for {recipeTitle}</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold"
          >
            {showAddForm ? 'Cancel' : 'Add Ingredient'}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-600/20 border border-red-600 rounded">
            {error}
          </div>
        )}

        {showAddForm && (
          <form onSubmit={handleAddIngredient} className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Add Ingredient</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Inventory Item *</label>
                <select
                  value={addFormData.inventory_id}
                  onChange={(e) => setAddFormData({ ...addFormData, inventory_id: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:border-orange-500 outline-none"
                >
                  <option value="">Select an item</option>
                  {availableInventory.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} {!item.in_stock && '(Out of stock)'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Quantity</label>
                  <input
                    type="number"
                    value={addFormData.qty}
                    onChange={(e) => setAddFormData({ ...addFormData, qty: e.target.value })}
                    step="0.01"
                    placeholder="e.g., 2"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Unit</label>
                  <input
                    type="text"
                    value={addFormData.unit}
                    onChange={(e) => setAddFormData({ ...addFormData, unit: e.target.value })}
                    placeholder="e.g., cups, tbsp"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:border-orange-500 outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded font-semibold"
              >
                Add to Recipe
              </button>
            </div>
          </form>
        )}

        {ingredients.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p>No ingredients added yet. Add your first ingredient!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {ingredients.map((item) => (
              <IngredientRow
                key={item.id}
                item={item}
                onUpdate={handleUpdateIngredient}
                onRemove={handleRemoveIngredient}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function IngredientRow({
  item,
  onUpdate,
  onRemove
}: {
  item: RecipeInventoryItem
  onUpdate: (id: string, qty: string, unit: string) => void
  onRemove: (id: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [qty, setQty] = useState(item.qty?.toString() || '')
  const [unit, setUnit] = useState(item.unit || '')

  const handleSave = () => {
    onUpdate(item.id, qty, unit)
    setEditing(false)
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      {editing ? (
        <div className="grid gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              item.inventory.in_stock ? 'bg-green-600' : 'bg-red-600'
            }`}>
              {item.inventory.in_stock ? '✓' : '✗'}
            </div>
            <h3 className="text-lg font-semibold">{item.inventory.name}</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Quantity"
              step="0.01"
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:border-orange-500 outline-none"
            />
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Unit"
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:border-orange-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              item.inventory.in_stock ? 'bg-green-600' : 'bg-red-600'
            }`}>
              {item.inventory.in_stock ? '✓' : '✗'}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{item.inventory.name}</h3>
              <p className="text-sm text-gray-400">
                {item.qty && item.unit ? `${item.qty} ${item.unit}` : 
                 item.qty ? `${item.qty}` : 
                 item.unit ? item.unit : 
                 'No quantity specified'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onRemove(item.id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  )
}