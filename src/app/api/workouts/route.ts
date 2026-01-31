import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

// GET: Check for active workout
export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const activeWorkout = await prisma.workoutLog.findFirst({
            where: {
                userId: user.id,
                endTime: null
            },
            include: {
                sets: {
                    include: {
                        exercise: true
                    },
                    orderBy: {
                        createdAt: 'asc' // or setNumber
                    }
                }
            }
        });

        return NextResponse.json(activeWorkout || { active: false });
    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

// POST: Start new workout
export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if already active
        const existing = await prisma.workoutLog.findFirst({
            where: { userId: user.id, endTime: null }
        });

        if (existing) {
            return NextResponse.json(existing);
        }

        const newWorkout = await prisma.workoutLog.create({
            data: {
                userId: user.id,
                startTime: new Date(),
                date: new Date()
            }
        });

        return NextResponse.json(newWorkout);
    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
