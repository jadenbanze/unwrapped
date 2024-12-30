"use client"
import { motion } from "framer-motion"
import Image from 'next/image'
import { SeasonalTopSong } from '@/types/spotify'
import { useAudioPreview } from '@/hooks/useAudioPreview'

const heatWaves = Array.from({ length: 8 });

export default function SummerSlide({ song }: { song: SeasonalTopSong }) {
  const searchQuery = song ? `${song.name} ${song.artist}` : '';
  useAudioPreview(searchQuery);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Animated sun rays */}
      {heatWaves.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-32 bg-gradient-to-t from-orange-200/10 to-transparent"
          initial={{
            y: "100%",
            opacity: 0
          }}
          animate={{
            y: ["-20%", "-100%"],
            opacity: [0, 0.2, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1
          }}
          style={{
            left: `${(i / 8) * 100}%`,
            width: "200%"
          }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 space-y-6"
      >
        <div className="text-4xl mb-4">☀️</div>
        <h2 className="text-2xl font-bold">Your Summer Anthem</h2>
        
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