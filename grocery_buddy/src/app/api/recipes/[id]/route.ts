import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';


// this takes the id selected by the user and uses the id to make changes
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data: recipe, error } = await supabase
            .from('recipes')
            .select('*')
            .eq('id', params.id)
            .eq('user_id', user.id)
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(recipe, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json()
        const {
            title,
            description,
            source_url,
            image_url,
            instructions,
            servings,
            prep_time,
            cook_time
        } = body

        const { data, error } = await supabase
            .from('recipes')
            .update({
                title,
                description,
                source_url,
                image_url,
                instructions,
                servings,
                prep_time,
                cook_time
            })
            .eq('id', params.id)
            .eq('user_id', user.id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data, error } = await supabase
            .from('recipes')
            .delete()
            .eq('id', params.id)
            .eq('user_id', user.id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}