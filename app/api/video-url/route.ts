import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const token = process.env.BLOB_READ_WRITE_TOKEN;

        if (!token) {
            console.warn('BLOB_READ_WRITE_TOKEN is missing. Returning fallback URL.');
            return NextResponse.json({
                url: 'https://zoamjyrqlfze4djm.public.blob.vercel-storage.com',
                message: 'No blob token configured'
            });
        }

        console.log('Fetching video URL from Vercel Blob...');

        // List blobs to find the video
        const { blobs } = await list({
            prefix: 'Landing_Video',
            limit: 1,
        });

        if (blobs.length > 0) {
            console.log('Found blob:', blobs[0].pathname);
            return NextResponse.json({ url: blobs[0].url });
        }

        console.warn('No blob found with prefix Landing_Video, falling back.');
        // Fallback if no blob found
        return NextResponse.json({
            url: 'https://zoamjyrqlfze4djm.public.blob.vercel-storage.com',
            message: 'No blob found with prefix Landing_Video'
        });
    } catch (error: any) {
        console.error('Error in video-url API:', error);
        return NextResponse.json({
            url: 'https://zoamjyrqlfze4djm.public.blob.vercel-storage.com',
            error: error.message
        });
    }
}
