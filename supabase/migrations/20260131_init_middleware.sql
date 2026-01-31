-- Create table for Daily Metrics (Physiology + Lifestyle)
create table if not exists daily_metrics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null, -- references auth.users not needed for MVP if using service role for ingestion
  date date not null,
  created_at timestamptz default now(),
  
  -- Sleep Cycle (Source: SleepCycle/Health Connect)
  sleep_quality_score int check (sleep_quality_score between 0 and 100),
  sleep_duration_minutes int,
  wake_time time,
  
  -- Physiology (Source: Samsung Health/Ohealth)
  hrv_rmssd float, -- ms
  resting_heart_rate int, -- bpm
  steps_yesterday int,
  
  -- Nutrition (Source: MyFitnessPal)
  kcal_consumed int,
  protein_consumed_g int,
  
  -- Training Feedback (Source: Notion)
  last_session_rpe int check (last_session_rpe between 1 and 10),
  training_load_volume int, -- kg total
  
  -- Calculated Fields
  readiness_score float check (readiness_score between 0 and 100),
  decision_flag text, -- 'GREEN', 'YELLOW', 'RED', 'FLAG_NUTRITION', 'FLAG_INTERFERENCE'
  
  unique(user_id, date)
);

-- Create table for Interference Logs (Concurrent Training)
create table if not exists interference_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  activity_type text, -- 'RUNNING', 'CYCLING'
  duration_minutes int,
  end_time timestamptz not null,
  intensity_zone text -- 'Z2', 'Z4'
);

-- Create indexes for performance
create index idx_daily_metrics_date on daily_metrics(date);
create index idx_interference_logs_end_time on interference_logs(end_time);
