import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { fetchRecipeById, updateRecipe, deleteRecipe } from "@/utils/lib-server";

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
        const recipe = await fetchRecipeById(id, user.id);
        return NextResponse.json(recipe, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PUT(
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
        const body = await request.json();
        const {
            title,
            description,
            source_url,
            image_url,
            instructions,
            prep_time,
            cook_time,
            servings
        } = body;

        const updates: any = {};
        if (title !== undefined) updates.title = title;
        if (description !== undefined) updates.description = description;
        if (source_url !== undefined) updates.source_url = source_url;
        if (image_url !== undefined) updates.image_url = image_url;
        if (instructions !== undefined) updates.instructions = instructions;
        if (prep_time !== undefined) updates.prep_time = Number(prep_time);
        if (cook_time !== undefined) updates.cook_time = Number(cook_time);
        if (servings !== undefined) updates.servings = Number(servings);

        const data = await updateRecipe(id, user.id, updates);
        return NextResponse.json(data, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(
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
        await deleteRecipe(id, user.id);
        return NextResponse.json({ message: 'Recipe deleted successfully' }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}