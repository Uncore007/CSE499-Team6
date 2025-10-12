"use client";

import { useState } from "react";
import Link from "next/link";

export default function GroceryListPage() {
  const [groceries, setGroceries] = useState([
    { id: 1, name: "Tomatoes", quantity: 5, unit: "pcs", is_purchased: false },
    { id: 2, name: "Milk", quantity: 2, unit: "liters", is_purchased: true },
    { id: 3, name: "Rice", quantity: 1, unit: "bag", is_purchased: false },
    { id: 4, name: "Eggs", quantity: 12, unit: "pcs", is_purchased: false },
  ]);

  const togglePurchased = (id: number) => {
    setGroceries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_purchased: !item.is_purchased } : item
      )
    );
  };

  return (
    <div className="font-sans flex flex-col h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-gray-800 text-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Grocery List</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto mb-6 flex justify-end">
          <Link
            href="/dashboard/list/addItem"
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white text-sm transition"
          >
            + Add Item
          </Link>
        </div>
        {groceries.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No items yet 😕</p>
        ) : (
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-4">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-orange-100 text-left text-gray-700">
                  <th className="p-3 border-b">Item</th>
                  <th className="p-3 border-b">Quantity</th>
                  <th className="p-3 border-b">Unit</th>
                  <th className="p-3 border-b text-center">Purchased</th>
                </tr>
              </thead>
              <tbody>
                {groceries.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-b hover:bg-orange-50 ${
                      item.is_purchased ? "opacity-60 line-through" : ""
                    }`}
                  >
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">{item.unit}</td>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={item.is_purchased}
                        onChange={() => togglePurchased(item.id)}
                        className="w-5 h-5 rounded-full accent-orange-500 cursor-pointer focus:ring-2 focus:ring-orange-400 transition-all"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
