"use client"
import { motion } from "framer-motion"
import Image from 'next/image'
import { SeasonalTopSong } from '@/types/spotify'
import { useAudioPreview } from "@/hooks/useAudioPreview";

export default function WinterSlide({ song }: { song: SeasonalTopSong }) {
  const searchQuery = song ? `${song.name} ${song.artist}` : '';
  useAudioPreview(searchQuery);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 space-y-6"
      >
        <div className="text-4xl mb-4">❄️</div>
        <h2 className="text-2xl font-bold">Your Winter Anthem</h2>
        
        {song.coverArt && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-48 h-48 mx-auto my-6"
          >
            <Image
              src={song.coverArt}
              alt={song.name}
              fill
              className="rounded-lg object-cover shadow-lg"
            />
          </motion.div>
        )}

        <div className="space-y-2">
          <p className="text-xl font-bold">{song.name}</p>
          <p className="text-md text-muted-foreground">by {song.artist}</p>
          <p className="text-sm text-primary">{song.count} plays</p>
        </div>
      </motion.div>
    </div>
  )
} 