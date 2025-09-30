import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// GET a single grocery item
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
  }

  const { data: item, error } = await supabase
    .from('grocery_items')
    .select('*, stores!inner(user_id)')
    .eq('id', params.id)
    .eq('stores.user_id', user.id)
    .single()

  if (error || !item) {
    return new NextResponse(JSON.stringify({ error: 'Item not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
  }

  return NextResponse.json(item)
}

// UPDATE a grocery item
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
  }

  // First, verify the user owns the item they are trying to update.
  const { data: existingItem, error: fetchError } = await supabase
    .from('grocery_items')
    .select('id, stores!inner(user_id)')
    .eq('id', params.id)
    .eq('stores.user_id', user.id)
    .single()

  if (fetchError || !existingItem) {
    return new NextResponse(JSON.stringify({ error: 'Item not found or permission denied' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
  }

  const itemData = await request.json()

  // Now, perform the update.
  const { data, error } = await supabase
    .from('grocery_items')
    .update(itemData)
    .eq('id', params.id)
    .select()
    .single()

  if (error) {
    return new NextResponse(JSON.stringify({ error: 'Update failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }

  return NextResponse.json(data)
}

// DELETE a grocery item
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
  }

  // Verify ownership before deleting
  const { data: item, error: fetchError } = await supabase
    .from('grocery_items')
    .select('id, stores!inner(user_id)')
    .eq('id', params.id)
    .eq('stores.user_id', user.id)
    .single()

  if (fetchError || !item) {
    return new NextResponse(JSON.stringify({ error: 'Item not found or permission denied' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
  }

  const { error } = await supabase
    .from('grocery_items')
    .delete()
    .eq('id', params.id)

  if (error) {
    return new NextResponse(JSON.stringify({ error: 'Delete failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }

  return new NextResponse(null, { status: 204 })
}