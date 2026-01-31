"use client";

import { useDiagnosisStore } from "@/store/useDiagnosisStore";
import { DiagnosisEngine } from "@/lib/diagnosis/engine";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Trophy, Activity, RotateCcw, AlertTriangle, CheckCircle } from "lucide-react";

export const DiagnosisResultView = () => {
    const { anthropometry, mobility, stability, injuries, reset } = useDiagnosisStore();

    const squatProfile = DiagnosisEngine.predictSquatMechanics(
        anthropometry.femur,
        anthropometry.tibia,
        anthropometry.torso
    );

    const footStability = DiagnosisEngine.analyzeFootStability(stability.navicularDrop);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
        >
            <div className="text-center space-y-2">
                <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                    <Trophy className="text-blue-500 w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white">¡Gemelo Digital Generado!</h2>
                <p className="text-slate-400">Tu perfil biomecánico estructural está listo.</p>
            </div>

            <div className="grid gap-4">
                {/* Profile Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Activity className="text-blue-400 w-5 h-5" />
                            Perfil de Sentadilla
                        </h3>
                        <span className="px-3 py-1 rounded-full bg-blue-500 text-[10px] font-bold uppercase tracking-widest text-white">
                            {squatProfile.type}
                        </span>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Mecánica</p>
                                <p className="text-sm text-slate-200">{squatProfile.mechanics}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Torque Principal</p>
                                <p className="text-sm text-slate-200">{squatProfile.torqueBias}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Recomendaciones</p>
                            <div className="flex flex-wrap gap-2">
                                {squatProfile.recommendedVariants.map((v, i) => (
                                    <span key={i} className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                                        {v}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Foot Stability Card */}
                <div className={`p-6 rounded-2xl border ${footStability?.status === 'UNSTABLE_ARCH'
                        ? 'bg-orange-500/5 border-orange-500/20'
                        : 'bg-emerald-500/5 border-emerald-500/20'
                    }`}>
                    <div className="flex items-center gap-3 mb-2">
                        {footStability?.status === 'UNSTABLE_ARCH'
                            ? <AlertTriangle className="text-orange-500 w-5 h-5" />
                            : <CheckCircle className="text-emerald-500 w-5 h-5" />
                        }
                        <h3 className="font-bold text-white">{footStability?.label}</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {footStability?.trainingMod}
                    </p>
                    {footStability?.status === 'UNSTABLE_ARCH' && (
                        <div className="space-y-2">
                            <p className="text-[10px] text-orange-400 uppercase font-bold">Correcciones:</p>
                            <ul className="text-xs text-slate-300 list-disc list-inside">
                                {footStability.prescription.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Injury Matrix Card */}
                {injuries.length > 0 && (
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                        <h4 className="text-[10px] font-bold text-red-500 uppercase mb-2">⚠ Zonas de Riesgo Bloqueadas</h4>
                        <div className="flex flex-wrap gap-2">
                            {injuries.map((id) => (
                                <span key={id} className="text-[10px] px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/20 font-bold uppercase">
                                    {id}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="pt-8 flex flex-col gap-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-500 h-12 text-lg font-bold">
                    Confirmar y Guardar Perfil
                </Button>
                <Button
                    variant="ghost"
                    onClick={reset}
                    className="w-full text-slate-500 hover:text-white"
                >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reiniciar Diagnóstico
                </Button>
            </div>
        </motion.div>
    );
};
