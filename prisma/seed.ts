import { PrismaClient, ExerciseCategory } from '@prisma/client'
import * as dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const prisma = new PrismaClient()

const exercises = [
    // PECHO
    {
        name: 'Press de Banca plano con barra',
        category: ExerciseCategory.COMPOUND,
        muscleGroups: ['Chest', 'Triceps', 'Front Delts'],
        defaultRestSec: 180,
        defaultRirMin: 1,
        defaultRirMax: 3,
    },
    {
        name: 'Press Inclinado con mancuernas',
        category: ExerciseCategory.COMPOUND,
        muscleGroups: ['Upper Chest', 'Front Delts', 'Triceps'],
        defaultRestSec: 120,
        defaultRirMin: 1,
        defaultRirMax: 2,
    },
    {
        name: 'Cruce de poleas desde abajo',
        category: ExerciseCategory.ISOLATION,
        muscleGroups: ['Chest'],
        defaultRestSec: 60,
        defaultRirMin: 0,
        defaultRirMax: 1,
    },
    // ESPALDA
    {
        name: 'Dominadas lastradas',
        category: ExerciseCategory.COMPOUND,
        muscleGroups: ['Lats', 'Biceps', 'Upper Back'],
        defaultRestSec: 180,
        defaultRirMin: 1,
        defaultRirMax: 2,
    },
    {
        name: 'Remo con barra (Bent over row)',
        category: ExerciseCategory.COMPOUND,
        muscleGroups: ['Upper Back', 'Lats', 'Rear Delts', 'Erectors'],
        defaultRestSec: 120,
        defaultRirMin: 1,
        defaultRirMax: 3,
    },
    {
        name: 'Jalón al pecho agarre neutro',
        category: ExerciseCategory.ISOLATION,
        muscleGroups: ['Lats', 'Biceps'],
        defaultRestSec: 90,
        defaultRirMin: 1,
        defaultRirMax: 2,
    },
    // PIERNA
    {
        name: 'Sentadilla con barra (Back Squat)',
        category: ExerciseCategory.COMPOUND,
        muscleGroups: ['Quads', 'Glutes', 'Adductors', 'Erectors'],
        defaultRestSec: 240,
        defaultRirMin: 1,
        defaultRirMax: 3,
    },
    {
        name: 'Peso Muerto Rumano con barra',
        category: ExerciseCategory.COMPOUND,
        muscleGroups: ['Hamstrings', 'Glutes', 'Erectors'],
        defaultRestSec: 180,
        defaultRirMin: 2,
        defaultRirMax: 4,
    },
    {
        name: 'Prensa de piernas 45°',
        category: ExerciseCategory.MACHINE,
        muscleGroups: ['Quads', 'Glutes'],
        defaultRestSec: 120,
        defaultRirMin: 1,
        defaultRirMax: 2,
    },
    {
        name: 'Leg Extension (Extensiones de cuadríceps)',
        category: ExerciseCategory.ISOLATION,
        muscleGroups: ['Quads'],
        defaultRestSec: 90,
        defaultRirMin: 0,
        defaultRirMax: 1,
    },
    // HOMBRO
    {
        name: 'Press Militar de pie con barra',
        category: ExerciseCategory.COMPOUND,
        muscleGroups: ['Shoulders', 'Triceps', 'Core'],
        defaultRestSec: 180,
        defaultRirMin: 1,
        defaultRirMax: 3,
    },
    {
        name: 'Elevaciones laterales con mancuernas',
        category: ExerciseCategory.ISOLATION,
        muscleGroups: ['Side Delts'],
        defaultRestSec: 60,
        defaultRirMin: 0,
        defaultRirMax: 1,
    },
    // BRAZOS
    {
        name: 'Curl de bíceps con barra Z',
        category: ExerciseCategory.ISOLATION,
        muscleGroups: ['Biceps'],
        defaultRestSec: 90,
        defaultRirMin: 1,
        defaultRirMax: 2,
    },
    {
        name: 'Extensiones de tríceps en polea alta (cuerda)',
        category: ExerciseCategory.ISOLATION,
        muscleGroups: ['Triceps'],
        defaultRestSec: 90,
        defaultRirMin: 0,
        defaultRirMax: 1,
    },
]

async function safeSeed() {
    console.log('🚀 [SEED] Start seeding basic exercises...')

    if (!process.env.DATABASE_URL) {
        console.error('❌ DATABASE_URL not found in environment. Make sure .env is loaded.')
        process.exit(1)
    }

    for (const ex of exercises) {
        try {
            const existing = await prisma.exercise.findFirst({
                where: { name: ex.name, isCustom: false }
            })

            if (!existing) {
                const created = await prisma.exercise.create({
                    data: {
                        ...ex,
                        isCustom: false,
                    }
                })
                console.log(`✅ [SEED] Created: ${created.name}`)
            } else {
                console.log(`⏭️ [SEED] Skipped: ${ex.name}`)
            }
        } catch (err) {
            console.error(`❌ [SEED] Error seeding ${ex.name}:`, err.message)
        }
    }
    // Seed Demo User
    const demoUserId = '00000000-0000-0000-0000-000000000001'
    const demoProfileId = '00000000-0000-0000-0000-000000000002'

    try {
        const demoUser = await prisma.user.upsert({
            where: { id: demoUserId },
            update: {},
            create: {
                id: demoUserId,
                email: 'demo@elitefitness.com',
            },
        })
        console.log(`✅ [SEED] Ensured Demo User: ${demoUser.email}`)

        const demoProfile = await prisma.profile.upsert({
            where: { userId: demoUserId },
            update: {},
            create: {
                id: demoProfileId,
                userId: demoUserId,
                displayName: 'Demo Athlete',
                experienceLevel: 'ADVANCED',
                goalType: 'RECOMPOSITION',
                heightCm: 180,
                targetWeightKg: 85,
            },
        })
        console.log(`✅ [SEED] Ensured Demo Profile: ${demoProfile.displayName}`)

    } catch (error) {
        console.error('❌ [SEED] Error ensuring demo user:', error)
    }

    console.log('✨ [SEED] Seeding finished successfully.')
}

safeSeed()
    .catch((e) => {
        console.error('❌ [SEED] Fatal error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
