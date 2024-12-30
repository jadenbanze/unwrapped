"use client"
import { motion } from "framer-motion"
import { Repeat } from "lucide-react"

export interface RepeatProps {
  song: {
    name: string;
    artist: string;
    date: string;
    count: number;
  }
}

export default function RepeatSlide({ song }: RepeatProps) {
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
          <Repeat className="w-16 h-16 text-primary mx-auto mb-4" />
        </motion.div>

        <h2 className="text-2xl font-bold">Repeat Champion</h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <p className="text-xl font-bold">{song.name}</p>
          <p className="text-md text-muted-foreground">by {song.artist}</p>
          <p className="text-lg">
            Played <span className="text-primary font-bold">{song.count} times</span>
          </p>
          <p className="text-sm text-muted-foreground">on {new Date(song.date).toLocaleDateString()}</p>
        </motion.div>
      </motion.div>
    </div>
  )
} 