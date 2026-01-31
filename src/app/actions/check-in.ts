'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Validar esquema de entrada con Zod (pendiente de instalar zod si no está, usaré tipos simples por ahora)
export type CheckInFormData = {
    weekNumber: number
    weightKg?: number
    waistCm?: number
    sleepQuality: number
    energyLevel: number
    trainingDesire: number
    recoveryPerception: number
    stressLevel: number
    hungerLevel: number
    digestionQuality: number
    adherenceNutrition: number
    adherenceTraining: number
    wins?: string
    challenges?: string
    notes?: string
}

export async function submitCheckIn(data: CheckInFormData) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    let userId = user?.id

    // FALLBACK FOR DEMO/DEVELOPMENT: Use Seeded Demo User if no auth session
    if (!userId) {
        // Hardcoded ID from seed.ts
        const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001'
        console.warn('⚠️ No authenticated user found. Using DEMO USER ID:', DEMO_USER_ID)

        // Verify demo user exists
        const demoUser = await prisma.user.findUnique({ where: { id: DEMO_USER_ID } })
        if (demoUser) {
            userId = DEMO_USER_ID
        } else {
            return { error: 'Unauthorized and Demo User not found' }
        }
    }

    try {
        // 1. Get Profile ID
        const profile = await prisma.profile.findUnique({
            where: { userId: userId },
            select: { id: true },
        })

        if (!profile) {
            return { error: 'Profile not found' }
        }

        // 2. Create Check-in
        // Calcular weight7dAvg si tenemos métricas diarias (futuro: integrar MetricDaily)
        // Por ahora usamos el peso reportado como proxy si no hay avg

        const checkIn = await prisma.checkInWeekly.create({
            data: {

                userId: userId,
                weekNumber: data.weekNumber,
                weightKg: data.weightKg,
                waistCm: data.waistCm,
                sleepQuality: data.sleepQuality,
                // Mapped fields
                motivationScore: data.trainingDesire,
                fatigueScore: 10 - data.energyLevel, // Inverse proxy
                recoveryFeeling: data.recoveryPerception,
                stressScore: data.stressLevel,
                hungerLevel: data.hungerLevel,
                digestiveHealth: data.digestionQuality,
                nutritionAdherence: data.adherenceNutrition,
                trainingAdherence: data.adherenceTraining,
                wins: data.wins,
                challenges: data.challenges,
                coachNotes: data.notes,
                // Defaults
                sleepHoursAvg: 0,
                readinessScore: 0,
            },

        })

        revalidatePath('/dashboard')
        return { success: true, checkInId: checkIn.id }
    } catch (error) {
        console.error('Error submitting check-in:', error)
        return { error: 'Failed to submit check-in' }
    }
}
