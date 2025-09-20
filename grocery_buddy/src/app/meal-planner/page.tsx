import Layout from '@/components/Layout';
import Card from '@/components/Card';
import { Calendar, Plus, Clock, Users, ChefHat } from 'lucide-react';

export default function MealPlannerPage() {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const sampleMeals = {
    'Monday': { breakfast: 'Oatmeal', lunch: 'Chicken Salad', dinner: 'Pasta' },
    'Tuesday': { breakfast: 'Toast', lunch: 'Soup', dinner: 'Stir Fry' },
    'Wednesday': { breakfast: 'Yogurt', lunch: 'Sandwich', dinner: 'Tacos' },
    'Thursday': { breakfast: 'Smoothie', lunch: 'Salad', dinner: 'Pizza' },
    'Friday': { breakfast: 'Eggs', lunch: 'Wrap', dinner: 'Fish' },
    'Saturday': { breakfast: 'Pancakes', lunch: 'BBQ', dinner: 'Steak' },
    'Sunday': { breakfast: 'Brunch', lunch: 'Leftovers', dinner: 'Roast' },
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meal Planner</h1>
            <p className="text-gray-600 mt-1">Plan your meals for the week</p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Previous Week
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Plan Meal</span>
            </button>
          </div>
        </div>

        {/* Week Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">This Week</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Dec 9 - Dec 15, 2024</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weekDays.map((day) => {
              const meals = sampleMeals[day as keyof typeof sampleMeals];
              return (
                <div key={day} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-center">{day}</h3>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <div className="font-medium text-gray-700">Breakfast</div>
                      <div className="text-gray-600">{meals.breakfast}</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-700">Lunch</div>
                      <div className="text-gray-600">{meals.lunch}</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-700">Dinner</div>
                      <div className="text-gray-600">{meals.dinner}</div>
                    </div>
                  </div>
                  <button className="w-full mt-3 text-xs text-green-600 hover:text-green-700 font-medium">
                    Edit Day
                  </button>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Planned Meals</p>
                <p className="text-2xl font-bold text-gray-900">21</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Prep Time</p>
                <p className="text-2xl font-bold text-gray-900">25 min</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Servings</p>
                <p className="text-2xl font-bold text-gray-900">84</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Meal Planning Tips */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Meal Planning Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Check your inventory first</h3>
                  <p className="text-sm text-gray-600">Plan meals around ingredients you already have</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Prep ingredients in advance</h3>
                  <p className="text-sm text-gray-600">Wash and chop vegetables on Sunday for the week</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Plan for leftovers</h3>
                  <p className="text-sm text-gray-600">Cook extra portions for easy lunches</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Balance your meals</h3>
                  <p className="text-sm text-gray-600">Include proteins, vegetables, and grains</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
