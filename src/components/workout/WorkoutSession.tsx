"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExerciseSelector } from "./ExerciseSelector";

interface SetLog {
    id: string;
    workoutId: string;
    exerciseId: string;
    exercise: { name: string };
    weightKg: number;
    reps: number;
    rpe?: number;
    createdAt: string;
}

interface Workout {
    id: string;
    startTime: string;
    sets: SetLog[];
}

export function WorkoutSession() {
    const [workout, setWorkout] = useState<Workout | null>(null);
    const [loading, setLoading] = useState(true);

    // Form State
    const [exerciseId, setExerciseId] = useState("");
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");
    const [rpe, setRpe] = useState("");
    const [feedback, setFeedback] = useState<string | null>(null);

    useEffect(() => {
        fetchActiveWorkout();
    }, []);

    const fetchActiveWorkout = async () => {
        try {
            const res = await fetch("/api/workouts");
            const data = await res.json();
            if (data && data.id) {
                setWorkout(data);
            } else {
                setWorkout(null);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const startWorkout = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/workouts", { method: "POST" });
            const data = await res.json();
            setWorkout({ ...data, sets: [] });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const finishWorkout = async () => {
        if (!workout) return;
        if (!confirm("¿Terminar entrenamiento?")) return;

        setLoading(true);
        try {
            await fetch(`/api/workouts/${workout.id}/finish`, { method: "POST" });
            setWorkout(null);
            setFeedback(null);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const logSet = async () => {
        if (!workout || !exerciseId || !weight || !reps) {
            alert("Faltan datos (Ejercicio, Peso o Reps)");
            return;
        }

        try {
            const res = await fetch("/api/sets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    workoutId: workout.id,
                    exerciseId,
                    weight,
                    reps,
                    rpe
                })
            });

            if (!res.ok) throw new Error("Failed to log set");

            const newSet = await res.json();
            setWorkout(prev => prev ? { ...prev, sets: [...prev.sets, newSet] } : null);

            // Rule Engine (Basic Feedback)
            const rpeVal = parseFloat(rpe);
            if (rpeVal && rpeVal < 7) {
                setFeedback("🔥 Fácil: ¡Sube peso en la próxima!");
            } else if (rpeVal && rpeVal > 9) {
                setFeedback("⚠️ Intenso: Considera bajar peso o descansar más.");
            } else if (rpeVal) {
                setFeedback("✅ Óptimo: Buen trabajo, mantén este ritmo.");
            } else {
                setFeedback("Set registrado.");
            }

            // Clear non-persisting fields (keep exercise/weight for convenience?)
            // Usually keeping weight/reps is nice, but I'll clear reps/rpe
            setReps("");
            setRpe("");

        } catch (e) {
            console.error(e);
            alert("Error al registrar serie");
        }
    };

    if (loading) return <div className="text-center p-8">Cargando estado...</div>;

    if (!workout) {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">¿Listo para entrenar?</h2>
                <Button size="lg" onClick={startWorkout} className="w-full max-w-sm">
                    Iniciar Entrenamiento
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                <div>
                    <h2 className="font-bold text-lg">Entrenamiento en Curso</h2>
                    <span className="text-sm text-gray-500">Iniciado: {new Date(workout.startTime).toLocaleTimeString()}</span>
                </div>
                <Button variant="destructive" onClick={finishWorkout}>Terminar</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Registrar Serie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {feedback && (
                        <div className="p-3 bg-blue-50 text-blue-700 border border-blue-200 rounded text-sm font-medium">
                            {feedback}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label>Ejercicio</Label>
                        <ExerciseSelector onSelect={setExerciseId} selectedId={exerciseId} />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Peso (kg)</Label>
                            <Input type="number" placeholder="0" value={weight} onChange={e => setWeight(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Reps</Label>
                            <Input type="number" placeholder="0" value={reps} onChange={e => setReps(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>RPE (1-10)</Label>
                            <Input type="number" placeholder="-" max={10} value={rpe} onChange={e => setRpe(e.target.value)} />
                        </div>
                    </div>

                    <Button className="w-full" onClick={logSet}>
                        Registrar Serie
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Historial de Hoy</CardTitle>
                </CardHeader>
                <CardContent>
                    {workout.sets.length === 0 ? (
                        <p className="text-gray-400 text-center py-4">No hay series registradas aún.</p>
                    ) : (
                        <div className="space-y-2">
                            {[...workout.sets].reverse().map((set) => (
                                <div key={set.id} className="flex justify-between items-center p-3 border rounded bg-white shadow-sm">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{set.exercise.name}</span>
                                        <span className="text-xs text-gray-500">{new Date(set.createdAt).toLocaleTimeString()}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-mono text-lg">
                                            {set.weightKg}kg x {set.reps}
                                        </div>
                                        {set.rpe && <div className="text-xs text-gray-400">RPE: {set.rpe}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
