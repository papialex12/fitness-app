'use server'

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { assessmentSchema, AssessmentFormValues } from "@/lib/validations/assessment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAssessment(data: AssessmentFormValues) {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("Unauthorized");
    }

    const validatedFields = assessmentSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields",
            details: validatedFields.error.flatten().fieldErrors,
        };
    }

    const profile = await prisma.profile.findUnique({
        where: { userId: user.id },
    });

    if (!profile) {
        throw new Error("Profile not found");
    }

    try {
        const assessment = await prisma.physicalAssessment.create({
            data: {
                profileId: profile.id,
                ...validatedFields.data,
            },
        });

        revalidatePath("/dashboard/assessment");
        return { success: true, data: assessment };
    } catch (error) {
        console.error("Failed to create assessment:", error);
        return { error: "Failed to create assessment" };
    }
}
