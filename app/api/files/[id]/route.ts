import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://localhost:3001';

        const res = await fetch(`${backendUrl}/api/files/${id}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            return new NextResponse('File not found', { status: res.status });
        }

        const contentType = res.headers.get('content-type') || 'application/octet-stream';
        const contentDisposition = res.headers.get('content-disposition') || '';
        const buffer = await res.arrayBuffer();

        return new NextResponse(Buffer.from(buffer), {
            status: 200,
            headers: {
                'Content-Type': contentType,
                ...(contentDisposition && { 'Content-Disposition': contentDisposition }),
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error: any) {
        console.error('Proxy GET /api/files/[id] error:', error);
        return new NextResponse('Failed to fetch file', { status: 500 });
    }
}
