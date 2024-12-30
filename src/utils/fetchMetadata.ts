export async function fetchMetadata(items: { type: 'track' | 'artist', name: string, artist?: string }[]) {
    const response = await fetch('/api/spotify/metadata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch metadata');
    }
  
    const data = await response.json();
    return data.results;
  }
  
  