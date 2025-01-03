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
  }, [topSongs]);

  useAudioPreview(searchQuery);

  const titleWords = "Your top songs were".split(" ");

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

      <motion.div className="z-10 space-y-6">
        <div className="flex gap-2 justify-center flex-wrap mb-6">
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

        <div className="space-y-4">
          {topSongs.slice(0, 5).map((song, index) => (
            <motion.div
              key={song.name}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: titleWords.length * 0.2 + (index * 0.2),
                duration: 0.5 
              }}
              whileHover={{ scale: 1.05, x: 10 }}
              className="flex items-center gap-4"
            >
              <span className="text-primary font-bold">{index + 1}</span>
              <div className="flex items-center gap-3">
                <Image
                  src={song.coverArt || '/placeholder.jpg'}
                  alt={song.name}
                  width={40}
                  height={40}
                  className="rounded"
                />
                <div className="text-left">
                  <p className="font-bold">{song.name}</p>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

