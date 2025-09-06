import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { success: 0, error: 'No URL provided' }
      );
    }

    const response = await fetch(url);
    const html = await response.text();
    
    // Basic meta tag extraction
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
    const imageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);

    return NextResponse.json({
      success: 1,
      meta: {
        title: titleMatch ? titleMatch[1] : url,
        description: descriptionMatch ? descriptionMatch[1] : '',
        image: {
          url: imageMatch ? imageMatch[1] : ''
        }
      }
    });

  } catch (error) {
    console.error('URL fetch error:', error);
    return NextResponse.json({
      success: 0,
      error: 'Failed to fetch URL data'
    });
  }
}