"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddGroceryItemPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "",
    is_purchased: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you'd send this to your backend or local storage
    console.log("New Item Added:", formData);

    // Redirect back to grocery list after adding
    router.push("/dashboard");
  };

  return (
    <div className="font-sans flex flex-col h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-gray-800 text-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add Grocery Item</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 flex justify-center items-start">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Apples"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g. 3"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
              />
            </div>

            {/* Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
              >
                <option value="">Select a unit</option>
                <option value="pcs">Pieces</option>
                <option value="kg">Kilograms</option>
                <option value="liters">Liters</option>
                <option value="bags">Bags</option>
              </select>
            </div>

            {/* Purchased */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_purchased"
                checked={formData.is_purchased}
                onChange={handleChange}
                className="w-5 h-5 rounded-full accent-orange-500 focus:ring-2 focus:ring-orange-400"
              />
              <label className="ml-2 text-sm text-gray-700">Purchased</label>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center pt-4">
              <Link
                href="/dashboard"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                ← Back to List
              </Link>

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
              >
                Save Item
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
