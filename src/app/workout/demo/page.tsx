/**
 * DEMO PAGE - Workout Components
 * 
 * This page showcases the workout UI components for visual testing.
 * Uses mock data to simulate a real workout session.
 * 
 * TODO: Remove this page before production or protect it.
 */

import { WorkoutCard } from '@/components/workout/WorkoutCard'

// Mock data for testing purposes
const mockExercises = [
    {
        id: 'mock-exercise-1',
        name: 'Press de Banca plano con barra',
    },
    {
        id: 'mock-exercise-2',
        name: 'Dominadas lastradas',
    },
]

const mockSets = [
    {
        id: 'mock-set-1',
        setNumber: 1,
        reps: 8,
        weightKg: 100,
        rir: 3,
        rpe: null,
    },
    {
        id: 'mock-set-2',
        setNumber: 2,
        reps: 6,
        weightKg: 110,
        rir: 2,
        rpe: null,
    },
]

export default function WorkoutDemoPage() {
    // This is a fake workout ID for demo - actual logging won't work without auth
    const mockWorkoutId = 'demo-workout-id'

    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-100 p-4 md:p-8">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">🏋️ Workout Demo</h1>
                    <p className="text-neutral-400 text-sm">
                        Visualiza los componentes de entrenamiento.
                        <span className="text-amber-500 ml-1">(No guarda datos reales)</span>
                    </p>
                </div>

                {/* Timer simulation */}
                <div className="bg-neutral-900 rounded-lg p-4 mb-6 flex justify-between items-center border border-neutral-800">
                    <div>
                        <span className="text-xs text-neutral-500">Sesión activa</span>
                        <p className="text-2xl font-mono font-bold text-emerald-400">01:42:30</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-10 w-10 rounded-full bg-emerald-600/20 flex items-center justify-center animate-pulse">
                            <div className="h-3 w-3 rounded-full bg-emerald-500" />
                        </div>
                    </div>
                </div>

                {/* Exercise Cards */}
                <div className="flex flex-col gap-6">
                    {/* Exercise 1: WITH history */}
                    <WorkoutCard
                        workoutId={mockWorkoutId}
                        exercise={mockExercises[0]}
                        sets={mockSets}
                    />

                    {/* Exercise 2: WITHOUT history (fresh start) */}
                    <WorkoutCard
                        workoutId={mockWorkoutId}
                        exercise={mockExercises[1]}
                        sets={[]}
                    />
                </div>

                {/* Footer note */}
                <div className="mt-8 text-center text-xs text-neutral-600">
                    <p>Este es un mock. El logging real requiere autenticación.</p>
                    <p className="text-neutral-500 mt-1">Elite Fitness Tracker © 2026</p>
                </div>
            </div>
        </main>
    )
}
