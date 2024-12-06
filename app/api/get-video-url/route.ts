import { NextRequest, NextResponse } from 'next/server'
import { list } from '@vercel/blob'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const videoName = request.nextUrl.searchParams.get('video')

    if (!videoName) {
      return NextResponse.json({ error: 'Video name is required' }, { status: 400 })
    }

    const videoMap: { [key: string]: string } = {
      'hero': 'HeroVideo',
      'testimonial': 'CampusFoundersTestimonial'
    }

    const prefix = videoMap[videoName]
    if (!prefix) {
      return NextResponse.json({ error: 'Invalid video name' }, { status: 400 })
    }

    const { blobs } = await list({
      prefix: prefix,
      limit: 1,
    })

    if (blobs.length === 0) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    const videoUrl = blobs[0].url

    return NextResponse.json({ url: videoUrl })
  } catch (error) {
    console.error('Error fetching video URL:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}