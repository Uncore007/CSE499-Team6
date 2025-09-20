import Layout from '@/components/Layout';
import Card from '@/components/Card';
import { 
  BookOpen, 
  Calendar, 
  Package, 
  ShoppingCart,
  Plus,
  TrendingUp,
  Clock
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Recipes', value: '12', icon: BookOpen, color: 'text-blue-600' },
    { title: 'Planned Meals', value: '8', icon: Calendar, color: 'text-green-600' },
    { title: 'Inventory Items', value: '45', icon: Package, color: 'text-orange-600' },
    { title: 'Active Lists', value: '3', icon: ShoppingCart, color: 'text-purple-600' },
  ];

  const quickActions = [
    { title: 'Add New Recipe', icon: Plus, href: '/recipes', color: 'bg-blue-500' },
    { title: 'Plan Meal', icon: Calendar, href: '/meal-planner', color: 'bg-green-500' },
    { title: 'Update Inventory', icon: Package, href: '/inventory', color: 'bg-orange-500' },
    { title: 'Create Grocery List', icon: ShoppingCart, href: '/grocery-lists', color: 'bg-purple-500' },
  ];

  const recentActivity = [
    { action: 'Added recipe: Chicken Alfredo', time: '2 hours ago', icon: BookOpen },
    { action: 'Updated inventory: Milk', time: '4 hours ago', icon: Package },
    { action: 'Planned meal: Pasta Night', time: '1 day ago', icon: Calendar },
    { action: 'Created grocery list: Weekend Shopping', time: '2 days ago', icon: ShoppingCart },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening with your groceries.</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last updated: 2 minutes ago</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.title}
                    href={action.href}
                    className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 text-center">{action.title}</span>
                  </a>
                );
              })}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Coming Soon Features */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Smart Recommendations</h3>
              <p className="text-sm text-gray-600">AI-powered recipe suggestions based on your inventory</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Expiry Tracking</h3>
              <p className="text-sm text-gray-600">Get notified before your ingredients expire</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <ShoppingCart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Store Integration</h3>
              <p className="text-sm text-gray-600">Connect with local stores for price comparison</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}