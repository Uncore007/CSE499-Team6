'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Package, DollarSign } from 'lucide-react'

interface GroceryItem {
  id: string
  name: string
  category: string
  price: number
  unit: string
  created_at: string
}

const categories = [
  'Produce',
  'Dairy',
  'Meat',
  'Bakery',
  'Pantry',
  'Frozen',
  'Beverages',
  'Snacks',
  'Health & Beauty',
  'Household'
]

const units = [
  'each',
  'lb',
  'oz',
  'kg',
  'g',
  'box',
  'bag',
  'bottle',
  'can',
  'jar'
]

export default function GroceryItemsPage() {
  const [items, setItems] = useState<GroceryItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GroceryItem | null>(null)
  const [filterCategory, setFilterCategory] = useState('all')
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    unit: 'each'
  })

  useEffect(() => {
    setItems([
      {
        id: '1',
        name: 'Bananas',
        category: 'Produce',
        price: 1.99,
        unit: 'lb',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Milk',
        category: 'Dairy',
        price: 3.49,
        unit: 'gallon',
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Chicken Breast',
        category: 'Meat',
        price: 4.99,
        unit: 'lb',
        created_at: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Whole Wheat Bread',
        category: 'Bakery',
        price: 2.99,
        unit: 'loaf',
        created_at: new Date().toISOString()
      }
    ])
  }, [])

  const filteredItems = filterCategory === 'all' 
    ? items 
    : items.filter(item => item.category === filterCategory)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingItem) {
      setItems(items.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, price: parseFloat(formData.price) }
          : item
      ))
    } else {
      const newItem: GroceryItem = {
        id: Date.now().toString(),
        ...formData,
        price: parseFloat(formData.price),
        created_at: new Date().toISOString()
      }
      setItems([...items, newItem])
    }
    
    setFormData({ name: '', category: '', price: '', unit: 'each' })
    setEditingItem(null)
    setIsModalOpen(false)
  }

  const handleEdit = (item: GroceryItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      unit: item.unit
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Produce': 'bg-green-100 text-green-800',
      'Dairy': 'bg-blue-100 text-blue-800',
      'Meat': 'bg-red-100 text-red-800',
      'Bakery': 'bg-yellow-100 text-yellow-800',
      'Pantry': 'bg-orange-100 text-orange-800',
      'Frozen': 'bg-cyan-100 text-cyan-800',
      'Beverages': 'bg-purple-100 text-purple-800',
      'Snacks': 'bg-pink-100 text-pink-800',
      'Health & Beauty': 'bg-indigo-100 text-indigo-800',
      'Household': 'bg-gray-100 text-gray-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grocery Items</h1>
          <p className="text-gray-600 mt-2">Manage your grocery items and prices</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Category
        </label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-xl font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </span>
                <span className="text-gray-600 text-sm">per {item.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {filterCategory === 'all' ? 'No items yet' : `No items in ${filterCategory}`}
          </h3>
          <p className="text-gray-600 mb-6">
            {filterCategory === 'all' 
              ? 'Add your first grocery item to get started' 
              : `Add items to the ${filterCategory} category`}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Add Your First Item
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">
              {editingItem ? 'Edit Item' : 'Add New Item'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g., Organic Bananas"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingItem(null)
                    setFormData({ name: '', category: '', price: '', unit: 'each' })
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
