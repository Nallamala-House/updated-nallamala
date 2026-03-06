import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Helper: forward request to backend with user info in trusted headers
async function proxyToBackend(req: NextRequest, method: string, body?: any) {
    const session = await getServerSession(authOptions);
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://localhost:3001';
    const internalSecret = process.env.INTERNAL_API_SECRET || '';

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-Internal-Secret': internalSecret,
    };

    if (session?.user) {
        headers['X-User-Email'] = session.user.email || '';
        headers['X-User-Name'] = session.user.name || '';
        headers['X-User-Role'] = (session.user as any).role || 'user';
        headers['X-User-Id'] = (session.user as any).id || '';
    }

    const res = await fetch(`${backendUrl}/api/queries`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

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
