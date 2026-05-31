import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Helper: forward request to backend with user info in trusted headers
async function proxyToBackend(req: NextRequest, method: string, body?: any) {
    const session = await getServerSession(authOptions);
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://localhost:3001';
    const internalSecret = process.env.INTERNAL_API_SECRET || '';

    if (!session?.user?.email) {
        console.warn('Proxy /api/queries: No session found, user is not authenticated');
        return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'x-internal-secret': internalSecret,
        'x-user-email': session.user.email || '',
        'x-user-name': session.user.name || '',
        'x-user-role': (session.user as any).role || 'user',
        'x-user-id': (session.user as any).id || '',
    };

    console.log(`Proxy ${method} /api/queries -> ${backendUrl}/api/queries (user: ${session.user.email})`);

    const res = await fetch(`${backendUrl}/api/queries`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        cache: 'no-store',
    });

    if (!res.ok) {
        const text = await res.text();
        console.error(`Backend /api/queries returned ${res.status}:`, text);
        try {
            const errorData = JSON.parse(text);
            return NextResponse.json(errorData, { status: res.status });
        } catch {
            return NextResponse.json({ success: false, message: `Backend error: ${res.status}` }, { status: res.status });
        }
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}

// GET: Fetch queries for the logged-in user
export async function GET(req: NextRequest) {
    try {
        return await proxyToBackend(req, 'GET');
    } catch (error: any) {
        console.error('Proxy GET /api/queries error:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch queries' }, { status: 500 });
    }
}

// POST: Send a new query message
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        return await proxyToBackend(req, 'POST', body);
    } catch (error: any) {
        console.error('Proxy POST /api/queries error:', error);
        return NextResponse.json({ success: false, message: 'Failed to send query' }, { status: 500 });
    }
}
