"use client"
import { motion } from "framer-motion"
import Image from 'next/image'
import { useAudioPreview } from "@/hooks/useAudioPreview"
import { useMemo } from "react"

interface TopSong {
  name: string;
  artist: string;
  count: number;
  coverArt?: string;
}

export default function Slide6({ topSongs }: { topSongs: TopSong[] }) {
  const searchQuery = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * Math.min(5, topSongs.length));
    const randomSong = topSongs[randomIndex];
    return `${randomSong.name} ${randomSong.artist}`;
  }, []);

  useAudioPreview(searchQuery);

  // Generate random shapes once using useMemo
  const shapes = useMemo(() => 
    Array.from({ length: 6 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      isCircle: Math.random() > 0.5
    })),
  []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      <motion.div className="absolute inset-0">
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border-2 border-primary/20"
            style={{
              left: shape.left,
              top: shape.top,
              borderRadius: shape.isCircle ? '50%' : '0%'
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              borderRadius: shape.isCircle ? ['0%', '50%', '0%'] : ['50%', '0%', '50%']
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      <h2 className="text-2xl font-bold mb-8 z-10">But you also loved</h2>
      <div className="flex flex-col gap-4 z-10">
        {topSongs.map((song, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center group gap-4 w-full max-w-md pl-12 relative"
          >
            {/* Ranking number */}
            <div className="absolute left-0 font-bold text-lg text-primary">
              #{index + 1}
            </div>

            <motion.div 
              className="relative"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-16 h-16">
                {song.coverArt && (
                  <Image
                    src={song.coverArt}
                    alt={`${song.name} cover`}
                    fill
                    className="rounded-lg object-cover shadow-lg"
                  />
                )}
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    filter: 'blur(8px)',
                    transform: 'scale(1.1)',
                  }}
                />
              </div>
            </motion.div>

            <div className="flex flex-col items-start">
              <p className="text-sm font-bold">{song.name}</p>
              <p className="text-xs text-muted-foreground">{song.artist}</p>
              <p className="text-xs text-primary">{song.count} plays</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

