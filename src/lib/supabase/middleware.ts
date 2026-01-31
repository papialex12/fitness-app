/**
 * Supabase Middleware Client
 * 
 * Used to refresh auth tokens in middleware.
 */

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    console.log('Middleware: Checking Supabase Env Vars');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Middleware: Missing Supabase Environment Variables!');
        return supabaseResponse; // Skip auth refresh if config is missing to avoid crash
    }

    const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Redirect unauthenticated users to login (except public routes)
    const publicPaths = ['/', '/login', '/signup', '/auth/callback', '/workout/demo', '/dashboard', '/dashboard/diagnosis', '/dashboard/check-in']
    const isPublicPath = publicPaths.some(path => request.nextUrl.pathname === path)

    if (!user && !isPublicPath && !request.nextUrl.pathname.startsWith('/api/auth')) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}
