"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const recipeIdeas = ["recipe", "ideas", "can", "go", "here"];

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
                <a href="#" className="block p-3 rounded hover:bg-gray-600">
                  List
                </a>
              </li>
              <li className="mb-2">
                <Link href="/dashbaord/pantry" className="block p-3 rounded hover:bg-gray-600">
                  Pantry
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipeIdeas.map((idea) => (
              <div
                key={idea}
                className="bg-gray-200 h-48 rounded-lg flex items-center justify-center shadow"
              >
                <span className="text-gray-500">{idea}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
