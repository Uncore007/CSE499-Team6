'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface Recipe {
  id: string
  title: string
  description: string | null
  source_url: string | null
  image_url: string | null
  instructions: string | null
  prep_minutes: number | null
  cook_minutes: number | null
  servings: number | null
}

export default function RecipeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRecipe()
  }, [params.id])

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`/api/recipes/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch recipe')
      const data = await response.json()
      setRecipe(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-6 bg-gray-900 min-h-screen text-white">Loading...</div>
  if (error) return <div className="p-6 bg-gray-900 min-h-screen text-red-600">Error: {error}</div>
  if (!recipe) return <div className="p-6 bg-gray-900 min-h-screen text-white">Recipe not found</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/recipes')}
          className="mb-6 text-orange-500 hover:text-orange-400"
        >
          ← Back to Recipes
        </button>

        {recipe.image_url && (
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
        )}

        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-bold">{recipe.title}</h1>
          <button
            onClick={() => router.push(`/recipes/${recipe.id}/edit`)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Edit
          </button>
        </div>

        {recipe.description && (
          <p className="text-gray-300 text-lg mb-6">{recipe.description}</p>
        )}

        <div className="flex gap-6 mb-6 text-gray-400">
          {recipe.prep_minutes && (
            <div>
              <span className="font-semibold">Prep Time:</span> {recipe.prep_minutes} min
            </div>
          )}
          {recipe.cook_minutes && (
            <div>
              <span className="font-semibold">Cook Time:</span> {recipe.cook_minutes} min
            </div>
          )}
          {recipe.servings && (
            <div>
              <span className="font-semibold">Servings:</span> {recipe.servings}
            </div>
          )}
        </div>

        {recipe.instructions && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <div className="whitespace-pre-wrap">{recipe.instructions}</div>
          </div>
        )}

        {recipe.source_url && (
          <a
            href={recipe.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-400"
          >
            View Original Recipe →
          </a>
        )}
      </div>
    </div>
  )
}