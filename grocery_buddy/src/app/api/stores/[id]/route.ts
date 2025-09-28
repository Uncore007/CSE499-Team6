import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
  }

  const { data: store, error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (error) {
    return new NextResponse(JSON.stringify({ error: 'Store not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
  }

  return NextResponse.json(store)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
  }

  const { name } = await request.json()

  if (!name) {
    return new NextResponse(JSON.stringify({ error: 'Name is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }

  const { data, error } = await supabase
    .from('stores')
    .update({ name })
    .eq('id', params.id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    return new NextResponse(JSON.stringify({ error: 'Store not found or update failed' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
  }

  return NextResponse.json(data)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
  }

  const { error } = await supabase
    .from('stores')
    .delete()
    .eq('id', params.id)
    .eq('user_id', user.id)

  if (error) {
    return new NextResponse(JSON.stringify({ error: 'Store not found or delete failed' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
  }

  return new NextResponse(null, { status: 204 })
}