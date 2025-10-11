'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'

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
  user_id: string
  created_at: string
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes')
      if (!response.ok) throw new Error('Failed to fetch recipes')
      const data = await response.json()
      setRecipes(data)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const deleteRecipe = async (id: string) => {
    if (!confirm('Are you sure you want to delete this recipe?')) return

    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete recipe')
      setRecipes(recipes.filter(r => r.id !== id))
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    }
  }

  if (loading) return <div className="p-6">Loading recipes...</div>
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-3 sm:p-4 md:p-6 md:ml-56">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">My Recipes</h1>
          <button
            onClick={() => router.push('/recipes/new')}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold text-sm sm:text-base transition whitespace-nowrap"
          >
            Add New Recipe
          </button>
        </div>

        {recipes.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-sm sm:text-base">No recipes yet. Create your first recipe!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                {recipe.image_url && (
                  <img
                    src={recipe.image_url}
                    alt={recipe.title}
                    className="w-full h-40 sm:h-44 md:h-48 object-cover"
                  />
                )}
                <div className="p-3 sm:p-4">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-1">{recipe.title}</h3>
                  {recipe.description && (
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                      {recipe.description}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                    {recipe.prep_minutes && <span className="whitespace-nowrap">⏱️ Prep: {recipe.prep_minutes}m</span>}
                    {recipe.cook_minutes && <span className="whitespace-nowrap">🔥 Cook: {recipe.cook_minutes}m</span>}
                    {recipe.servings && <span className="whitespace-nowrap">👥 Serves: {recipe.servings}</span>}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => router.push(`/recipes/${recipe.id}`)}
                      className="flex-1 px-3 sm:px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded text-sm sm:text-base transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => router.push(`/recipes/${recipe.id}/edit`)}
                      className="flex-1 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm sm:text-base transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteRecipe(recipe.id)}
                      className="px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm sm:text-base transition"
                    >
                      Delete
                    </button>
                  </div>
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