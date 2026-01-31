"use client"

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BioProfileData {
    subject: string;
    A: number; // User score
    fullMark: number;
}

const defaultData: BioProfileData[] = [
    { subject: 'Movilidad', A: 65, fullMark: 100 },
    { subject: 'Fuerza', A: 80, fullMark: 100 },
    { subject: 'Resistencia', A: 50, fullMark: 100 },
    { subject: 'Recuperación', A: 70, fullMark: 100 },
    { subject: 'Estructura', A: 90, fullMark: 100 },
];

export function BioProfileChart({ data = defaultData }: { data?: BioProfileData[] }) {
    return (
        <Card className="w-full h-[400px] border-none shadow-none bg-transparent">
            <CardHeader>
                <CardTitle className="text-center text-sm font-light uppercase tracking-widest text-muted-foreground">
                    Perfil Biomecánico
                </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Atleta"
                            dataKey="A"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            fill="hsl(var(--primary))"
                            fillOpacity={0.3}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
