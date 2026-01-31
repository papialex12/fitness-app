import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AnthropometryData {
    femur: number;
    tibia: number;
    torso: number;
    wingspan: number;
}

interface MobilityData {
    ankleWBLT: number; // cm
    thomasTest: {
        psoasShortened: boolean;
        rectusFemorisShortened: boolean;
        tflShortened: boolean;
    };
}

interface StabilityData {
    navicularDrop: number; // mm
    ohsFlags: string[];
}

interface DiagnosisState {
    step: number;
    anthropometry: AnthropometryData;
    mobility: MobilityData;
    stability: StabilityData;
    injuries: string[];

    // Actions
    setStep: (step: number) => void;
    updateAnthropometry: (data: Partial<AnthropometryData>) => void;
    updateMobility: (data: Partial<MobilityData>) => void;
    updateStability: (data: Partial<StabilityData>) => void;
    toggleInjury: (injury: string) => void;
    reset: () => void;
}

const initialState = {
    step: 0,
    anthropometry: {
        femur: 0,
        tibia: 0,
        torso: 0,
        wingspan: 0,
    },
    mobility: {
        ankleWBLT: 12,
        thomasTest: {
            psoasShortened: false,
            rectusFemorisShortened: false,
            tflShortened: false,
        },
    },
    stability: {
        navicularDrop: 5,
        ohsFlags: [],
    },
    injuries: [],
};

export const useDiagnosisStore = create<DiagnosisState>()(
    persist(
        (set) => ({
            ...initialState,

            setStep: (step) => set({ step }),

            updateAnthropometry: (data) =>
                set((state) => ({ anthropometry: { ...state.anthropometry, ...data } })),

            updateMobility: (data) =>
                set((state) => ({ mobility: { ...state.mobility, ...data } })),

            updateStability: (data) =>
                set((state) => ({ stability: { ...state.stability, ...data } })),

            toggleInjury: (injury) =>
                set((state) => ({
                    injuries: state.injuries.includes(injury)
                        ? state.injuries.filter((i) => i !== injury)
                        : [...state.injuries, injury],
                })),

            reset: () => set(initialState),
        }),
        {
            name: 'diagnosis-storage',
        }
    )
);
