"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Pantry() {
  // Dummy pantry data
  const [pantryItems, setPantryItems] = useState([
    {
      id: 1,
      name: "Rice",
      quantity: 2,
      expirationDate: "2025-12-01",
      imageUrl: "/placeholder.png",
    },
    {
      id: 2,
      name: "Beans",
      quantity: 5,
      expirationDate: "2025-06-15",
      imageUrl: "/placeholder.png",
    },
    {
      id: 3,
      name: "Milk",
      quantity: 1,
      expirationDate: "2025-10-20",
      imageUrl: "/placeholder.png",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id: number) => {
    setPantryItems(pantryItems.filter((item) => item.id !== id));
  };

  const filteredPantry = pantryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isExpiringSoon = (date: string) => {
    const diff = new Date(date).getTime() - new Date().getTime();
    return diff < 7 * 24 * 60 * 60 * 1000; // less than 7 days
  };

  return (
    <div className="font-sans flex flex-col h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-gray-800 text-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pantry</h1>
        <Link
          href="/pantry/addItem"
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white text-sm transition"
        >
          + Add Item
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Search Bar */}
        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search pantry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Pantry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPantry.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg shadow hover:shadow-lg transition overflow-hidden border-2 ${
                item.quantity <= 1
                  ? "border-red-400"
                  : isExpiringSoon(item.expirationDate)
                  ? "border-yellow-400"
                  : "border-green-400"
              }`}
            >
              {/* Image */}
              <div className="relative h-40 w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600 text-sm mb-3">
                  Stock: {item.quantity} item{item.quantity > 1 ? "s" : ""}
                </p>

                {/* Extra details */}
                <div className="text-sm text-gray-500 mb-3">
                  <p>
                    <strong>Expires:</strong>{" "}
                    <span
                      className={
                        isExpiringSoon(item.expirationDate)
                          ? "text-yellow-600"
                          : "text-green-600"
                      }
                    >
                      {item.expirationDate}
                    </span>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition"
                  >
                    Remove
                  </button>
                  <button className="px-3 py-1 text-sm border border-orange-500 bg-orange-400 text-white rounded-full hover:bg-orange-700 transition">
                    Restock
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPantry.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No items found.</p>
        )}
      </main>
    </div>
  );
}
