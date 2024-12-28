interface SpotifyTrack {
    endTime: string;
    artistName: string;
    trackName: string;
    msPlayed: number;
  }
  
  interface ProcessedData {
    topArtists: { name: string; count: number }[];
    topSongs: { 
      name: string;
      artist: string;
      count: number;
      msPlayed: number;
      playCount: number;
      firstListenDate: string;
    }[];
    totalMinutesPlayed: number;
    totalSongsPlayed: number;
    totalUniqueSongs: number;
    topGenres: string[];
    morningFavorite: { name: string; artist: string; count: number };
    nightFavorite: { name: string; artist: string; count: number };
  }
  
  export function processSpotifyData(tracks: SpotifyTrack[]): ProcessedData {
    // Sort all tracks by date
    const allTracks = tracks.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());
  
    // Track both play count and duration for artists
    const artistStats = new Map<string, { count: number; msPlayed: number; score: number }>();
    const songPlayCounts = new Map<string, {
      name: string;
      artist: string;
      count: number;
      msPlayed: number;
      firstListenDate: string;
    }>();
    const uniqueSongs = new Set<string>();
    let totalSongsPlayed = 0;
    let totalMsPlayed = 0;
  
    // Process each track
    allTracks.forEach(track => {
      if (track.msPlayed >= 30000) {
        totalSongsPlayed++;
        // Update artist stats
        const stats = artistStats.get(track.artistName) || { count: 0, msPlayed: 0, score: 0 };
        stats.count += 1;
        stats.msPlayed += track.msPlayed;
        // Score = plays * 10000 + milliseconds (to weight both factors)
        stats.score = stats.count * 10000 + stats.msPlayed;
        artistStats.set(track.artistName, stats);
      }
      totalMsPlayed += track.msPlayed;
  
      // Track unique songs
      uniqueSongs.add(track.trackName);
  
      // Update song play counts
      const songKey = track.trackName;
      const existingSong = songPlayCounts.get(songKey);
  
      if (existingSong) {
        existingSong.count += 1;
        existingSong.msPlayed += track.msPlayed;
      } else {
        songPlayCounts.set(songKey, {
          name: track.trackName,
          artist: track.artistName,
          count: 1,
          msPlayed: track.msPlayed,
          firstListenDate: new Date(track.endTime).toLocaleDateString('en-US')
        });
      }
    });
  
    // Get top artists sorted by score
    const topArtists = Array.from(artistStats.entries())
      .map(([name, stats]) => ({ 
        name, 
        count: stats.count,
        msPlayed: stats.msPlayed,
        score: stats.score 
      }))
      .sort((a, b) => b.score - a.score)
      .map(({ name, count }) => ({ name, count }))
      .slice(0, 5);
  
    // Return the processed data
    return {
      topArtists,
      topSongs: Array.from(songPlayCounts.values())
        .sort((a, b) => b.count - a.count)
        .map(song => ({
          ...song,
          playCount: song.count
        }))
        .slice(0, 5),
      totalMinutesPlayed: Math.floor(totalMsPlayed / (1000 * 60)),
      totalSongsPlayed,
      totalUniqueSongs: uniqueSongs.size, // This now reflects unique songs over 30 seconds
      topGenres: [], // Ignoring genres for now
      morningFavorite: getMostPlayed(allTracks.filter(track => {
        const hour = new Date(track.endTime).getHours();
        return hour >= 5 && hour < 12;
      })),
      nightFavorite: getMostPlayed(allTracks.filter(track => new Date(track.endTime).getHours() >= 20 || new Date(track.endTime).getHours() < 5)),
    };
  }
  
  function getMostPlayed(tracks: SpotifyTrack[]): { name: string; artist: string; count: number } {
    const songCounts = new Map<string, { name: string; artist: string; count: number }>();
  
    tracks.forEach(track => {
      const songKey = `${track.trackName}-${track.artistName}`;
      const existing = songCounts.get(songKey);
  
      if (existing) {
        existing.count += 1;
      } else {
        songCounts.set(songKey, {
          name: track.trackName,
          artist: track.artistName,
          count: 1
        });
      }
    });
  
    const mostPlayed = Array.from(songCounts.values())
      .sort((a, b) => b.count - a.count)[0];
  
    return mostPlayed || { name: '', artist: '', count: 0 };
  }
  
  