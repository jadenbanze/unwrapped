interface SpotifyTrack {
    endTime: string;
    artistName: string;
    trackName: string;
    msPlayed: number;
  }
  
  interface ProcessedData {
    topArtists: { name: string; count: number; image?: string }[];
    topSongs: { 
      name: string;
      artist: string;
      count: number;
      msPlayed: number;
      playCount: number;
      firstListenDate: string;
      coverArt?: string;
    }[];
    totalMinutesPlayed: number;
    totalSongsPlayed: number;
    totalUniqueSongs: number;
    topGenres: string[];
    morningFavorite: { name: string; artist: string; count: number };
    nightFavorite: { name: string; artist: string; count: number };
    seasonalTopSongs: { name: string; artist: string; count: number; season: 'Spring' | 'Summer' | 'Fall' | 'Winter' }[];
    topListeningMonth: { name: string; minutes: number };
    mostRepeatedInDay: { name: string; artist: string; date: string; count: number };
    bingeHour: { hour: Date; count: number };
    topArtistsByTime: { name: string; msPlayed: number; percentage: number }[];
    newDiscoveries: { name: string; artist: string; date: Date; coverArt?: string }[];
    streamingHistory: any[];
  }
  
  function getSeasonFromMonth(month: number): 'Spring' | 'Summer' | 'Fall' | 'Winter' {
    if (month >= 3 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Fall';
    return 'Winter';
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
  
    // Process seasonal top songs
    const seasonalSongs: Record<string, { [key: string]: number }> = {
      Spring: {},
      Summer: {},
      Fall: {},
      Winter: {},
    };
  
    allTracks.forEach((track) => {
      const date = new Date(track.endTime);
      const season = getSeasonFromMonth(date.getMonth());
      const songKey = `${track.trackName}|||${track.artistName}`;
      
      seasonalSongs[season][songKey] = (seasonalSongs[season][songKey] || 0) + 1;
    });
  
    const topSeasonalSongs = Object.entries(seasonalSongs).map(([season, songs]) => {
      const topSong = Object.entries(songs)
        .sort(([, a], [, b]) => b - a)[0];
      
      if (!topSong) return null;
  
      const [songInfo, count] = topSong;
      const [name, artist] = songInfo.split('|||');
  
      return {
        name,
        artist,
        count,
        season: season as 'Spring' | 'Summer' | 'Fall' | 'Winter'
      };
    }).filter((song): song is { name: string; artist: string; count: number; season: 'Spring' | 'Summer' | 'Fall' | 'Winter' } => song !== null);
  
    // Add to your existing calculations
    const monthlyListening = allTracks.reduce((acc, track) => {
      const month = new Date(track.endTime).getMonth();
      acc[month] = (acc[month] || 0) + track.msPlayed;
      return acc;
    }, {} as Record<number, number>);
  
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const topMonth = Object.entries(monthlyListening)
      .sort(([, a], [, b]) => b - a)[0];
  
    const topListeningMonth = {
      name: monthNames[Number(topMonth[0])],
      minutes: Math.round(topMonth[1] / (1000 * 60))
    };
  
    // Most repeated song in a single day
    const songsByDay = allTracks.reduce((acc, track) => {
      const day = new Date(track.endTime).toDateString();
      const key = `${track.trackName}|||${track.artistName}|||${day}`;
      acc[key] = {
        name: track.trackName,
        artist: track.artistName,
        date: day,
        count: (acc[key]?.count || 0) + 1
      };
      return acc;
    }, {} as Record<string, { name: string; artist: string; date: string; count: number }>);
  
    const mostRepeatedInDay = Object.values(songsByDay)
      .sort((a, b) => b.count - a.count)[0];
  
    // Binge listening (most songs in an hour)
    const songsByHour = allTracks.reduce((acc, track) => {
      const hourDate = new Date(track.endTime);
      const hourKey = hourDate.toISOString().slice(0, 13);
      
      acc[hourKey] = {
        hour: hourDate,
        count: (acc[hourKey]?.count || 0) + 1
      };
      return acc;
    }, {} as Record<string, { hour: Date; count: number }>);
  
    const bingeHour = Object.values(songsByHour)
      .sort((a, b) => b.count - a.count)[0];
  
    // Artist loyalty (% of total listening time)
    const artistTimeShare = allTracks.reduce((acc, track) => {
      acc[track.artistName] = {
        name: track.artistName,
        msPlayed: (acc[track.artistName]?.msPlayed || 0) + track.msPlayed,
      };
      return acc;
    }, {} as Record<string, { name: string; msPlayed: number; image?: string }>);
  
    const topArtistsByTime = Object.values(artistTimeShare)
      .map(artist => ({
        ...artist,
        percentage: (artist.msPlayed / totalMsPlayed) * 100
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);
  
    // New vs Familiar
    const firstListens = allTracks.reduce((acc, track) => {
      const key = `${track.trackName}|||${track.artistName}`;
      if (!acc[key]) {
        acc[key] = {
          name: track.trackName,
          artist: track.artistName,
          date: new Date(track.endTime),
        };
      }
      return acc;
    }, {} as Record<string, { name: string; artist: string; date: Date; coverArt?: string }>);
  
    const newDiscoveries = Object.values(firstListens)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
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
      seasonalTopSongs: topSeasonalSongs,
      topListeningMonth,
      mostRepeatedInDay,
      bingeHour,
      topArtistsByTime,
      newDiscoveries,
      streamingHistory: allTracks,
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
  
  // Add this function to get a random track
  export const getRandomTrack = (streamingHistory: any[]) => {
    if (!streamingHistory?.length) return null;
    const randomTrack = streamingHistory[Math.floor(Math.random() * streamingHistory.length)];
    return {
      trackName: randomTrack.trackName,
      artistName: randomTrack.artistName
    };
  };
  
  