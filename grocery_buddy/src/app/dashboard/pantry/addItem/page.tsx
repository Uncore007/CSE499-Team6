"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPantryItem() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    expirationDate: "",
    imageUrl: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.quantity || !formData.expirationDate) {
      setError("Please fill in all required fields.");
      return;
    }

    // Save to localStorage (temporary)
    const existing = JSON.parse(localStorage.getItem("pantryItems") || "[]");
    const newItem = {
      id: Date.now(),
      name: formData.name,
      quantity: parseInt(formData.quantity),
      expirationDate: formData.expirationDate,
      imageUrl: formData.imageUrl || "/placeholder.png",
    };
    localStorage.setItem("pantryItems", JSON.stringify([...existing, newItem]));

    // Redirect back to pantry page
    router.push("/pantry");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Header */}
      <header className="bg-gray-800 text-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add Pantry Item</h1>
        <button
          onClick={() => router.push("/pantry")}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white text-sm transition"
        >
          Back to Pantry
        </button>
      </header>

      {/* Form Section */}
      <main className="flex-1 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-gray-100 shadow-md rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">New Item Details</h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-1 font-medium">Item Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Rice"
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Quantity *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g., 3"
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Expiration Date *</label>
            <input
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium">Image URL (optional)</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Add Item
          </button>
        </form>
      </main>
    </div>
  );
}
