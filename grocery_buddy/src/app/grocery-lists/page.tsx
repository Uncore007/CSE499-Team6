import Layout from '@/components/Layout';
import Card from '@/components/Card';
import { Plus, ShoppingCart, Store, CheckCircle, Circle, Trash2, Edit } from 'lucide-react';

export default function GroceryListsPage() {
  const groceryLists = [
    {
      id: 1,
      name: 'Weekly Shopping',
      store: 'Walmart',
      items: 12,
      completed: 8,
      created: 'Dec 8, 2024',
      status: 'in-progress'
    },
    {
      id: 2,
      name: 'Weekend Essentials',
      store: 'Target',
      items: 6,
      completed: 6,
      created: 'Dec 6, 2024',
      status: 'completed'
    },
    {
      id: 3,
      name: 'Holiday Baking',
      store: 'Whole Foods',
      items: 15,
      completed: 3,
      created: 'Dec 5, 2024',
      status: 'in-progress'
    },
  ];

  const sampleItems = [
    { id: 1, name: 'Milk', quantity: '2 liters', store: 'Walmart', completed: true },
    { id: 2, name: 'Bread', quantity: '1 loaf', store: 'Walmart', completed: true },
    { id: 3, name: 'Eggs', quantity: '12 pieces', store: 'Walmart', completed: false },
    { id: 4, name: 'Chicken Breast', quantity: '2 kg', store: 'Walmart', completed: false },
    { id: 5, name: 'Tomatoes', quantity: '6 pieces', store: 'Walmart', completed: true },
  ];

  const stores = ['Walmart', 'Target', 'Whole Foods', 'Costco', 'Kroger'];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Grocery Lists</h1>
            <p className="text-gray-600 mt-1">Organize your shopping by store</p>
          </div>
          <button className="mt-4 sm:mt-0 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Create List</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Lists</p>
                <p className="text-2xl font-bold text-gray-900">{groceryLists.filter(list => list.status === 'in-progress').length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Lists</p>
                <p className="text-2xl font-bold text-gray-900">{groceryLists.filter(list => list.status === 'completed').length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Stores</p>
                <p className="text-2xl font-bold text-gray-900">{stores.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Grocery Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {groceryLists.map((list) => (
            <Card key={list.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{list.name}</h3>
                  <p className="text-sm text-gray-600">Created on {list.created}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Store className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{list.store}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  list.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {list.status === 'completed' ? 'Completed' : 'In Progress'}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{list.completed}/{list.items} items</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(list.completed / list.items) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  View List
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  Share
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Sample List Items */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Weekly Shopping - Walmart</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">3 of 5 items remaining</span>
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-2/5"></div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {sampleItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <button className="flex-shrink-0">
                  {item.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 hover:text-green-600 transition-colors" />
                  )}
                </button>
                <div className="flex-1">
                  <p className={`font-medium ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-600">{item.quantity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Store className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{item.store}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                Complete Shopping
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Add Item
              </button>
            </div>
          </div>
        </Card>

        {/* Store Buckets */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Store Buckets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stores.map((store) => (
              <div key={store} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Store className="w-5 h-5 text-gray-600" />
                  <h3 className="font-medium text-gray-900">{store}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">0 items</p>
                <button className="w-full text-sm text-green-600 hover:text-green-700 font-medium">
                  Add Items
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
