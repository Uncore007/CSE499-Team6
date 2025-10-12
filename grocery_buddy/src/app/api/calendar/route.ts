import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { fetchCalendar, assignRecipeToDay, removeRecipeFromDay } from "@/utils/lib-server";

export async function GET(_request: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

            const calendar = await fetchCalendar(user.id);
        return NextResponse.json(calendar, { status: 200 });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { recipe_id, day_of_week } = body;

        if (!recipe_id || !day_of_week) {
        return NextResponse.json(
            { error: "Missing recipe_id or day_of_week" },
            { status: 400 }
        );
        }

        const data = await assignRecipeToDay(user.id, recipe_id, day_of_week);
    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { day } = body;

    if (!day) {
      return NextResponse.json({ error: "Missing day" }, { status: 400 });
    }

    await removeRecipeFromDay(user.id, day);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}