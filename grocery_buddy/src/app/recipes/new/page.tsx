'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewRecipePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    source_url: '',
    image_url: '',
    instructions: '',
    prep_minutes: '',
    cook_minutes: '',
    servings: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          prep_minutes: formData.prep_minutes ? Number(formData.prep_minutes) : null,
          cook_minutes: formData.cook_minutes ? Number(formData.cook_minutes) : null,
          servings: formData.servings ? Number(formData.servings) : null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create recipe')
      }

      router.push('/recipes')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Create New Recipe</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-600/20 border border-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-orange-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Prep Time (min)</label>
              <input
                type="number"
                name="prep_minutes"
                value={formData.prep_minutes}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Cook Time (min)</label>
              <input
                type="number"
                name="cook_minutes"
                value={formData.cook_minutes}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Servings</label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Source URL</label>
            <input
              type="url"
              name="source_url"
              value={formData.source_url}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Image URL</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-orange-500 outline-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded font-semibold disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Recipe'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/recipes')}
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