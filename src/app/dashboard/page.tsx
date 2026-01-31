"use client";

import { ReadinessRing } from '@/components/dashboard/ReadinessRing';
import { ActionCard } from '@/components/dashboard/ActionCard';
import { Activity, Zap, ClipboardList, ShieldAlert, ArrowRight } from 'lucide-react';

// MOCK DATA for MVP display (In real app, fetch from Supabase daily_metrics)
const DAILY_DATA = {
    score: 82,
    status: 'GREEN' as const,
    adjustments: [
        "Mantener RPE 8 en Sentadilla (Técnica sólida)",
        "Aumentar volumen en accesorios de espalda (+2 series)",
        "Suplementación: 5g Creatina post-entreno"
    ],
    biomechanics: [
        "Molestia rodilla derecha detectada",
        "REEMPLAZO: Sentadilla Libre ➔ Sentadilla Box a 90º"
    ]
};

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white pb-24">
            {/* Header */}
            <header className="px-6 pt-12 pb-6">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-1">
                    {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                </h4>
                <h1 className="text-3xl font-bold">The Daily Briefing</h1>
            </header>

            <main className="px-6 space-y-6 max-w-lg mx-auto">
                {/* 1. Readiness Visualization */}
                <section>
                    <ReadinessRing score={DAILY_DATA.score} status={DAILY_DATA.status} />
                </section>

                {/* 2. Carta de Ajuste (Actionable) */}
                <section>
                    <ActionCard
                        title="Carta de Ajuste Diario"
                        items={DAILY_DATA.adjustments}
                        icon={ClipboardList}
                        variant="default"
                    />
                </section>

                {/* 3. Selector Biomecánico (Alerts) */}
                <section>
                    <ActionCard
                        title="Semáforo Biomecánico"
                        items={DAILY_DATA.biomechanics}
                        icon={ShieldAlert}
                        variant="alert"
                    />
                </section>

                {/* Quick Actions */}
                <section className="grid grid-cols-2 gap-4 pt-4">
                    <a href="/dashboard/workout" className="p-4 rounded-xl bg-blue-600/10 border border-blue-600/20 flex flex-col items-center justify-center gap-2 hover:bg-blue-600/20 transition-colors cursor-pointer">
                        <Zap className="text-blue-500 w-6 h-6" />
                        <span className="text-xs font-bold text-blue-400">Iniciar Sesión</span>
                    </a>
                    <a href="/dashboard/check-in" className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 flex flex-col items-center justify-center gap-2 hover:bg-slate-800/50 transition-colors cursor-pointer">
                        <Activity className="text-slate-400 w-6 h-6" />
                        <span className="text-xs font-bold text-slate-400">Check-in</span>
                    </a>
                    <a href="/dashboard/diagnosis" className="col-span-2 p-4 rounded-xl bg-purple-600/10 border border-purple-600/20 flex flex-col items-center justify-center gap-2 hover:bg-purple-600/20 transition-colors cursor-pointer">
                        <ShieldAlert className="text-purple-500 w-6 h-6" />
                        <span className="text-xs font-bold text-purple-400">Diagnóstico Biomecánico</span>
                    </a>
                </section>
            </main>
        </div>
    );
}
