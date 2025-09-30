import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    let { data: groceryItems, error } = await supabase
        .from('grocery_items')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    console.log('Grocery Items data:', groceryItems)

    return NextResponse.json(groceryItems)
}

export async function POST(request: NextRequest) {
    const supabase = await createClient()
    // const { name } = await request.json()
    const { name } = { name: 'New Store' } // Temporary hardcoded name for testing
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    if (!name) {
        return new NextResponse(JSON.stringify({ error: 'Name is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const { data, error } = await supabase
        .from('stores')
        .insert({"name": "Test"})
        .select()

    if (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    return NextResponse.json(data, { status: 201 })
}