/**
 * Supabase Client Configuration
 * 
 * Browser-safe Supabase client for client-side operations.
 * Uses the anon key which respects RLS policies.
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

export const supabase = createClient()
