import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    
    // Search Deezer for the track
    const searchResponse = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=10`
    );

    if (!searchResponse.ok) {
      console.error('Deezer API error:', await searchResponse.text());
      return NextResponse.json(
        { error: "API error" },
        { status: searchResponse.status }
      );
    }

    const data = await searchResponse.json();
    const track = data.data?.[0]; // Get first result
    
    if (!track?.preview) {
      console.log('No preview available for query:', query);
      return NextResponse.json(
        { error: "No preview available" },
        { status: 404 }
      );
    }

    console.log('Found preview for:', track.title, 'by', track.artist.name);
    
    return NextResponse.json({
      previewUrl: track.preview,
      trackName: track.title,
      artistName: track.artist.name
    });

  } catch (error) {
    console.error('Preview route error:', error);
    return NextResponse.json(
      { error: "Failed to fetch preview" },
      { status: 500 }
    );
  }
} 