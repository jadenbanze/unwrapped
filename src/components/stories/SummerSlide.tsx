"use client"
import { motion } from "framer-motion"
import Image from 'next/image'
import { SeasonalTopSong } from '@/types/spotify'
import { useAudioPreview } from '@/hooks/useAudioPreview'

const heatWaves = Array.from({ length: 8 });

export default function SummerSlide({ song }: { song: SeasonalTopSong }) {
  const searchQuery = song ? `${song.name} ${song.artist}` : '';
  useAudioPreview(searchQuery);

  const titleWords = "Your Summer Anthem ☀️".split(" ");

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      {/* Geometric Background */}
      <motion.div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-primary/10"
            style={{
              width: `${Math.random() * 40 + 40}px`,
              height: `${Math.random() * 40 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: Math.random() > 0.7 ? '50%' : `${Math.random() * 40}%`,
            }}
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.2, 0.1],
              borderRadius: Math.random() > 0.5 ? ['0%', '40%', '0%'] : ['40%', '0%', '40%'],
            }}
            transition={{
              duration: 8 + Math.random() * 7,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.4,
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
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: titleWords.length * 0.2 + 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="relative w-48 h-48 mx-auto my-6"
          >
            <Image
              src={song.coverArt || '/placeholder.jpg'}
              alt={song.name}
              fill
              className="rounded-lg object-cover shadow-lg"
            />
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: titleWords.length * 0.2 + 0.6 }}
          className="space-y-2"
        >
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: titleWords.length * 0.2 + 0.8 }}
            className="text-xl font-bold"
          >
            {song.name}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: titleWords.length * 0.2 + 1 }}
            className="text-md text-muted-foreground"
          >
            by {song.artist}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: titleWords.length * 0.2 + 1.2 }}
            className="text-sm text-primary"
          >
            {song.count} plays
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
} 