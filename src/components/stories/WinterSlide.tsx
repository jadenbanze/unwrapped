"use client"
import { motion } from "framer-motion"
import Image from 'next/image'
import { SeasonalTopSong } from '@/types/spotify'
import { useAudioPreview } from "@/hooks/useAudioPreview";

export default function WinterSlide({ song }: { song: SeasonalTopSong }) {
  const searchQuery = song ? `${song.name} ${song.artist}` : '';
  useAudioPreview(searchQuery);

  const titleWords = "Your Winter Anthem ❄️".split(" ");

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      {/* Geometric Background - snowflake-like patterns */}
      <motion.div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-primary/10"
            style={{
              width: `${Math.random() * 15 + 10}px`,
              height: `${Math.random() * 15 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: '50%',
            }}
            animate={{
              y: [0, 200],
              scale: [1, Math.random() * 0.5 + 0.5],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 space-y-6"
      >
        <div className="flex gap-2 justify-center flex-wrap mb-4">
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