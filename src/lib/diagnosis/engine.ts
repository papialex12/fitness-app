export type SquatProfileType = 'HIP_DOMINANT' | 'KNEE_DOMINANT' | 'HYBRID';

export interface SquatProfile {
  type: SquatProfileType;
  mechanics: string;
  torqueBias: string;
  recommendedVariants: string[];
  contraindications: string[];
}

export interface StabilityResult {
  status: 'STABLE' | 'UNSTABLE_ARCH';
  label: string;
  risk: string[];
  prescription: string[];
  trainingMod: string;
}

/**
 * Biomechanical Engine
 * Standards: TheOvercode Architecture
 */

export const DiagnosisEngine = {
  /**
   * Implements Algorithm A1: Squat Mechanics Prediction
   * Based on segment ratios (Femur, Tibia, Torso)
   */
  predictSquatMechanics(femur: number, tibia: number, torso: number): SquatProfile {
    const femurTibiaRatio = femur / tibia;
    const femurTorsoRatio = femur / torso;

    // RULE 1: Hip Dominant
    if (femurTibiaRatio > 1.1 && femurTorsoRatio > 0.9) {
      return {
        type: 'HIP_DOMINANT',
        mechanics: 'High Forward Lean',
        torqueBias: 'Lumbar/Hip',
        recommendedVariants: ['Low Bar Squat (if mobility allows)', 'Safety Bar Squat', 'Heel Elevated Squat'],
        contraindications: ['High Bar Squat (Standard Stance) - High Shear Force risk']
      };
    }

    // RULE 2: Knee Dominant / Upright
    if (femurTibiaRatio <= 1.0) {
      return {
        type: 'KNEE_DOMINANT',
        mechanics: 'Upright Torso',
        torqueBias: 'Quad',
        recommendedVariants: ['High Bar Squat', 'Front Squat'],
        contraindications: []
      };
    }

    // Default: Hybrid
    return {
      type: 'HYBRID',
      mechanics: 'Balanced',
      torqueBias: 'Balanced',
      recommendedVariants: ['Any'],
      contraindications: []
    };
  },

  /**
   * Analyzes Foot Stability (Navicular Drop)
   */
  analyzeFootStability(dropMm: number): StabilityResult | null {
    if (dropMm > 10) {
      return {
        status: 'UNSTABLE_ARCH',
        label: 'Colapso del Arco Plantar',
        risk: ['Valgo de Rodilla', 'Rotación Interna Tibial'],
        prescription: ['Short Foot Exercise', 'Toe Spreading'],
        trainingMod: 'Prohibir pliometría de alto impacto hasta corregir'
      };
    }
    return {
      status: 'STABLE',
      label: 'Arco Plantar Estable',
      risk: [],
      prescription: [],
      trainingMod: 'Sin restricciones'
    };
  }
};
