export type SquatProfileType = 'HIP_DOMINANT' | 'KNEE_DOMINANT' | 'HYBRID';

export interface SquatProfile {
  type: SquatProfileType;
  label: string;
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
        label: 'Dominante de Cadera',
        mechanics: 'Inclinación Anterior Alta',
        torqueBias: 'Cadera/Lumbar',
        recommendedVariants: ['Sentadilla Barra Baja', 'Safety Bar Squat', 'Sentadilla Talones Elevados'],
        contraindications: ['Sentadilla Barra Alta (Postura Estándar)']
      };
    }

    // RULE 2: Knee Dominant / Upright
    if (femurTibiaRatio <= 1.0) {
      return {
        type: 'KNEE_DOMINANT',
        label: 'Dominante de Rodilla',
        mechanics: 'Torso Vertical',
        torqueBias: 'Cuádriceps',
        recommendedVariants: ['Sentadilla Barra Alta', 'Sentadilla Frontal'],
        contraindications: []
      };
    }

    // Default: Hybrid
    return {
      type: 'HYBRID',
      label: 'Híbrido / Balanceado',
      mechanics: 'Balanceado',
      torqueBias: 'Mixto',
      recommendedVariants: ['Cualquiera'],
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
  ,

  /**
   * Layer 1: Structural & Mobility Analysis
   * Filters exercises based on constraints
   */
  analyzeMobility(data: {
    thomasTestRight?: string | null;
    thomasTestLeft?: string | null;
    ankleDorsiflexionRightCm?: number | null;
    ankleDorsiflexionLeftCm?: number | null;
  }) {
    const warnings: string[] = [];
    const substitutions: { avoid: string; recommend: string; reason: string }[] = [];

    // Rule 1: Hip Flexor Restrictions (Thomas Test)
    if (data.thomasTestRight === 'TIGHT_PSOAS' || data.thomasTestLeft === 'TIGHT_PSOAS') {
      warnings.push("Acortamiento de Psoas detectado.");
      substitutions.push({
        avoid: "Hanging Leg Raise",
        recommend: "Deadbug / Plank",
        reason: "Evitar fatiga excesiva de flexores de cadera"
      });
    }

    // Rule 2: Ankle Mobility
    const ankleRight = data.ankleDorsiflexionRightCm ?? 15;
    const ankleLeft = data.ankleDorsiflexionLeftCm ?? 15;

    if (ankleRight < 10 || ankleLeft < 10) {
      warnings.push("Movilidad de tobillo limitada (<10cm).");
      substitutions.push({
        avoid: "Deep Barbell Squat (Flat Shoes)",
        recommend: "Heel Elevated Squat / Hack Squat",
        reason: "Mecánica comprometida por tobillo rígido"
      });
    }

    return { warnings, substitutions };
  }
};
