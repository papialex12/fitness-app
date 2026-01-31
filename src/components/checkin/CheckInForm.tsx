'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { submitCheckIn, type CheckInFormData } from '@/app/actions/check-in'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

export function CheckInForm() {
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [formData, setFormData] = useState<CheckInFormData>({
        weekNumber: 1, // TODO: Get from current plan
        weightKg: undefined,
        waistCm: undefined,
        sleepQuality: 7,
        energyLevel: 7,
        trainingDesire: 7,
        recoveryPerception: 7,
        stressLevel: 5,
        hungerLevel: 5,
        digestionQuality: 7,
        adherenceNutrition: 90,
        adherenceTraining: 100,
        wins: '',
        challenges: '',
        notes: '',
    })

    const handleSliderChange = (field: keyof CheckInFormData, value: number[]) => {
        setFormData(prev => ({ ...prev, [field]: value[0] }))
    }

    const handleChange = (field: keyof CheckInFormData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        setStatus('idle')
        try {
            const result = await submitCheckIn(formData)
            if (result.error) {
                setStatus('error')
            } else {
                setStatus('success')
            }
        } catch (error) {
            setStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

    if (status === 'success') {
        return (
            <Card className="max-w-xl mx-auto border-emerald-500/50 bg-emerald-950/10">
                <CardContent className="pt-6 text-center">
                    <div className="flex justify-center mb-4">
                        <CheckCircle2 className="h-16 w-16 text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">¡Check-in Completado!</h2>
                    <p className="text-neutral-400 mb-6">
                        Tus datos han sido registrados. El sistema analizará tu progreso y sugerirá ajustes si es necesario.
                    </p>
                    <Button onClick={() => window.location.href = '/dashboard'}>
                        Volver al Dashboard
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (

        <Card className="max-w-xl mx-auto border-white/10 bg-neutral-900/80 backdrop-blur-md shadow-2xl">
            <CardHeader>
                <CardTitle className="flex justify-between items-center text-white">
                    <span>Weekly Check-in</span>
                    <span className="text-sm font-normal text-emerald-400">Paso {step}/4</span>
                </CardTitle>
                <CardDescription className="text-neutral-400">
                    Semana {formData.weekNumber} • Responde con honestidad radical
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* STEP 1: OBJECTIVE METRICS */}
                {step === 1 && (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="weight" className="text-neutral-200">Peso Corporal (kg)</Label>
                            <Input
                                id="weight"
                                type="number"
                                step="0.1"
                                placeholder="Ej: 80.5"
                                value={formData.weightKg || ''}
                                onChange={(e) => handleChange('weightKg', parseFloat(e.target.value))}
                                className="bg-neutral-950/50 border-white/10 text-white placeholder:text-neutral-600 text-lg h-12 focus-visible:ring-emerald-500/50"
                                autoFocus
                            />
                            <p className="text-xs text-neutral-500">Usa la media semanal si la tienes, o el peso de hoy en ayunas.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="waist" className="text-neutral-200">Cintura (cm) - Opcional</Label>
                            <Input
                                id="waist"
                                type="number"
                                step="0.5"
                                placeholder="Ej: 82.0"
                                value={formData.waistCm || ''}
                                onChange={(e) => handleChange('waistCm', parseFloat(e.target.value))}
                                className="bg-neutral-950/50 border-white/10 text-white placeholder:text-neutral-600 h-12 focus-visible:ring-emerald-500/50"
                            />
                            <p className="text-xs text-neutral-500">Medido a la altura del ombligo, relajado.</p>
                        </div>
                    </div>
                )}

                {/* STEP 2: BIOFEEDBACK (1-10) */}
                {step === 2 && (
                    <div className="space-y-8 py-2">
                        <SliderField
                            label="Calidad de Sueño"
                            value={formData.sleepQuality}
                            onChange={(v) => handleSliderChange('sleepQuality', v)}
                            min={1} max={10}
                            lowLabel="Pésimo" highLabel="Excelente"
                        />
                        <SliderField
                            label="Nivel de Energía"
                            value={formData.energyLevel}
                            onChange={(v) => handleSliderChange('energyLevel', v)}
                            min={1} max={10}
                            lowLabel="Zombi" highLabel="Radioactivo"
                        />
                        <SliderField
                            label="Estrés (Fuera del gym)"
                            value={formData.stressLevel}
                            onChange={(v) => handleSliderChange('stressLevel', v)}
                            min={1} max={10}
                            lowLabel="Zen" highLabel="Caos total"
                        />
                        <SliderField
                            label="Hambre / Ansiedad"
                            value={formData.hungerLevel}
                            onChange={(v) => handleSliderChange('hungerLevel', v)}
                            min={1} max={10}
                            lowLabel="Saciado" highLabel="Hambriento"
                        />
                    </div>
                )}

                {/* STEP 3: TRAINING & RECOVERY */}
                {step === 3 && (
                    <div className="space-y-8 py-2">
                        <SliderField
                            label="Ganas de Entrenar"
                            value={formData.trainingDesire}
                            onChange={(v) => handleSliderChange('trainingDesire', v)}
                            min={1} max={10}
                            lowLabel="Ninguna" highLabel="A tope"
                        />
                        <SliderField
                            label="Percepción de Recuperación"
                            value={formData.recoveryPerception}
                            onChange={(v) => handleSliderChange('recoveryPerception', v)}
                            min={1} max={10}
                            lowLabel="Destrozado" highLabel="Fresco"
                        />
                        <SliderField
                            label="Digestión"
                            value={formData.digestionQuality}
                            onChange={(v) => handleSliderChange('digestionQuality', v)}
                            min={1} max={10}
                            lowLabel="Mala" highLabel="Perfecta"
                        />
                    </div>
                )}

                {/* STEP 4: ADHERENCE & REFLECTION */}
                {step === 4 && (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-white">
                                <Label className="text-base text-neutral-200">Adherencia Nutrición</Label>
                                <span className={`font-mono font-bold ${formData.adherenceNutrition >= 90 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                                    {formData.adherenceNutrition}%
                                </span>
                            </div>
                            <Slider
                                value={[formData.adherenceNutrition]}
                                onValueChange={(v) => handleSliderChange('adherenceNutrition', v)}
                                max={100}
                                step={5}
                                className="py-2"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-white">
                                <Label className="text-base text-neutral-200">Adherencia Entrenamiento</Label>
                                <span className={`font-mono font-bold ${formData.adherenceTraining >= 90 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                                    {formData.adherenceTraining}%
                                </span>
                            </div>
                            <Slider
                                value={[formData.adherenceTraining]}
                                onValueChange={(v) => handleSliderChange('adherenceTraining', v)}
                                max={100}
                                step={5}
                                className="py-2"
                            />
                        </div>

                        <div className="space-y-2 pt-2">
                            <Label htmlFor="wins" className="text-emerald-400">¿Qué salió bien esta semana? (Wins)</Label>
                            <Textarea
                                id="wins"
                                placeholder="Ej: PR en sentadilla, dormí 8h todos los días..."
                                value={formData.wins || ''}
                                onChange={(e) => handleChange('wins', e.target.value)}
                                className="bg-neutral-950/50 border-white/10 text-white placeholder:text-neutral-600 h-24 focus-visible:ring-emerald-500/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="challenges" className="text-amber-400">Desafíos / Problemas</Label>
                            <Textarea
                                id="challenges"
                                placeholder="Ej: Dolor hombro, cena de trabajo el jueves..."
                                value={formData.challenges || ''}
                                onChange={(e) => handleChange('challenges', e.target.value)}
                                className="bg-neutral-950/50 border-white/10 text-white placeholder:text-neutral-600 h-24 focus-visible:ring-amber-500/50"
                            />
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="mt-4 p-3 bg-red-950/30 border border-red-900 rounded-md flex items-center gap-2 text-red-200 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>Error al guardar el check-in. Inténtalo de nuevo.</span>
                    </div>
                )}

                <div className="mt-8 flex justify-between pt-4 border-t border-white/5">
                    {step > 1 ? (
                        <Button variant="ghost" onClick={prevStep} disabled={isSubmitting} className="text-neutral-400 hover:text-white hover:bg-white/5">
                            Atrás
                        </Button>
                    ) : (
                        <div /> // Spacer
                    )}

                    {step < 4 ? (
                        <Button onClick={nextStep} className="bg-white text-black hover:bg-neutral-200 font-medium px-8">
                            Siguiente
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 shadow-lg shadow-emerald-900/20">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Guardando...
                                </>
                            ) : (
                                'Enviar Reporte'
                            )}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

function SliderField({ label, value, onChange, min, max, lowLabel, highLabel }: {
    label: string,
    value: number,
    onChange: (v: number[]) => void,
    min: number,
    max: number,
    lowLabel: string,
    highLabel: string
}) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <Label className="text-neutral-200 text-base">{label}</Label>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-500 uppercase tracking-widest">Nivel</span>
                    <span className="font-mono font-bold text-white text-xl bg-white/5 px-3 py-1 rounded-md border border-white/5">{value}</span>
                </div>
            </div>
            <Slider
                value={[value]}
                onValueChange={onChange}
                min={min}
                max={max}
                step={1}
                className="py-2"
            />
            <div className="flex justify-between text-xs text-neutral-500 px-1 font-medium tracking-wide">
                <span>{lowLabel}</span>
                <span>{highLabel}</span>
            </div>
        </div>
    )
}
