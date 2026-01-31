# Changelog - Elite Fitness Tracker MVP

## [0.1.0] - 2026-01-31

### Added
- **Prisma Schema** (`prisma/schema.prisma`)
  - 9 entidades core: User, Profile, Plan, SessionTemplate, WorkoutLog, Exercise, SetLog, CheckInWeekly, MetricDaily, Media
  - Enums: GoalType, ExperienceLevel, PlanType, SessionType, ExerciseCategory, SetType, MediaType, PoseType
  - Campos calculados: weight_7d_avg, readinessScore, adherenceScore, deloadRecommended

- **Supabase Integration**
  - `src/lib/supabase/client.ts` - Browser client
  - `src/lib/supabase/server.ts` - Server Components client
  - `src/lib/supabase/middleware.ts` - Session refresh
  - `src/middleware.ts` - Route protection

- **Security**
  - `supabase/rls-policies.sql` - RLS policies para todas las tablas
  - Storage policies documentadas para bucket `progress-media`

- **Configuration**
  - `.env.local.example` - Template con placeholders
  - `prisma/prisma.config.ts` - Prisma v7 config

### Decisions
- **Prisma v7**: Nueva estructura de config con `prisma.config.ts` en lugar de URLs en schema
- **RLS by user_id**: Todas las tablas de datos personales filtran por `auth.uid() = user_id`
- **Session templates**: Separación entre plan (template) y ejecución (log) para flexibilidad

### Next
- Conectar Supabase y ejecutar primera migración
- Seed de ejercicios básicos
