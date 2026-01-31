import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { workoutId, exerciseId, weight, reps, rpe } = body;

        if (!workoutId || !exerciseId) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Calculate next set number for this exercise in this workout
        const existingSetsCount = await prisma.setLog.count({
            where: {
                workoutLogId: workoutId,
                exerciseId: exerciseId
            }
        });

        const newSet = await prisma.setLog.create({
            data: {
                workoutLogId: workoutId,
                exerciseId,
                weightKg: parseFloat(weight),
                reps: parseInt(reps),
                rpe: rpe ? parseFloat(rpe) : null,
                setType: "WORKING",
                setNumber: existingSetsCount + 1
            },
            include: {
                exercise: true
            }
        });

        return NextResponse.json(newSet);
    } catch (error) {
        console.error("Error logging set:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
