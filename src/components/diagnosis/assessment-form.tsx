"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { assessmentSchema, AssessmentFormValues } from "@/lib/validations/assessment"
import { createAssessment } from "@/app/actions/assessment"
import { useState } from "react"

export function AssessmentForm() {
    const [loading, setLoading] = useState(false)

    const form = useForm<AssessmentFormValues>({
        resolver: zodResolver(assessmentSchema),
        defaultValues: {
            date: new Date(),
        },
    })

    async function onSubmit(data: AssessmentFormValues) {
        setLoading(true)
        try {
            const result = await createAssessment(data)
            if (result.error) {
                console.error("Error submitting:", result.error)
                alert("Error al guardar evaluación")
            } else {
                console.log("Success:", result.data)
                alert("Evaluación guardada con éxito")
            }
        } catch (error) {
            console.error("Submission error", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Antropometría</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="femurLengthCm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Longitud Fémur (cm)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="torsoLengthCm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Longitud Torso (cm)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Tests de Movilidad</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="thomasTestRight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Test Thomas (Derecha)</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar resultado" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="PASS">Apto (Pass)</SelectItem>
                                            <SelectItem value="TIGHT_PSOAS">Psoas Tenso</SelectItem>
                                            <SelectItem value="TIGHT_QUAD">Cuádriceps Tenso</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="thomasTestLeft"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Test Thomas (Izquierda)</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar resultado" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="PASS">Apto (Pass)</SelectItem>
                                            <SelectItem value="TIGHT_PSOAS">Psoas Tenso</SelectItem>
                                            <SelectItem value="TIGHT_QUAD">Cuádriceps Tenso</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar Evaluación"}
                </Button>
            </form>
        </Form>
    )
}
