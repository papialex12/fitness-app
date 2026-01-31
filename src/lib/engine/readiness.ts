export interface DailyMetrics {
    sleep_quality_score: number;
    sleep_duration_minutes: number;
    hrv_rmssd: number;
    kcal_consumed: number;
    last_session_rpe?: number;
}

export interface ReadinessResult {
    score: number;
    status: 'GREEN' | 'YELLOW' | 'RED';
    flags: string[];
    recommendations: string[];
}

/**
 * Calculates the Daily Readiness Score based on physiology and lifestyle factors.
 * Formula: Weighted average of Sleep, HRV, and Nutrient status.
 */
export function calculateReadiness(metrics: DailyMetrics): ReadinessResult {
    const flags: string[] = [];
    const recommendations: string[] = [];

    // 1. Normalize HRV (Simplified MVP: Hard threshold baseline of 50ms)
    // In production, this should be Z-Score relative to user's 7-day rolling average
    const hrvBaseline = 50;
    let hrvScore = (metrics.hrv_rmssd / hrvBaseline) * 100;
    if (hrvScore > 100) hrvScore = 100; // Cap at 100% capacity

    // 2. Nutrition Penalty
    let nutritionPenalty = 0;
    if (metrics.kcal_consumed < 2000) {
        nutritionPenalty = 15;
        flags.push('FLAG_NUTRITION');
        recommendations.push('Aumentar ingesta de carbohidratos peri-entreno.');
    }

    // 3. Sleep Penalty
    if (metrics.sleep_duration_minutes < 360) { // < 6 hours
        flags.push('FLAG_SLEEP');
        recommendations.push('Priorizar siesta de 20min o Yoga Nidra.');
    }

    // 4. Calculate Weighted Score
    // Weights: Sleep (40%), HRV (40%), Nutrition Penalty (Subtractive)
    let rawScore = (0.4 * metrics.sleep_quality_score) + (0.4 * hrvScore) - nutritionPenalty;

    // Clamp score
    const finalScore = Math.max(0, Math.min(100, Math.round(rawScore)));

    // 5. Determine Status
    let status: 'GREEN' | 'YELLOW' | 'RED' = 'GREEN';

    if (finalScore < 40) {
        status = 'RED';
        recommendations.push('Protocolo de Emergencia: Reducir volumen 50%. Solo técnica.');
    } else if (finalScore < 70) {
        status = 'YELLOW';
        recommendations.push('Precaución: Mantener RPE pero eliminar series basura.');
    } else {
        status = 'GREEN';
        recommendations.push('Go Time: Autorización para buscar PR si la técnica acompaña.');
    }

    return {
        score: finalScore,
        status,
        flags,
        recommendations
    };
}
