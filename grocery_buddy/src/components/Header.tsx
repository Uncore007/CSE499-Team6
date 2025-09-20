import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-lg">G</span>
            </div>
            <h1 className="text-2xl font-bold">Grocery Buddy</h1>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-green-200 transition-colors">
              Dashboard
            </Link>
            <Link href="/recipes" className="hover:text-green-200 transition-colors">
              Recipes
            </Link>
            <Link href="/meal-planner" className="hover:text-green-200 transition-colors">
              Meal Planner
            </Link>
            <Link href="/inventory" className="hover:text-green-200 transition-colors">
              Inventory
            </Link>
            <Link href="/grocery-lists" className="hover:text-green-200 transition-colors">
              Grocery Lists
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-green-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
