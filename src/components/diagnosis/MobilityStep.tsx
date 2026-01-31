"use client";

import { useDiagnosisStore } from "@/store/useDiagnosisStore";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Activity, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export const MobilityStep = () => {
    const { mobility, updateMobility, setStep } = useDiagnosisStore();

    const toggleThomas = (key: keyof typeof mobility.thomasTest) => {
        updateMobility({
            thomasTest: {
                ...mobility.thomasTest,
                [key]: !mobility.thomasTest[key],
            },
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
                    <Activity className="text-emerald-500" />
                    Auditoría de Movilidad (ROM)
                </h2>
                <p className="text-slate-400">
                    Evalúa tus rangos articulares para detectar restricciones estructurales.
                </p>
            </div>

            <div className="space-y-8">
                {/* Ankle WBLT */}
                <div className="space-y-4 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <Label className="text-base font-semibold text-slate-200">
                                Test de Tobillo (WBLT)
                            </Label>
                            <p className="text-xs text-slate-500">
                                Distancia máxima sin levantar el talón
                            </p>
                        </div>
                        <span className={`text-2xl font-mono ${mobility.ankleWBLT < 10 ? 'text-red-400' : 'text-emerald-400'}`}>
                            {mobility.ankleWBLT} cm
                        </span>
                    </div>
                    <Slider
                        min={0}
                        max={20}
                        step={0.5}
                        value={[mobility.ankleWBLT]}
                        onValueChange={([val]) => updateMobility({ ankleWBLT: val })}
                    />
                    {mobility.ankleWBLT < 10 && (
                        <p className="text-xs text-red-400/80 bg-red-400/10 p-2 rounded border border-red-400/20">
                            ⚠️ Restricción detectada. Se requerirá elevación de talón en sentadilla.
                        </p>
                    )}
                </div>

                {/* Thomas Test */}
                <div className="space-y-4">
                    <Label className="text-base font-semibold text-slate-200 ml-1">
                        Test de Thomas (Cadera/Cuádriceps)
                    </Label>
                    <div className="grid gap-3">
                        {[
                            { id: 'psoasShortened', label: '¿El muslo NO toca el suelo?', sub: 'Indica Psoas acortado' },
                            { id: 'rectusFemorisShortened', label: '¿La rodilla NO cuelga a 90º?', sub: 'Indica Recto Anterior acortado' },
                            { id: 'tflShortened', label: '¿La pierna se abre hacia afuera?', sub: 'Indica TFL acortado' },
                        ].map((test) => (
                            <button
                                key={test.id}
                                onClick={() => toggleThomas(test.id as any)}
                                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${mobility.thomasTest[test.id as keyof typeof mobility.thomasTest]
                                        ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                                    }`}
                            >
                                <div className="text-left">
                                    <p className="text-sm font-medium">{test.label}</p>
                                    <p className="text-[10px] opacity-60 uppercase tracking-widest">{test.sub}</p>
                                </div>
                                {mobility.thomasTest[test.id as keyof typeof mobility.thomasTest] && (
                                    <CheckCircle2 className="w-5 h-5" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-6 flex justify-between">
                <Button
                    variant="outline"
                    onClick={() => setStep(0)}
                    className="border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Atrás
                </Button>
                <Button
                    onClick={() => setStep(2)}
                    className="bg-blue-600 hover:bg-blue-500 text-white gap-2 px-8"
                >
                    Siguiente paso
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </motion.div>
    );
};
