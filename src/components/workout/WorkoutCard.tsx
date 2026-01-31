'use client'

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge' // Need to check if badge exists or use simple div
import { SetLogger } from './SetLogger'
import { useRouter } from 'next/navigation'

type Set = {
    id: string
    setNumber: number
    reps: number | null
    weightKg: number | null
    rir: number | null
    rpe: number | null
}

type Exercise = {
    id: string
    name: string
    // instructions?
}

type WorkoutCardProps = {
    workoutId: string
    exercise: Exercise
    sets: Set[]
}

export function WorkoutCard({ workoutId, exercise, sets }: WorkoutCardProps) {
    const router = useRouter()
    const nextSetNumber = sets.length > 0
        ? Math.max(...sets.map(s => s.setNumber)) + 1
        : 1

    // Get defaults from previous set if available
    const lastSet = sets.length > 0 ? sets[sets.length - 1] : null
    const defaultWeight = lastSet?.weightKg ?? 0
    const defaultReps = lastSet?.reps ?? 0

    return (
        <Card className="mb-4 bg-neutral-900 border-neutral-800 text-neutral-100">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold text-white">
                        {exercise.name}
                    </CardTitle>
                    {/* <Badge variant="outline" className="text-emerald-500 border-emerald-900 bg-emerald-950/30">
            Target: 3 RIR
          </Badge> */}
                    {/* Badge might not exist yet, keeping simple */}
                </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                {/* HISTORY / PREVIOUS SETS */}
                {sets.length > 0 && (
                    <div className="flex flex-col gap-1">
                        <div className="grid grid-cols-4 text-xs font-mono text-neutral-500 mb-1 px-1">
                            <span className="text-center">SET</span>
                            <span className="text-center">KG</span>
                            <span className="text-center">REPS</span>
                            <span className="text-center">RIR</span>
                        </div>

                        {sets.map((set) => (
                            <div
                                key={set.id}
                                className="grid grid-cols-4 text-sm py-2 bg-neutral-950/50 rounded-md border border-neutral-800/50 items-center"
                            >
                                <span className="text-center font-bold text-neutral-400">{set.setNumber}</span>
                                <span className="text-center">{set.weightKg}</span>
                                <span className="text-center">{set.reps}</span>
                                <span className="text-center text-neutral-400">{set.rir ?? '-'}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* INPUT FOR NEXT SET */}
                <div className="mt-2">
                    <SetLogger
                        workoutId={workoutId}
                        exerciseId={exercise.id}
                        nextSetNumber={nextSetNumber}
                        defaultWeight={defaultWeight || undefined}
                        defaultReps={defaultReps || undefined}
                        onSetLogged={() => router.refresh()}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
