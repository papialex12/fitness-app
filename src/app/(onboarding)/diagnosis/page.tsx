"use client";

import { useDiagnosisStore } from "@/store/useDiagnosisStore";
import { AnthropometryStep } from "@/components/diagnosis/AnthropometryStep";
import { MobilityStep } from "@/components/diagnosis/MobilityStep";
import { StabilityStep } from "@/components/diagnosis/StabilityStep";
import { InjuryMatrixStep } from "@/components/diagnosis/InjuryMatrixStep";
import { DiagnosisResultView } from "@/components/diagnosis/DiagnosisResultView";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
    { id: 0, label: "Antropometría" },
    { id: 1, label: "Movilidad" },
    { id: 2, label: "Estabilidad" },
    { id: 3, label: "Lesiones" },
    { id: 4, label: "Resultado" },
];

export default function DiagnosisPage() {
    const { step } = useDiagnosisStore();

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30">
            {/* Premium Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative max-w-2xl mx-auto px-6 pt-12 pb-24">
                {/* Header / Progress bar */}
                <div className="mb-12 space-y-6">
                    <div className="flex flex-col gap-1">
                        <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-500">
                            Onboarding Elite
                        </h4>
                        <h1 className="text-3xl font-bold text-white">Gemelo Digital Biomecánico</h1>
                    </div>

                    <div className="flex justify-between items-center gap-2">
                        {STEPS.map((s) => (
                            <div key={s.id} className="flex-1 flex flex-col gap-2">
                                <div
                                    className={`h-1 rounded-full transition-all duration-500 ${step >= s.id ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-800'
                                        }`}
                                />
                                <span className={`text-[8px] uppercase tracking-tighter font-medium transition-colors ${step === s.id ? 'text-blue-400' : 'text-slate-600'
                                    }`}>
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Wizard Content */}
                <main className="relative min-h-[500px] p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-xl shadow-2xl overflow-hidden">
                    <AnimatePresence mode="wait">
                        {step === 0 && <AnthropometryStep key="step0" />}
                        {step === 1 && <MobilityStep key="step1" />}
                        {step === 2 && <StabilityStep key="step2" />}
                        {step === 3 && <InjuryMatrixStep key="step3" />}
                        {step === 4 && <DiagnosisResultView key="step4" />}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
