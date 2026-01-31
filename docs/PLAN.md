# PLAN.md - MasterMind Fitness (Elite Tracker MVP)

> **Meta:** Construir la mejor aplicación de programación de pérdida de grasa del mundo, basada en datos científicos e hiper-personalizada.
> **Estado:** Fase 1 (M1 Foundation) - En progreso

---

## 📍 Hoja de Ruta (Roadmap)

### ✅ M1: Foundation (Auth + DB) - Semana 1
- [x] **Andamiaje del Proyecto**: Carpetas y `PLAN.md`
- [x] **Configuración Next.js**: Next.js 15, Tailwind v4, Shadcn/UI
- [x] **Prisma Schema**: 9 entidades (User, Profile, Plan, SessionTemplate, WorkoutLog, Exercise, SetLog, CheckInWeekly, MetricDaily, Media)
- [x] **Supabase Client**: browser + server + middleware
- [x] **RLS Policies SQL**: Seguridad para todas las tablas
- [ ] **Conectar Supabase**: Copiar credenciales a `.env.local`
- [ ] **Migración DB**: `npx prisma db push`
- [ ] **Aplicar RLS**: Ejecutar `supabase/rls-policies.sql`

### 🔲 M2: Workout Logging - Semana 2
- [ ] Seed de ejercicios (biblioteca base)
- [ ] API `/api/workout` (CRUD sesiones y sets)
- [ ] UI: Logging rápido de series

### 🔲 M3: Check-in + Rule Engine - Semana 3
- [ ] Formulario check-in semanal
- [ ] Rule Engine v0 (5 reglas core)
- [ ] Dashboard semanal con widgets

### 🔲 M4: Exportables - Semana 4
- [ ] Export CSV/XLSX
- [ ] Informe PDF semanal

### 🔲 M5: Media + Polish - Semana 5
- [ ] Upload fotos de progreso
- [ ] Timeline visual
- [ ] Testing E2E

---

## 🛠️ Stack Técnico

| Componente | Tecnología |
|------------|------------|
| Framework  | Next.js 15 (App Router) |
| Styling    | Tailwind CSS v4 |
| UI Components | Shadcn/UI |
| Auth       | Supabase Auth (email) |
| Database   | Supabase Postgres |
| ORM        | Prisma |
| Storage    | Supabase Storage |
| Hosting    | Vercel |

---

## 📂 Estructura de Archivos Clave

```
prisma/
├── schema.prisma       # 9 entidades MVP
└── prisma.config.ts    # Config Prisma v7

src/
├── lib/
│   ├── prisma.ts       # Prisma client singleton
│   └── supabase/
│       ├── client.ts   # Browser client
│       ├── server.ts   # Server client
│       └── middleware.ts
├── middleware.ts       # Auth protection

supabase/
└── rls-policies.sql    # RLS policies para todas las tablas
```

---

## ⚠️ Próximo Paso (Acción Requerida)

1. Crear proyecto en [Supabase](https://supabase.com)
2. Copiar `.env.local.example` → `.env.local`
3. Rellenar credenciales de Supabase
4. Ejecutar: `npx prisma db push`
5. Ejecutar RLS en Supabase SQL Editor
