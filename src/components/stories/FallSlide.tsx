"use client"
import { motion } from "framer-motion"
import Image from 'next/image'
import { SeasonalTopSong } from '@/types/spotify'
import { useAudioPreview } from "@/hooks/useAudioPreview";

export default function FallSlide({ song }: { song: SeasonalTopSong }) {
  const searchQuery = song ? `${song.name} ${song.artist}` : '';
  useAudioPreview(searchQuery);

  const titleWords = "Your Fall Anthem 🍂".split(" ");

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      {/* Geometric Background - falling leaf-like shapes */}
      <motion.div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-primary/10"
            style={{
              width: `${Math.random() * 30 + 20}px`,
              height: `${Math.random() * 30 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            animate={{
              y: [0, 100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
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