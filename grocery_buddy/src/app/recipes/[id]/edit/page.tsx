'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditRecipePage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
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

  useEffect(() => {
    fetchRecipe()
  }, [params.id])

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`/api/recipes/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch recipe')
      const data = await response.json()
      setFormData({
        title: data.title || '',
        description: data.description || '',
        source_url: data.source_url || '',
        image_url: data.image_url || '',
        instructions: data.instructions || '',
        prep_minutes: data.prep_minutes?.toString() || '',
        cook_minutes: data.cook_minutes?.toString() || '',
        servings: data.servings?.toString() || '',
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setFetchLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/recipes/${params.id}`, {
        method: 'PUT',
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
        throw new Error(data.error || 'Failed to update recipe')
      }

      router.push(`/recipes/${params.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) return <div className="p-6 bg-gray-900 min-h-screen text-white">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Edit Recipe</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-600/20 border border-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Same form fields as create page */}
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
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => router.push(`/recipes/${params.id}`)}
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