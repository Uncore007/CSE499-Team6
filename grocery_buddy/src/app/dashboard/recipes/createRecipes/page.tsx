"use client";

import { useState } from "react";

export default function CreateRecipe() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    sourceUrl: "",
    imageUrl: "",
    instructions: "",
    servings: "",
    prepMinutes: "",
    cookMinutes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recipe Submitted:", form);
    // Later you can send this to your backend API
  };

  return (
    <div className="font-sans flex flex-col h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-gray-800 text-white shadow-md px-6 py-4">
        <h1 className="text-2xl font-bold">Create Recipe</h1>
      </header>

      {/* Form */}
      <main className="flex-1 p-6 overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-gray-100 shadow-md rounded-lg p-6 space-y-4"
        >
          {/* Title */}
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
              rows={3}
              required
            />
          </div>

          {/* Source URL */}
          <div>
            <label className="block font-semibold mb-1">Source URL</label>
            <input
              type="url"
              name="sourceUrl"
              value={form.sourceUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-semibold mb-1">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block font-semibold mb-1">Instructions</label>
            <textarea
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
              rows={5}
              required
            />
          </div>

          {/* Servings */}
          <div>
            <label className="block font-semibold mb-1">Servings</label>
            <input
              type="number"
              name="servings"
              value={form.servings}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Preparation Minutes */}
          <div>
            <label className="block font-semibold mb-1">
              Preparation Minutes
            </label>
            <input
              type="number"
              name="prepMinutes"
              value={form.prepMinutes}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Cooking Minutes */}
          <div>
            <label className="block font-semibold mb-1">Cooking Minutes</label>
            <input
              type="number"
              name="cookMinutes"
              value={form.cookMinutes}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Save Recipe
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
