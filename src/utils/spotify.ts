export async function searchSpotify(token: string, query: string, type: 'track' | 'artist') {
    const searchQuery = encodeURIComponent(query);
    
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${searchQuery}&type=${type}&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }
  
    return response.json();
  }
  
  