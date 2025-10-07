import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { fetchRecipeInventory, addInventoryToRecipe } from "@/utils/lib-server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const inventory = await fetchRecipeInventory(id, user.id);
        return NextResponse.json(inventory, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const { inventory_id, qty, unit } = await request.json();

        if (!inventory_id) {
            return NextResponse.json({ error: 'Inventory ID is required' }, { status: 400 });
        }

        const data = await addInventoryToRecipe(id, user.id, inventory_id, qty, unit);
        return NextResponse.json(data, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}