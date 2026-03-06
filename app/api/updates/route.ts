import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://localhost:3001';

        const res = await fetch(`${backendUrl}/api/updates`, {
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error: any) {
        console.error('Proxy GET /api/updates error:', error);
        return NextResponse.json({ success: false, data: [], message: 'Failed to fetch updates' }, { status: 500 });
    }
}
