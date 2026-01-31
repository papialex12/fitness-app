import { z } from "zod";

export const assessmentSchema = z.object({
    date: z.date(),

    // Anthropometry
    femurLengthCm: z.number().min(30).max(60).optional(),
    tibiaLengthCm: z.number().min(30).max(60).optional(),
    torsoLengthCm: z.number().min(40).max(70).optional(),
    armSpanCm: z.number().min(100).max(250).optional(),

    // Mobility (Quantitative)
    ankleDorsiflexionRightCm: z.number().min(0).max(20).optional(),
    ankleDorsiflexionLeftCm: z.number().min(0).max(20).optional(),

    hipInternalRotationRightDeg: z.number().min(0).max(90).optional(),
    hipInternalRotationLeftDeg: z.number().min(0).max(90).optional(),

    shoulderFlexionRightDeg: z.number().min(0).max(180).optional(),
    shoulderFlexionLeftDeg: z.number().min(0).max(180).optional(),

    // Clinical Tests (Qualitative)
    thomasTestRight: z.enum(["PASS", "TIGHT_PSOAS", "TIGHT_QUAD"]).optional(),
    thomasTestLeft: z.enum(["PASS", "TIGHT_PSOAS", "TIGHT_QUAD"]).optional(),

    notes: z.string().optional(),
});

export type AssessmentFormValues = z.infer<typeof assessmentSchema>;
