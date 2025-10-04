"use client";

import Image from "next/image";
import Link from "next/link";

export default function Recipes() {
  // Dummy recipe data (with full fields)
  const recipes = [
    {
      id: 1,
      title: "Spaghetti Bolognese",
      description: "Classic Italian pasta with a rich tomato and meat sauce.",
      sourceUrl: "https://example.com/spaghetti-bolognese",
      imageUrl: "/placeholder.png",
      instructions:
        "1. Cook pasta. 2. Prepare sauce with ground beef, onion, garlic, and tomato. 3. Combine pasta with sauce and serve hot.",
      servings: 4,
      preparationMinutes: 15,
      cookingMinutes: 30,
    },
    {
      id: 2,
      title: "Chicken Stir Fry",
      description: "Quick and healthy stir fry with chicken and vegetables.",
      sourceUrl: "https://example.com/chicken-stir-fry",
      imageUrl: "/placeholder.png",
      instructions:
        "1. Slice chicken and vegetables. 2. Stir-fry chicken until golden. 3. Add vegetables and sauce, cook until tender-crisp.",
      servings: 3,
      preparationMinutes: 10,
      cookingMinutes: 15,
    },
    {
      id: 3,
      title: "Vegetable Curry",
      description: "A hearty curry packed with seasonal vegetables.",
      sourceUrl: "https://example.com/vegetable-curry",
      imageUrl: "/placeholder.png",
      instructions:
        "1. Chop vegetables. 2. Sauté onion, garlic, and spices. 3. Add coconut milk and vegetables. 4. Simmer until tender.",
      servings: 4,
      preparationMinutes: 20,
      cookingMinutes: 25,
    },
    {
      id: 4,
      title: "Pancakes",
      description: "Fluffy pancakes served with syrup and fresh fruit.",
      sourceUrl: "https://example.com/pancakes",
      imageUrl: "/placeholder.png",
      instructions:
        "1. Mix flour, eggs, milk, and sugar. 2. Heat pan and pour batter. 3. Cook until golden on both sides. 4. Serve with toppings.",
      servings: 2,
      preparationMinutes: 10,
      cookingMinutes: 10,
    },
  ];

  return (
    <div className="font-sans flex flex-col h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-gray-800 text-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <Link
          href="/recipes/create"
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white text-sm transition"
        >
          + Create Recipe
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Search Bar */}
        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-gray-100 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-40 w-full">
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{recipe.title}</h2>
                <p className="text-gray-600 text-sm mb-3">
                  {recipe.description}
                </p>

                {/* Extra details */}
                <div className="text-sm text-gray-500 mb-3">
                  <p>
                    <strong>Servings:</strong> {recipe.servings}
                  </p>
                  <p>
                    <strong>Prep Time:</strong> {recipe.preparationMinutes} mins
                  </p>
                  <p>
                    <strong>Cook Time:</strong> {recipe.cookingMinutes} mins
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={recipe.sourceUrl}
                    target="_blank"
                    className="px-3 py-1 text-sm border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition"
                  >
                    View
                  </Link>
                  <button className="px-3 py-1 text-sm border border-orange-500 bg-orange-400 text-white rounded-full hover:bg-orange-700 transition">
                    Add to Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
