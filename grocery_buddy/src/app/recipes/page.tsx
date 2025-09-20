import Layout from '@/components/Layout';
import Card from '@/components/Card';
import { Plus, Search, Filter, BookOpen, Clock, Users } from 'lucide-react';

export default function RecipesPage() {
  const placeholderRecipes = [
    {
      id: 1,
      name: 'Chicken Alfredo Pasta',
      prepTime: '30 min',
      servings: 4,
      difficulty: 'Easy',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'Vegetarian Stir Fry',
      prepTime: '20 min',
      servings: 2,
      difficulty: 'Easy',
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'Beef Tacos',
      prepTime: '45 min',
      servings: 6,
      difficulty: 'Medium',
      image: '/api/placeholder/300/200'
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Recipes</h1>
            <p className="text-gray-600 mt-1">Manage your personal recipe collection</p>
          </div>
          <button className="mt-4 sm:mt-0 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Recipe</span>
          </button>
        </div>

        {/* Search and Filter */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
        </Card>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{recipe.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.prepTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {recipe.difficulty}
                  </span>
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                    View Recipe
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        <Card className="p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes yet</h3>
          <p className="text-gray-600 mb-6">Start building your recipe collection by adding your first recipe.</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Add Your First Recipe
          </button>
        </Card>
      </div>
    </Layout>
  );
}
