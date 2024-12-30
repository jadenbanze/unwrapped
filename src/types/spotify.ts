export interface SeasonalTopSong {
  name: string;
  artist: string;
  count: number;
  coverArt?: string;
  season: 'Spring' | 'Summer' | 'Fall' | 'Winter';
} 

export interface ProcessedData {
  topListeningMonth: {
    name: string;
    minutes: number;
  };
  mostRepeatedInDay: { name: string; artist: string; date: string; count: number };
  bingeHour: { hour: Date; count: number };
  topArtistsByTime: Array<{ name: string; msPlayed: number; percentage: number; image?: string }>;
  newDiscoveries: Array<{ name: string; artist: string; date: Date; coverArt?: string }>;
} 