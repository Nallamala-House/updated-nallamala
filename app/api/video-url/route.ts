import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

const FALLBACK_VIDEO_URL = 'https://cdn.pixabay.com/video/2024/03/03/202844-919000222_large.mp4';

export async function GET() {
    try {
        console.log('Returning active fallback stock video URL...');
        return NextResponse.json({ url: FALLBACK_VIDEO_URL });
    } catch (error: any) {
        console.error('Error in video-url API:', error);
        return NextResponse.json({
            url: FALLBACK_VIDEO_URL,
            error: error.message
        });
    }
}
