'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  Package, 
  ShoppingCart,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Recipes', href: '/recipes', icon: BookOpen },
  { name: 'Meal Planner', href: '/meal-planner', icon: Calendar },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Grocery Lists', href: '/grocery-lists', icon: ShoppingCart },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 md:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-4 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-green-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User section */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">U</span>
              </div>
              <div>
                <p className="text-sm font-medium">Usuario</p>
                <p className="text-xs text-gray-400">usuario@email.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button 
        className="fixed top-4 left-4 z-30 p-2 bg-gray-800 text-white rounded-lg shadow-lg md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
}
