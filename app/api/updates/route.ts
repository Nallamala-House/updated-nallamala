import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://localhost:3001';
        const internalSecret = process.env.INTERNAL_API_SECRET || '';

        const res = await fetch(`${backendUrl}/api/updates`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Internal-Secret': internalSecret,
            },
            cache: 'no-store',
            next: { revalidate: 0 },
        });

        if (!res.ok) {
            console.error('Backend /api/updates returned status:', res.status);
            const text = await res.text();
            console.error('Backend response body:', text);
            return NextResponse.json({ success: false, data: [], message: `Backend error: ${res.status}` }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data, {
            status: res.status,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
            },
        });
    } catch (error: any) {
        console.error('Proxy GET /api/updates error:', error);
        return NextResponse.json({ success: false, data: [], message: 'Failed to fetch updates' }, { status: 500 });
    }
}
