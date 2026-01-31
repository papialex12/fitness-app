# 🗺️ PLAN: Fitness App MVP (Perihelion Star)

## Estado Actual
- Análisis preliminar de datos de entrenamiento disponible en `REPORT.md`.
- Estructura del agente inicializada.
- Pendiente: Elección de stack específico y primeras vistas del MVP.

### ✅ M1: Foundation (Auth + DB) - Semana 1
- [x] **Andamiaje del Proyecto**: Carpetas y `PLAN.md`
- [x] **Configuración Next.js**: Next.js 15, Tailwind v4, Shadcn/UI
- [x] **Prisma Schema**: 9 entidades Base
- [x] **Supabase Client**: Auth & RLS configurado

### ✅ M2: Diagnosis Module (Gemelo Digital) - COMPLETED
*El "Missing Link" Biomecánico.*
- [x] **Prisma Schema Update**: Entidades `Assessment` y `MobilityProfile`.
- [x] **UI "Digital Twin"**: Gráfico de Araña (Capacidades) + Heatmap Corporal (InjuryMatrix).
- [x] **Ingesta de Datos**: Tests Biomecánicos (Thomas, Ankle, Femur/Torso) & Engine Logic.
- [x] **Capa 1 (Filtro Estructural)**: Reglas estáticas (ej: "No Sentadilla Profunda si Acortamiento").

### ✅ M3: Workout Logging (Smart Logger) - COMPLETED
- [x] API `/api/workout` (CRUD sesiones y sets).
- [x] **Capa 3 (Autorregulación)**: Feedback intra-sesión (RPE > Target → Bajar carga).
- [x] UI: Logging rápido de series (WorkoutSession).
- [x] **Localization**: Fully translated to Spanish.

### 🚀 M4: Analytics & Progress - NEXT PRIORITY

### 🔲 M5: Check-in & Readiness (Biomarkers)
- [x] Formulario check-in semanal.
- [ ] **Capa 2 (Readiness)**: Filtro diario. (Sueño < 6h → Ajuste Volumen).
- [ ] Semáforo de Interferencia (Reloj AMPK/mTOR).

### 🔲 M6: Export & Polish
- [ ] Export CSV/XLSX.
- [ ] Upload fotos de progreso.8n.
