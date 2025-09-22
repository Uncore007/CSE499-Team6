import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

import { logout } from "../login/actions";

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div>
      <p>Hello {data.user.email}</p>

      <form action={logout}>
        <button className="w-full p-3 rounded bg-gray-600 hover:bg-red-700 text-left font-semibold">
          Sign Out
        </button>
      </form>
    </div>
  )
}