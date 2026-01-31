"use client";

import { useDiagnosisStore } from "@/store/useDiagnosisStore";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

const INJURY_ZONES = [
    { id: 'cervical', label: 'Cervical / Cuello' },
    { id: 'shoulder', label: 'Hombro / Escápula' },
    { id: 'elbow', label: 'Codo / Muñeca' },
    { id: 'lumbar', label: 'Lumbar / Espalda Baja' },
    { id: 'hip', label: 'Cadera / Glúteo' },
    { id: 'knee', label: 'Rodilla' },
    { id: 'ankle', label: 'Tobillo / Pie' },
];

export const InjuryMatrixStep = () => {
    const { injuries, toggleInjury, setStep } = useDiagnosisStore();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    <AlertCircle className="text-red-500" />
                    Historial de Lesiones y Red Flags
                </h2>
                <p className="text-slate-400">
                    Selecciona las zonas donde hayas tenido lesiones previas o dolor activo.
                </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                {INJURY_ZONES.map((zone) => (
                    <button
                        key={zone.id}
                        onClick={() => toggleInjury(zone.id)}
                        className={`flex items-center justify-between p-5 rounded-xl border transition-all ${injuries.includes(zone.id)
                                ? 'bg-red-500/10 border-red-500/50 text-red-400'
                                : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                    >
                        <span className="text-sm font-semibold">{zone.label}</span>
                        {injuries.includes(zone.id) && <CheckCircle2 className="w-5 h-5" />}
                    </button>
                ))}
            </div>

            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                <p className="text-xs text-blue-400/80 leading-relaxed italic">
                    * Nota: Esta información es crítica para que el sistema bloquee automáticamente ejercicios de alto riesgo y proponga variantes seguras.
                </p>
            </div>

            <div className="pt-6 flex justify-between">
                <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Atrás
                </Button>
                <Button
                    onClick={() => setStep(4)}
                    className="bg-blue-600 hover:bg-blue-500 text-white gap-2 px-8"
                >
                    Finalizar Diagnóstico
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </motion.div>
    );
};
