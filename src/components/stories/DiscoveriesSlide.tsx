"use client"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import Image from "next/image"

export interface DiscoveriesProps {
  discoveries: Array<{
    name: string;
    artist: string;
    date: string;
    coverArt?: string;
  }>
}

export default function DiscoveriesSlide({ discoveries }: DiscoveriesProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
        </motion.div>

        <h2 className="text-2xl font-bold">Recent Discoveries</h2>
        
        <div className="space-y-4">
          {discoveries.map((song, index) => (
            <motion.div
              key={song.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center gap-3"
            >
              {song.coverArt && (
                <Image
                  src={song.coverArt}
                  alt={song.name}
                  width={40}
                  height={40}
                  className="rounded"
                />
              )}
              <div className="text-left">
                <p className="font-bold text-sm">{song.name}</p>
                <p className="text-xs text-muted-foreground">{song.artist}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 