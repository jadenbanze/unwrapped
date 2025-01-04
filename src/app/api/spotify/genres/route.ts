import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/config";
import { NextResponse } from "next/server";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function fetchWithRetry(url: string, token: string, retries = 0): Promise<any> {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 429) { // Rate limit
      const retryAfter = response.headers.get('Retry-After') || '1';
      await new Promise(resolve => setTimeout(resolve, parseInt(retryAfter) * 1000));
      return fetchWithRetry(url, token, retries);
    }

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token expired');
      }
      throw new Error(`API responded with status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (retries < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(url, token, retries + 1);
    }
    throw error;
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    
    if (!token) {
      return NextResponse.json({ error: 'No access token found' }, { status: 401 });
    }
    
    const data = await fetchWithRetry(
      'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50',
      token
    );
    
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
  } catch (error: any) {
    console.error('Error in genres route:', error);
    
    if (error.message === 'Token expired') {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch genres', details: error.message },
      { status: 500 }
    );
  }
} 