import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Get the grocery item to check if it has an associated inventory item
    const { data: groceryItem, error: fetchError } = await supabase
      .from('grocery_items')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (fetchError) {
      throw new Error('Failed to fetch grocery item')
    }

    // Mark grocery item as purchased (archived)
    const { error: updateError } = await supabase
      .from('grocery_items')
      .update({ is_purchased: true })
      .eq('id', id)
      .eq('user_id', user.id)

    if (updateError) {
      throw new Error('Failed to purchase grocery item')
    }

    // If there's an associated inventory item, mark it as in stock
    if (groceryItem.inventory_id) {
      const { error: inventoryError } = await supabase
        .from('inventory')
        .update({ in_stock: true })
        .eq('id', groceryItem.inventory_id)
        .eq('user_id', user.id)

      if (inventoryError) {
        console.error('Failed to update inventory:', inventoryError)
        // Don't throw - we still want to mark the grocery item as purchased
      }
    }

    return NextResponse.json({ 
      message: 'Item purchased successfully',
      inventory_updated: !!groceryItem.inventory_id
    }, { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}