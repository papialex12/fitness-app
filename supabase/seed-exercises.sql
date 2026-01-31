-- ============================================
-- ELITE FITNESS TRACKER - Exercise Library Seed
-- ============================================
-- Run this SQL in Supabase SQL Editor
-- This populates the basic exercise library for the MVP
-- ============================================

INSERT INTO exercises (id, name, category, muscle_groups, default_rest_sec, default_rir_min, default_rir_max, is_custom, created_at, updated_at)
VALUES
-- PECHO
(gen_random_uuid(), 'Press de Banca plano con barra', 'COMPOUND', ARRAY['Chest', 'Triceps', 'Front Delts'], 180, 1, 3, false, NOW(), NOW()),
(gen_random_uuid(), 'Press Inclinado con mancuernas', 'COMPOUND', ARRAY['Upper Chest', 'Front Delts', 'Triceps'], 120, 1, 2, false, NOW(), NOW()),
(gen_random_uuid(), 'Cruce de poleas desde abajo', 'ISOLATION', ARRAY['Chest'], 60, 0, 1, false, NOW(), NOW()),

-- ESPALDA
(gen_random_uuid(), 'Dominadas lastradas', 'COMPOUND', ARRAY['Lats', 'Biceps', 'Upper Back'], 180, 1, 2, false, NOW(), NOW()),
(gen_random_uuid(), 'Remo con barra (Bent over row)', 'COMPOUND', ARRAY['Upper Back', 'Lats', 'Rear Delts', 'Erectors'], 120, 1, 3, false, NOW(), NOW()),
(gen_random_uuid(), 'Jalón al pecho agarre neutro', 'ISOLATION', ARRAY['Lats', 'Biceps'], 90, 1, 2, false, NOW(), NOW()),

-- PIERNA
(gen_random_uuid(), 'Sentadilla con barra (Back Squat)', 'COMPOUND', ARRAY['Quads', 'Glutes', 'Adductors', 'Erectors'], 240, 1, 3, false, NOW(), NOW()),
(gen_random_uuid(), 'Peso Muerto Rumano con barra', 'COMPOUND', ARRAY['Hamstrings', 'Glutes', 'Erectors'], 180, 2, 4, false, NOW(), NOW()),
(gen_random_uuid(), 'Prensa de piernas 45°', 'MACHINE', ARRAY['Quads', 'Glutes'], 120, 1, 2, false, NOW(), NOW()),
(gen_random_uuid(), 'Leg Extension (Extensiones de cuadríceps)', 'ISOLATION', ARRAY['Quads'], 90, 0, 1, false, NOW(), NOW()),

-- HOMBRO
(gen_random_uuid(), 'Press Militar de pie con barra', 'COMPOUND', ARRAY['Shoulders', 'Triceps', 'Core'], 180, 1, 3, false, NOW(), NOW()),
(gen_random_uuid(), 'Elevaciones laterales con mancuernas', 'ISOLATION', ARRAY['Side Delts'], 60, 0, 1, false, NOW(), NOW()),

-- BRAZOS
(gen_random_uuid(), 'Curl de bíceps con barra Z', 'ISOLATION', ARRAY['Biceps'], 90, 1, 2, false, NOW(), NOW()),
(gen_random_uuid(), 'Extensiones de tríceps en polea alta (cuerda)', 'ISOLATION', ARRAY['Triceps'], 90, 0, 1, false, NOW(), NOW())

ON CONFLICT (name) DO NOTHING; -- Omit if 'name' is not unique yet, but good practice
