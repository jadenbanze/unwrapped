"use client"
import { motion } from "framer-motion"
import { Crown } from "lucide-react"
import Image from "next/image"
import { useMemo } from "react";
import { useAudioPreview } from "@/hooks/useAudioPreview";

export interface ArtistLoyaltyProps {
  artists: Array<{
    name: string;
    percentage: number;
    image?: string;
  }>;
  streamingHistory: any[];
}

export default function ArtistLoyaltySlide({ artists, streamingHistory }: ArtistLoyaltyProps) {
  const searchQuery = useMemo(() => {
    if (!streamingHistory?.length) return '';
    const randomTrack = streamingHistory[Math.floor(Math.random() * streamingHistory.length)];
    // Ensure we have both track name and artist name from the structure
    if (!randomTrack?.endTime || !randomTrack?.artistName || !randomTrack?.trackName) return '';
    
    // Debug information
    console.log('Selected Track:', {
      name: randomTrack.trackName,
      artist: randomTrack.artistName,
      time: randomTrack.endTime
    });

    return `${randomTrack.trackName} ${randomTrack.artistName}`;
  }, []); 

  useAudioPreview(searchQuery);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 space-y-8"
      >
        <h2 className="text-2xl font-bold">Your Most Loyal Listens</h2>
        
        {artists.map((artist, index) => (
          <motion.div
            key={artist.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center gap-4"
          >
            {artist.image ? (
              <Image
                src={artist.image}
                alt={artist.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <Crown className="w-12 h-12 text-primary" />
            )}
            <div className="text-left">
              <p className="font-bold">{artist.name}</p>
              <p className="text-sm text-primary">
                {artist.percentage.toFixed(1)}% of your time
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
} 