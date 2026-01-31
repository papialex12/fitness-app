import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_EXERCISES = [
    { name: "Sentadilla (Squat)", category: "COMPOUND", muscleGroups: ["Quadriceps", "Glutes"] },
    { name: "Press de Banca (Bench Press)", category: "COMPOUND", muscleGroups: ["Chest", "Triceps"] },
    { name: "Peso Muerto (Deadlift)", category: "COMPOUND", muscleGroups: ["Hamstrings", "Glutes", "Back"] },
    { name: "Dominadas (Pull-ups)", category: "BODYWEIGHT", muscleGroups: ["Lats", "Biceps"] },
    { name: "Press Militar (Overhead Press)", category: "COMPOUND", muscleGroups: ["Shoulders", "Triceps"] },
    { name: "Remo con Barra (Barbell Row)", category: "COMPOUND", muscleGroups: ["Back", "Biceps"] },
    { name: "Extensiones de Cuádriceps", category: "ISOLATION", muscleGroups: ["Quadriceps"] },
    { name: "Curl de Bíceps", category: "ISOLATION", muscleGroups: ["Biceps"] },
    { name: "Tríceps en Polea", category: "ISOLATION", muscleGroups: ["Triceps"] },
    { name: "Elevaciones Laterales", category: "ISOLATION", muscleGroups: ["Shoulders"] },
];

export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if exercises exist
        const count = await prisma.exercise.count();
        if (count === 0) {
            // Auto-seed for MVP
            await prisma.exercise.createMany({
                data: DEFAULT_EXERCISES.map(e => ({
                    ...e,
                    category: e.category as any
                }))
            });
        }

        const exercises = await prisma.exercise.findMany({
            orderBy: { name: 'asc' }
        });

        return NextResponse.json(exercises);
    } catch (error) {
        console.error("Error fetching exercises:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
