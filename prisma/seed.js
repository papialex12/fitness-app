const { PrismaClient, ExerciseCategory } = require('@prisma/client')

const prisma = new PrismaClient()

const exercises = [
    // PECHO
    {
        name: 'Press de Banca plano con barra',
        category: 'COMPOUND',
        muscleGroups: ['Chest', 'Triceps', 'Front Delts'],
        defaultRestSec: 180,
        defaultRirMin: 1,
        defaultRirMax: 3,
    },
    {
        name: 'Press Inclinado con mancuernas',
        category: 'COMPOUND',
        muscleGroups: ['Upper Chest', 'Front Delts', 'Triceps'],
        defaultRestSec: 120,
        defaultRirMin: 1,
        defaultRirMax: 2,
    },
    {
        name: 'Cruce de poleas desde abajo',
        category: 'ISOLATION',
        muscleGroups: ['Chest'],
        defaultRestSec: 60,
        defaultRirMin: 0,
        defaultRirMax: 1,
    },
    // ESPALDA
    {
        name: 'Dominadas lastradas',
        category: 'COMPOUND',
        muscleGroups: ['Lats', 'Biceps', 'Upper Back'],
        defaultRestSec: 180,
        defaultRirMin: 1,
        defaultRirMax: 2,
    },
    {
        name: 'Remo con barra (Bent over row)',
        category: 'COMPOUND',
        muscleGroups: ['Upper Back', 'Lats', 'Rear Delts', 'Erectors'],
        defaultRestSec: 120,
        defaultRirMin: 1,
        defaultRirMax: 3,
    },
    {
        name: 'Jalón al pecho agarre neutro',
        category: 'ISOLATION',
        muscleGroups: ['Lats', 'Biceps'],
        defaultRestSec: 90,
        defaultRirMin: 1,
        defaultRirMax: 2,
    },
    // PIERNA
    {
        name: 'Sentadilla con barra (Back Squat)',
        category: 'COMPOUND',
        muscleGroups: ['Quads', 'Glutes', 'Adductors', 'Erectors'],
        defaultRestSec: 240,
        defaultRirMin: 1,
        defaultRirMax: 3,
    },
    {
        name: 'Peso Muerto Rumano con barra',
        category: 'COMPOUND',
        muscleGroups: ['Hamstrings', 'Glutes', 'Erectors'],
        defaultRestSec: 180,
        defaultRirMin: 2,
        defaultRirMax: 4,
    },
    {
        name: 'Prensa de piernas 45°',
        category: 'MACHINE',
        muscleGroups: ['Quads', 'Glutes'],
        defaultRestSec: 120,
        defaultRirMin: 1,
        defaultRirMax: 2,
    },
    {
        name: 'Leg Extension (Extensiones de cuadríceps)',
        category: 'ISOLATION',
        muscleGroups: ['Quads'],
        defaultRestSec: 90,
        defaultRirMin: 0,
        defaultRirMax: 1,
    },
    // HOMBRO
    {
        name: 'Press Militar de pie con barra',
        category: 'COMPOUND',
        muscleGroups: ['Shoulders', 'Triceps', 'Core'],
        defaultRestSec: 180,
        defaultRirMin: 1,
        defaultRirMax: 3,
    },
    {
        name: 'Elevaciones laterales con mancuernas',
        category: 'ISOLATION',
        muscleGroups: ['Side Delts'],
        defaultRestSec: 60,
        defaultRirMin: 0,
        defaultRirMax: 1,
    },
    // BRAZOS
    {
        name: 'Curl de bíceps con barra Z',
        category: 'ISOLATION',
        muscleGroups: ['Biceps'],
        defaultRestSec: 90,
        defaultRirMin: 1,
        defaultRirMax: 2,
    },
    {
        name: 'Extensiones de tríceps en polea alta (cuerda)',
        category: 'ISOLATION',
        muscleGroups: ['Triceps'],
        defaultRestSec: 90,
        defaultRirMin: 0,
        defaultRirMax: 1,
    },
]

async function safeSeed() {
    console.log('🚀 Start seeding exercises...')
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
                console.log(`✅ Created: ${created.name}`)
            } else {
                console.log(`⏭️ Skipped (already exists): ${ex.name}`)
            }
        } catch (err) {
            console.error(`❌ Error seeding ${ex.name}:`, err.message)
        }
    }
    console.log('✨ Seeding finished.')
}

safeSeed()
    .catch((e) => {
        console.error(err)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
