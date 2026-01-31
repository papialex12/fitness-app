import { PrismaClient } from '@prisma/client'

// Tipos para las recomendaciones del motor
export type AdjustmentResult = {
    type: 'CALORIE_ADJUSTMENT' | 'DELOAD' | 'MAINTENANCE' | 'ALERT'
    message: string
    changes?: {
        caloriesKcal?: number
        proteinG?: number
        steps?: number
    }
    reasons: string[]
}

export class RuleEngine {
    // Ajuste de déficit calórico basado en tendencia de peso
    static evaluateProgress(
        weightTrend: number, // Pendiente kg/semana
        adherenceNutrition: number, // 0-100%
        weeksStalled: number
    ): AdjustmentResult {
        // Regla 1: Falta de adherencia
        if (adherenceNutrition < 85) {
            return {
                type: 'ALERT',
                message: 'Prioridad: Mejorar adherencia antes de ajustar plan.',
                reasons: ['ADHERENCE_LOW'],
            }
        }

        // Regla 2: Estancamiento real (>2 semanas sin bajar al ritmo esperado)
        // Asumimos objetivo -0.5kg/semana. Si baja menos de 0.2kg o sube...
        if (weeksStalled >= 2 && weightTrend > -0.2) {
            return {
                type: 'CALORIE_ADJUSTMENT',
                message: 'Estancamiento detectado con buena adherencia. Reduciendo calorías.',
                changes: {
                    caloriesKcal: -150, // Agresividad baja
                },
                reasons: ['STALLED_WEIGHT', 'GOOD_ADHERENCE'],
            }
        }

        // Regla 3: Pérdida muy rápida (>1.5% peso corporal ~ >1.2kg)
        if (weightTrend < -1.2) {
            return {
                type: 'ALERT',
                message: 'Pérdida de peso muy rápida. Riesgo de pérdida muscular.',
                reasons: ['TOO_FAST_LOSS'],
            }
        }

        return {
            type: 'MAINTENANCE',
            message: 'Progreso dentro del rango esperado. Mantener plan.',
            reasons: ['ON_TRACK'],
        }
    }

    // Evaluación de necesidad de Deload
    static evaluateDeload(
        fatigueScore: number, // 1-10
        jointPain: number, // 0-10
        performanceTrend: 'INCREASING' | 'STABLE' | 'DECREASING',
        weeksAccumulated: number
    ): AdjustmentResult | null {
        const triggers = []

        if (fatigueScore > 8) triggers.push('HIGH_FATIGUE')
        if (jointPain > 6) triggers.push('JOINT_PAIN')
        if (performanceTrend === 'DECREASING') triggers.push('PERFORMANCE_DROP')
        if (weeksAccumulated > 6) triggers.push('ACCUMULATION_CYCLE_LIMIT')

        if (triggers.length >= 2 || weeksAccumulated > 8) {
            return {
                type: 'DELOAD',
                message: 'Se recomienda semana de descarga para disipar fatiga.',
                reasons: triggers,
            }
        }

        return null
    }
}
