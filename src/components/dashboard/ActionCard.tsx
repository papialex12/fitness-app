import { LucideIcon } from "lucide-react";

interface ActionCardProps {
    title: string;
    items: string[];
    icon: LucideIcon;
    variant: 'default' | 'alert' | 'success';
}

const VARIANTS = {
    default: 'bg-slate-900/50 border-slate-800 text-slate-200',
    alert: 'bg-red-500/5 border-red-500/20 text-red-200',
    success: 'bg-emerald-500/5 border-emerald-500/20 text-emerald-200',
};

const ICON_COLORS = {
    default: 'text-slate-400',
    alert: 'text-red-500',
    success: 'text-emerald-500',
};

export const ActionCard = ({ title, items, icon: Icon, variant = 'default' }: ActionCardProps) => {
    return (
        <div className={`p-5 rounded-2xl border backdrop-blur-sm ${VARIANTS[variant]}`}>
            <div className="flex items-center gap-3 mb-4">
                <Icon className={`w-5 h-5 ${ICON_COLORS[variant]}`} />
                <h3 className="font-bold text-sm uppercase tracking-wide">{title}</h3>
            </div>
            <ul className="space-y-3">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium leading-relaxed opacity-90">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-60 flex-shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};
