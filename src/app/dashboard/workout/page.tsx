import { WorkoutSession } from "@/components/workout/WorkoutSession";

export default function WorkoutPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Registro de Entrenamiento</h1>
            <p className="text-gray-600">Registra tu progreso y recibe feedback en tiempo real.</p>

            <div className="mt-6">
                <WorkoutSession />
            </div>
        </div>
    );
}
