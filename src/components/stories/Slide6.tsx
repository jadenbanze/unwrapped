"use client"
import { motion } from "framer-motion"
import Image from 'next/image'

export default function Slide6() {
  const topSongs = [
    { name: "Song 1", artist: "Artist 1", coverArt: "/placeholder.svg" },
    { name: "Song 2", artist: "Artist 2", coverArt: "/placeholder.svg" },
    { name: "Song 3", artist: "Artist 3", coverArt: "/placeholder.svg" },
    { name: "Song 4", artist: "Artist 4", coverArt: "/placeholder.svg" },
    { name: "Song 5", artist: "Artist 5", coverArt: "/placeholder.svg" },
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      <motion.div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border-2 border-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%'
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              borderRadius: Math.random() > 0.5 ? ['0%', '50%', '0%'] : ['50%', '0%', '50%']
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      <h2 className="text-2xl font-bold mb-4 z-10">But you also loved:</h2>
      <div className="grid grid-cols-2 gap-4 z-10">
        {topSongs.map((song, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center"
          >
            <Image
              src={song.coverArt}
              alt={`${song.name} cover`}
              width={80}
              height={80}
              className="rounded-lg mb-2"
            />
            <p className="text-sm font-bold">{song.name}</p>
            <p className="text-xs">{song.artist}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

