import { BioProfileChart } from "@/components/diagnosis/radar-chart";
import { AssessmentForm } from "@/components/diagnosis/assessment-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DiagnosisPage() {
    return (
        <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Diagnóstico de Gemelo Digital</h2>
                <div className="flex items-center space-x-2">
                    {/* Actions like "Export Report" could go here */}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-3 bg-gradient-to-br from-card to-background/50">
                    <CardHeader>
                        <CardTitle>Perfil Biomecánico</CardTitle>
                        <CardDescription>
                            Mapa de capacidad estructural y funcional.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <BioProfileChart />
                    </CardContent>
                </Card>

                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Nueva Evaluación</CardTitle>
                        <CardDescription>
                            Introduce medidas recientes para actualizar tu perfil.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AssessmentForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
