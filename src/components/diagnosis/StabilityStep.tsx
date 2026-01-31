"use client";

import { useDiagnosisStore } from "@/store/useDiagnosisStore";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, ArrowLeft, TriangleAlert } from "lucide-react";

export const StabilityStep = () => {
    const { stability, updateStability, setStep } = useDiagnosisStore();

    const toggleFlag = (flag: string) => {
        updateStability({
            ohsFlags: stability.ohsFlags.includes(flag)
                ? stability.ohsFlags.filter((f) => f !== flag)
                : [...stability.ohsFlags, flag],
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    <ShieldCheck className="text-purple-500" />
                    Estabilidad y Control Motor
                </h2>
                <p className="text-slate-400">
                    Análisis del arco plantar y compensaciones dinámicas.
                </p>
            </div>

            <div className="space-y-8">
                {/* Navicular Drop */}
                <div className="space-y-4 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <Label className="text-base font-semibold text-slate-200">
                                Navicular Drop (Pie)
                            </Label>
                            <p className="text-xs text-slate-500">
                                Diferencia de altura del arco (Sentado vs De Pie)
                            </p>
                        </div>
                        <span className={`text-2xl font-mono ${stability.navicularDrop > 10 ? 'text-orange-400' : 'text-purple-400'}`}>
                            {stability.navicularDrop} mm
                        </span>
                    </div>
                    <Slider
                        min={0}
                        max={20}
                        step={1}
                        value={[stability.navicularDrop]}
                        onValueChange={([val]) => updateStability({ navicularDrop: val })}
                    />
                    {stability.navicularDrop > 10 && (
                        <p className="text-xs text-orange-400/80 bg-orange-400/10 p-2 rounded border border-orange-400/20">
                            ⚠️ Inestabilidad de arco detectada. Riesgo de valgo de rodilla.
                        </p>
                    )}
                </div>

                {/* OHS Flags */}
                <div className="space-y-4">
                    <Label className="text-base font-semibold text-slate-200 ml-1">
                        Overhead Squat Assessment (OHS)
                    </Label>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {[
                            { id: 'knee_valgus', label: 'Valgo de Rodilla', sub: 'Rodillas hacia adentro' },
                            { id: 'heel_lift', label: 'Talones elevados', sub: 'Falta de dorsiflexión' },
                            { id: 'excessive_lean', label: 'Inclinación excesiva', sub: 'Cadera dominante/Torso corto' },
                            { id: 'arms_fall', label: 'Brazos caen', sub: 'Déficit movilidad torácica' },
                        ].map((flag) => (
                            <button
                                key={flag.id}
                                onClick={() => toggleFlag(flag.id)}
                                className={`flex flex-col items-start p-4 rounded-xl border transition-all text-left ${stability.ohsFlags.includes(flag.id)
                                        ? 'bg-purple-500/10 border-purple-500/50 text-purple-400'
                                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                                    }`}
                            >
                                <div className="flex justify-between w-full mb-1">
                                    <p className="text-sm font-bold">{flag.label}</p>
                                    {stability.ohsFlags.includes(flag.id) && <TriangleAlert className="w-4 h-4" />}
                                </div>
                                <p className="text-[10px] opacity-60 uppercase tracking-widest">{flag.sub}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-6 flex justify-between">
                <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Atrás
                </Button>
                <Button
                    onClick={() => setStep(3)}
                    className="bg-blue-600 hover:bg-blue-500 text-white gap-2 px-8"
                >
                    Siguiente paso
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </motion.div>
    );
};
