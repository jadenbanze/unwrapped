import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    
    if (!token) {
      throw new Error('No access token found');
    }
    
    // Get user's top artists from the last 6 months
    const response = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch top artists');
    }

    const data = await response.json();
    
    // Extract and count genres
    const genreCounts = data.items.reduce((acc: { [key: string]: number }, artist: any) => {
      artist.genres.forEach((genre: string) => {
        acc[genre] = (acc[genre] || 0) + 1;
      });
      return acc;
    }, {});

    // Sort genres by count and get top 5
    const topGenres = Object.entries(genreCounts)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([genre]) => genre);

    return NextResponse.json({ genres: topGenres });
  } catch (error) {
    console.error('Error fetching genres:', error);
    return NextResponse.json({ error: 'Failed to fetch genres' }, { status: 500 });
  }
} 