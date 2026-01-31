"use client";

import { useDiagnosisStore } from "@/store/useDiagnosisStore";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Ruler, ArrowRight, ArrowLeft } from "lucide-react";

export const AnthropometryStep = () => {
    const { anthropometry, updateAnthropometry, setStep } = useDiagnosisStore();

    const handleNext = () => setStep(1);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    <Ruler className="text-blue-500" />
                    Antropometría y Palancas
                </h2>
                <p className="text-slate-400">
                    Mide tus segmentos óseos para predecir tu dominancia mecánica.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                {/* Fémur */}
                <div className="space-y-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="femur" className="text-sm font-medium text-slate-200">
                            Longitud Fémur (cm)
                        </Label>
                        <span className="text-lg font-mono text-blue-400">{anthropometry.femur}</span>
                    </div>
                    <Slider
                        id="femur"
                        min={30}
                        max={60}
                        step={0.5}
                        value={[anthropometry.femur]}
                        onValueChange={([val]) => updateAnthropometry({ femur: val })}
                    />
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                        Trocánter mayor a cóndilo lateral
                    </p>
                </div>

                {/* Tibia */}
                <div className="space-y-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="tibia" className="text-sm font-medium text-slate-200">
                            Longitud Tibia (cm)
                        </Label>
                        <span className="text-lg font-mono text-blue-400">{anthropometry.tibia}</span>
                    </div>
                    <Slider
                        id="tibia"
                        min={25}
                        max={50}
                        step={0.5}
                        value={[anthropometry.tibia]}
                        onValueChange={([val]) => updateAnthropometry({ tibia: val })}
                    />
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                        Cóndilo lateral a maléolo lateral
                    </p>
                </div>

                {/* Torso */}
                <div className="space-y-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="torso" className="text-sm font-medium text-slate-200">
                            Longitud Torso (cm)
                        </Label>
                        <span className="text-lg font-mono text-blue-400">{anthropometry.torso}</span>
                    </div>
                    <Slider
                        id="torso"
                        min={40}
                        max={80}
                        step={0.5}
                        value={[anthropometry.torso]}
                        onValueChange={([val]) => updateAnthropometry({ torso: val })}
                    />
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                        Cresta ilíaca a acromion
                    </p>
                </div>

                {/* Envergadura */}
                <div className="space-y-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="wingspan" className="text-sm font-medium text-slate-200">
                            Envergadura (cm)
                        </Label>
                        <span className="text-lg font-mono text-blue-400">{anthropometry.wingspan}</span>
                    </div>
                    <Slider
                        id="wingspan"
                        min={140}
                        max={220}
                        step={1}
                        value={[anthropometry.wingspan]}
                        onValueChange={([val]) => updateAnthropometry({ wingspan: val })}
                    />
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                        De punta a punta de dedos
                    </p>
                </div>
            </div>

            <div className="pt-6 flex justify-end">
                <Button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-500 text-white gap-2 px-8"
                >
                    Siguiente paso
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </motion.div>
    );
};
