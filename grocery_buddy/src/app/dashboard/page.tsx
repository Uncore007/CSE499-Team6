"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Calendar from "@/components/Calendar";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const recipeIdeas = ["recipe", "ideas", "can", "go", "here"];

  useEffect(() => {
    // Check if user is authenticated
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/user');
      if (!response.ok) {
        router.push('/login');
        return;
      }
      setLoading(false);
    } catch (error) {
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="font-sans flex flex-col h-screen bg-white text-gray-800">
      {/* Header */}

      <header className="bg-gray-800 text-white shadow-md flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">Grocery Buddy</h1>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <Menu size={28} /> : <Menu size={28} />}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed md:static top-0 left-0 h-full w-56 bg-gray-800 text-white p-4 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
        >
          <nav>
            <ul>
              <li className="mb-2">
                <a
                  href="#"
                  className="block p-3 rounded hover:bg-gray-600 font-semibold"
                >
                  Home
                </a>
              </li>
              <li className="mb-2">
                <Link
                  href="/dashboard/recipes"
                  className="block p-3 rounded hover:bg-gray-600"
                >
                  Recipes
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/dashboard/list"
                  className="block p-3 rounded hover:bg-gray-600"
                >
                  List
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/dashbaord/pantry"
                  className="block p-3 rounded hover:bg-gray-600"
                >
                  Pantry
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Navbar />
          <div className="bg-gray-900 min-h-screen pt-16 md:ml-56">
            <div className="max-w-7xl mx-auto px-6 py-8">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">
                  Welcome to Your Dashboard
                </h1>
                <p className="text-gray-400">
                  Manage your recipes, inventory, and grocery lists all in one place.
                </p>
              </div>

              {/* Calendar Section */}
              <div className="mb-8">
                <Calendar />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <QuickActionCard
                  title="Recipes"
                  icon="🍳"
                  href="/recipes"
                  description="Browse and manage your recipes"
                />
                <QuickActionCard
                  title="Inventory"
                  icon="🏠"
                  href="/inventory"
                  description="Track what's in your pantry"
                />
                <QuickActionCard
                  title="Grocery List"
                  icon="🛒"
                  href="/grocery_items"
                  description="Manage your shopping list"
                />
                <QuickActionCard
                  title="Stores"
                  icon="🏪"
                  href="/stores"
                  description="Organize your stores"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function QuickActionCard({ title, icon, href, description }: {
  title: string;
  icon: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition hover:bg-gray-700"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </a>
  );
}
