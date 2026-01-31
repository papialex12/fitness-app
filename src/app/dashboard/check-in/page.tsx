import { CheckInForm } from '@/components/checkin/CheckInForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Check-in Semanal | Elite Fitness',
    description: 'Registro de progreso semanal',
}

export default function CheckInPage() {
    return (
        <div className="container max-w-4xl mx-auto py-10 px-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Check-in Semanal</h1>
                <p className="text-neutral-400">
                    La constancia es la clave. Tómate 2 minutos para registrar tu progreso.
                </p>
            </div>

            <CheckInForm />
        </div>
    )
}
