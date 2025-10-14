"use client";

import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-gray-900 text-white rounded"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu />
      </button>

      <aside
        className="hidden md:flex fixed top-0 left-0 h-full w-56 bg-gray-800 text-gray-100 p-4 z-20 flex-col"
        aria-label="Primary navigation"
      >
        <nav className="mt-12 w-full flex-1" aria-label="Main">
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-700">Home</Link>
            </li>
            <li>
              <Link href="/recipes" className="block px-3 py-2 rounded hover:bg-gray-700">Recipes</Link>
            </li>
            <li>
              <Link href="/inventory" className="block px-3 py-2 rounded hover:bg-gray-700">Inventory</Link>
            </li>
            <li>
              <Link href="/grocery_items" className="block px-3 py-2 rounded hover:bg-gray-700">Grocery List</Link>
            </li>
            <li>
              <Link href="/stores" className="block px-3 py-2 rounded hover:bg-gray-700">Stores</Link>
            </li>
          </ul>
        </nav>
        
        {/* Logout Button at Bottom */}
        <button
          onClick={handleLogout}
          className="mt-auto w-full px-3 py-2 rounded flex items-center gap-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-gray-800 text-white p-4 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xl font-bold">Grocery Buddy</div>
              <button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
            </div>
            <nav className="flex-1">
              <ul className="flex flex-col gap-3">
                <li>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-700">Home</Link>
                </li>
                <li>
                  <Link href="/recipes" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-700">Recipes</Link>
                </li>
                <li>
                  <Link href="/inventory" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-700">Inventory</Link>
                </li>
                <li>
                  <Link href="/grocery_items" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-700">Grocery List</Link>
                </li>
                <li>
                  <Link href="/stores" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-700">Stores</Link>
                </li>
              </ul>
            </nav>
            
            {/* Mobile Logout Button at Bottom */}
            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="mt-auto w-full px-3 py-2 rounded flex items-center gap-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </aside>
        </div>
      )}
    </>
  );
}


