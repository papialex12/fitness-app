'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { logSet } from '@/app/actions/workout'
import { Loader2, Plus, Save } from 'lucide-react'

type SetLoggerProps = {
    workoutId: string
    exerciseId: string
    nextSetNumber: number
    defaultWeight?: number
    defaultReps?: number
    onSetLogged?: () => void
}

export function SetLogger({
    workoutId,
    exerciseId,
    nextSetNumber,
    defaultWeight = 0,
    defaultReps = 0,
    onSetLogged
}: SetLoggerProps) {
    const [loading, setLoading] = useState(false)
    const [reps, setReps] = useState<string>(defaultReps ? defaultReps.toString() : '')
    const [weight, setWeight] = useState<string>(defaultWeight ? defaultWeight.toString() : '')
    const [rir, setRir] = useState<string>('')
    const [rpe, setRpe] = useState<string>('')

    async function handleSave() {
        if (!reps || !weight) return // Basic validation

        setLoading(true)
        try {
            const result = await logSet({
                workoutId,
                exerciseId,
                setNumber: nextSetNumber,
                reps: parseInt(reps),
                weightKg: parseFloat(weight),
                rir: rir ? parseInt(rir) : undefined,
                rpe: rpe ? parseFloat(rpe) : undefined,
            })

            if (result.success) {
                // Reset form or at least RIR/RPE, keeping weight/reps for next set convenience?
                // For elite athletes, usually weight stays same, reps might change.
                // Let's clear RIR/RPE, keep rest.
                setRir('')
                setRpe('')
                onSetLogged?.()
            } else {
                alert(result.message || 'Error saving set')
            }
        } catch (error) {
            console.error(error)
            alert('Error saving set')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full bg-neutral-900 border-neutral-800">
            <CardContent className="p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-neutral-400">
                        SET {nextSetNumber}
                    </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    {/* PESO */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="weight" className="text-xs text-center text-neutral-500">KG</Label>
                        <Input
                            id="weight"
                            type="number"
                            inputMode="decimal"
                            placeholder="0"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="text-center h-12 text-lg bg-neutral-950 border-neutral-800 focus:ring-emerald-500/50"
                        />
                    </div>

                    {/* REPS */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="reps" className="text-xs text-center text-neutral-500">REPS</Label>
                        <Input
                            id="reps"
                            type="number"
                            inputMode="numeric"
                            placeholder="0"
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                            className="text-center h-12 text-lg bg-neutral-950 border-neutral-800 focus:ring-emerald-500/50"
                        />
                    </div>

                    {/* RIR */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="rir" className="text-xs text-center text-neutral-500">RIR</Label>
                        <Input
                            id="rir"
                            type="number"
                            inputMode="numeric"
                            placeholder="-"
                            value={rir}
                            onChange={(e) => setRir(e.target.value)}
                            className="text-center h-12 text-lg bg-neutral-950 border-neutral-800 focus:ring-emerald-500/50"
                        />
                    </div>

                    {/* ACTION BUTTON */}
                    <div className="flex flex-col gap-1 justify-end">
                        <Button
                            onClick={handleSave}
                            disabled={loading || !reps || !weight}
                            className="h-12 w-full bg-emerald-600 hover:bg-emerald-500 text-white"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
