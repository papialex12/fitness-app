"use client";

import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Exercise {
    id: string;
    name: string;
}

interface ExerciseSelectorProps {
    onSelect: (exerciseId: string) => void;
    selectedId?: string;
}

export function ExerciseSelector({ onSelect, selectedId }: ExerciseSelectorProps) {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/exercises")
            .then((res) => res.json())
            .then((data) => {
                setExercises(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load exercises", err);
                setLoading(false);
            });
    }, []);

    return (
        <Select onValueChange={onSelect} value={selectedId}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={loading ? "Cargando..." : "Selecciona Ejercicio"} />
            </SelectTrigger>
            <SelectContent>
                {exercises.map((ex) => (
                    <SelectItem key={ex.id} value={ex.id}>
                        {ex.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
