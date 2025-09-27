import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { logout } from '../login/actions'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className="font-sans flex flex-col h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-gray-800 text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Grocery Buddy</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {data.user.email}</span>
            <form action={logout}>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition">
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 bg-gray-700 text-white p-4">
          <nav>
            <ul>
              <li className="mb-2">
                <Link
                  href="/dashboard"
                  className="block p-3 rounded hover:bg-gray-600 font-semibold"
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="block p-3 rounded hover:bg-gray-600">
                  Recipes
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/stores" className="block p-3 rounded hover:bg-gray-600">
                  Stores
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/grocery-items" className="block p-3 rounded hover:bg-gray-600">
                  Grocery Items
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="block p-3 rounded hover:bg-gray-600">
                  Pantry
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
