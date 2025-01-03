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
    if (!streamingHistory?.length || !artists?.length) return '';
    const artistTracks = streamingHistory.filter(track => 
      artists.some(artist => track.artistName?.toLowerCase() === artist.name?.toLowerCase())
    );
    if (!artistTracks.length) return '';
    const randomTrack = artistTracks[Math.floor(Math.random() * artistTracks.length)];
    return `${randomTrack.trackName} ${randomTrack.artistName}`;
  }, [artists, streamingHistory]);

  const backgroundShapes = useMemo(() => 
    Array.from({ length: 12 }).map(() => ({
      size: Math.random() * 80 + 40,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    })), []
  );

  useAudioPreview(searchQuery);

  const titleWords = "Your Most Loyal Listens".split(" ");

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      {/* Animated Background */}
      <motion.div className="absolute inset-0 overflow-hidden">
        {backgroundShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/10"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.left,
              top: shape.top,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div className="z-10 space-y-8">
        <div className="flex gap-2 justify-center flex-wrap mb-8">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.2,
                duration: 0.3
              }}
              className="text-2xl font-bold"
            >
              {word}
            </motion.span>
          ))}
        </div>
        
        {artists.map((artist, index) => (
          <motion.div
            key={artist.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: titleWords.length * 0.2 + index * 0.2 }}
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
              <motion.p 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: titleWords.length * 0.2 + index * 0.2 + 0.1 }}
                className="font-bold"
              >
                {artist.name}
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: titleWords.length * 0.2 + index * 0.2 + 0.2 }}
                className="text-sm text-primary"
              >
                {artist.percentage.toFixed(1)}% of your time
              </motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 