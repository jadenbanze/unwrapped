import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/config';
import { getServerSession } from 'next-auth';
import { searchSpotify } from '@/utils/spotify'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items } = await req.json();
    const results = await Promise.all(items.map(async (item: { type: 'track' | 'artist', name: string, artist?: string }) => {
      try {
        const searchQuery = item.type === 'track' 
          ? `${item.name} artist:${item.artist}` 
          : item.name;
        
        const accessToken = session.accessToken as string | undefined;

        if (!accessToken) {
          console.error('No access token available for metadata fetch');
          return { name: item.name, coverArt: '', image: '' };
        }

        try {
          const data = await searchSpotify(accessToken, searchQuery, item.type);
          
          if (item.type === 'track' && data.tracks?.items?.[0]) {
            const track = data.tracks.items[0];
            const albumImage = track.album?.images?.[0]?.url;
            return {
              name: item.name,
              artist: item.artist,
              coverArt: albumImage || '',
            };
          } else if (item.type === 'artist' && data.artists?.items?.[0]) {
            const artistData = data.artists.items[0];
            const artistImage = artistData.images?.[0]?.url;
            return {
              name: item.name,
              image: artistImage || '',
            };
          }
          return { name: item.name, coverArt: '', image: '' };
        } catch (error) {
          console.error(`Error fetching metadata for ${item.name}:`, error);
          return { name: item.name, coverArt: '', image: '' };
        }
      } catch (error) {
        console.error(`Error fetching metadata for ${item.name}:`, error);
        return { name: item.name, coverArt: '', image: '' };
      }
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

