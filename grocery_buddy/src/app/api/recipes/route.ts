import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { fetchRecipes, createRecipe } from "@/utils/lib-server";

export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const recipes = await fetchRecipes(user.id);
        return NextResponse.json(recipes, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }   
}

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

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
        
        if (!title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const data = await createRecipe({
            title,
            description,
            source_url,
            image_url,
            instructions,
            prep_time: prep_time ? Number(prep_time) : null,
            cook_time: cook_time ? Number(cook_time) : null,
            servings: servings ? Number(servings) : null,
            user_id: user.id
        });

        return NextResponse.json(data, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}