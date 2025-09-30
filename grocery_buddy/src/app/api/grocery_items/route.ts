import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const { searchParams } = new URL(request.url)
    const storeId = searchParams.get('store_id')

    // Base query to get items, joining with stores to filter by the current user
    let query = supabase
        .from('grocery_items')
        .select(`
            id,
            name,
            quantity,
            units,
            is_purchased,
            store_id,
            stores ( user_id )
        `)
        .eq('stores.user_id', user.id)

    // If a store_id is provided in the URL, filter by it
    if (storeId) {
        query = query.eq('store_id', storeId)
    }

    const { data: groceryItems, error } = await query.order('name', { ascending: true });

    if (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    return NextResponse.json(groceryItems)
}

export async function POST(request: NextRequest) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const { name, quantity, units, store_id } = await request.json()

    // Validate required fields
    if (!name || quantity === undefined || !units) {
        return new NextResponse(JSON.stringify({ error: 'Missing required fields: name, quantity, units' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }
    
    // If a store_id is provided, verify the user owns the store before inserting
    if (store_id) {
        const { data: store, error: storeError } = await supabase
            .from('stores')
            .select('id')
            .eq('id', store_id)
            .eq('user_id', user.id)
            .single();

        if (storeError || !store) {
            return new NextResponse(JSON.stringify({ error: 'Invalid store_id or permission denied' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
        }
    }

    const { data, error } = await supabase
        .from('grocery_items')
        .insert([{ name, quantity, units, store_id, is_purchased: false }])
        .select()
        .single()

    if (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    return NextResponse.json(data, { status: 201 })
}