"use client";

import { motion } from "framer-motion";

interface ReadinessRingProps {
    score: number;
    status: 'GREEN' | 'YELLOW' | 'RED';
}

const STATUS_COLORS = {
    GREEN: '#10B981', // emerald-500
    YELLOW: '#F59E0B', // amber-500
    RED: '#EF4444',   // red-500
};

const STATUS_LABEL = {
    GREEN: 'ÓPTIMO',
    YELLOW: 'PRECAUCIÓN',
    RED: 'FATIGA CENTRAL',
};

export const ReadinessRing = ({ score, status }: ReadinessRingProps) => {
    const color = STATUS_COLORS[status];
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex flex-col items-center justify-center py-8">
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Glow Effect */}
                <div
                    className="absolute inset-0 rounded-full blur-[40px] opacity-20 transition-colors duration-500"
                    style={{ backgroundColor: color }}
                />

                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke="#1e293b" // slate-800
                        strokeWidth="12"
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke={color}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeLinecap="round"
                    />
                </svg>

                <div className="absolute flex flex-col items-center">
                    <span className="text-5xl font-bold text-white tracking-tighter">
                        {score}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-1" style={{ color }}>
                        {STATUS_LABEL[status]}
                    </span>
                </div>
            </div>
        </div>
    );
};
