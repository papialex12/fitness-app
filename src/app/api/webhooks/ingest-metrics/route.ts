import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { calculateReadiness, DailyMetrics } from '@/lib/engine/readiness';

// Initialize Supabase Client (Service Role for Ingestion)
export const dynamic = 'force-dynamic';

// Initialize Supabase Client (Service Role for Ingestion)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Lazy initialization or null check
const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Check Source (Basic Auth via Header or Body)
        if (body.source !== 'n8n_aggregator') {
            return NextResponse.json({ error: 'Unauthorized Source' }, { status: 401 });
        }

        const { date, sleep, physiology, nutrition } = body.data;

        // 1. Prepare Metrics Object for Engine
        const metrics: DailyMetrics = {
            sleep_quality_score: sleep.quality,
            sleep_duration_minutes: sleep.duration,
            hrv_rmssd: physiology.hrv,
            kcal_consumed: nutrition.calories,
            // last_session_rpe: notion.rpe // TODO: Add Notion input in n8n payload
        };

        // 2. Run Decision Engine
        const decision = calculateReadiness(metrics);

        // 3. Upsert into Supabase
        // We assume user_id is passed or handled via email lookup. 
        // For MVP, we might hardcode a single user or pass user_id/email in payload.
        // Here assuming payload has user_email

        // Find User (Optional MVP step, skipping for brevity, using placeholder ID if not provided)
        // const { data: user } = await supabase.from('auth.users').select('id').eq('email', body.user_email).single();

        const payload = {
            user_id: body.user_id, // Passed from n8n (mapped from email)
            date: date,
            sleep_quality_score: metrics.sleep_quality_score,
            sleep_duration_minutes: metrics.sleep_duration_minutes,
            hrv_rmssd: metrics.hrv_rmssd,
            kcal_consumed: metrics.kcal_consumed,
            readiness_score: decision.score,
            decision_flag: decision.status
        };

        if (!supabase) {
            console.error('Supabase not initialized');
            return NextResponse.json({ error: 'Configuration Error' }, { status: 500 });
        }

        const { error } = await supabase
            .from('daily_metrics')
            .upsert(payload, { onConflict: 'user_id, date' });

        if (error) {
            console.error('Supabase Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            decision: decision
        });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
