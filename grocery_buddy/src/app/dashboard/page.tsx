"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Calendar from "@/components/Calendar";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
    <>
      <Navbar />
      <main className="bg-gray-900 min-h-screen pt-16 md:ml-56">
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
      </main>
    </>
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
