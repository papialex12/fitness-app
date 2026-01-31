'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { ActionResponse } from '@/types/actions'
import { revalidatePath } from 'next/cache'

// ==================== SCHEMAS ====================

const startWorkoutSchema = z.object({
    templateId: z.string().uuid().optional(),
    name: z.string().optional(), // If ad-hoc workout
})

const logSetSchema = z.object({
    workoutId: z.string().uuid(),
    exerciseId: z.string().uuid(),
    setNumber: z.number().int().min(1),
    reps: z.number().int().min(0),
    weightKg: z.number().min(0),
    rir: z.number().min(0).max(10).optional(),
    rpe: z.number().min(0).max(10).optional(),
    notes: z.string().optional(),
})

const finishWorkoutSchema = z.object({
    workoutId: z.string().uuid(),
    notes: z.string().optional(),
    overallRpe: z.number().min(1).max(10).optional(),
})

// ==================== HELPERS ====================

async function getUser() {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) throw new Error('Unauthorized')
    return user
}

// ==================== ACTIONS ====================

/**
 * Start a new workout session
 */
export async function startWorkout(
    data: z.infer<typeof startWorkoutSchema>
): Promise<ActionResponse<{ workoutId: string }>> {
    try {
        const user = await getUser()
        const validData = startWorkoutSchema.parse(data)

        // Note: We don't link via ProfileId anymore, just UserId as per Schema
        const workout = await prisma.workoutLog.create({
            data: {
                userId: user.id,
                sessionTemplateId: validData.templateId,
                date: new Date(),
                startTime: new Date(),
                // EndTime is null, signifying active workout
            }
        })

        revalidatePath('/dashboard')
        revalidatePath('/workout')

        return {
            success: true,
            message: 'Workout started',
            data: { workoutId: workout.id }
        }

    } catch (error) {
        console.error('Error starting workout:', error)
        return { success: false, message: 'Failed to start workout' }
    }
}

/**
 * Log a single set
 */
export async function logSet(
    data: z.infer<typeof logSetSchema>
): Promise<ActionResponse> {
    try {
        const user = await getUser()
        const validData = logSetSchema.parse(data)

        // Verify ownership of workout
        const workout = await prisma.workoutLog.findUnique({
            where: { id: validData.workoutId },
            select: { userId: true }
        })

        if (!workout || workout.userId !== user.id) {
            return { success: false, message: 'Workout not found or unauthorized' }
        }

        await prisma.setLog.create({
            data: {
                workoutLogId: validData.workoutId,
                exerciseId: validData.exerciseId,
                setNumber: validData.setNumber,
                reps: validData.reps,
                weightKg: validData.weightKg,
                rir: validData.rir,
                rpe: validData.rpe,
                notes: validData.notes
            }
        })

        revalidatePath(`/workout/${validData.workoutId}`)

        return { success: true, message: 'Set logged' }

    } catch (error) {
        console.error('Error logging set:', error)
        return { success: false, message: 'Failed to log set' }
    }
}

/**
 * Finish a workout
 */
export async function finishWorkout(
    data: z.infer<typeof finishWorkoutSchema>
): Promise<ActionResponse> {
    try {
        const user = await getUser()
        const validData = finishWorkoutSchema.parse(data)

        // Verify ownership
        const workout = await prisma.workoutLog.findUnique({
            where: { id: validData.workoutId },
            select: { userId: true, startTime: true }
        })

        if (!workout || workout.userId !== user.id) {
            return { success: false, message: 'Unauthorized' }
        }

        const endTime = new Date()
        let durationMin = 0
        if (workout.startTime) {
            const diffMs = endTime.getTime() - workout.startTime.getTime()
            durationMin = Math.round(diffMs / 60000)
        }

        await prisma.workoutLog.update({
            where: { id: validData.workoutId },
            data: {
                endTime: endTime,
                actualDurationMin: durationMin > 0 ? durationMin : null,
                notes: validData.notes,
                perceivedExertion: validData.overallRpe
            }
        })

        revalidatePath('/dashboard')
        revalidatePath('/history')

        return { success: true, message: 'Workout finished successfully' }

    } catch (error) {
        console.error('Error finishing workout:', error)
        return { success: false, message: 'Failed to finish workout' }
    }
}
