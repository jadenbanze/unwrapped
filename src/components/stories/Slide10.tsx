"use client"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

interface Slide10Props {
  morningFavorite: { name: string; artist: string; count: number };
  nightFavorite: { name: string; artist: string; count: number };
}

export default function Slide10({ morningFavorite, nightFavorite }: Slide10Props) {
  const morningName = morningFavorite?.name || "No favorite";
  const morningArtist = morningFavorite?.artist || "Unknown artist";
  
  const nightName = nightFavorite?.name || "No favorite";
  const nightArtist = nightFavorite?.artist || "Unknown artist";

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4"
          >
            <Sun className="w-12 h-12 text-primary" />
          </motion.div>
          <h3 className="text-xl font-bold mb-2">Morning Favorite</h3>
          <p className="text-lg font-bold">{morningName}</p>
          <p className="text-sm text-muted-foreground">by {morningArtist}</p>
        </div>

        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-block mb-4"
          >
            <Moon className="w-12 h-12 text-primary" />
          </motion.div>
          <h3 className="text-xl font-bold mb-2">Night Favorite</h3>
          <p className="text-lg font-bold">{nightName}</p>
          <p className="text-sm text-muted-foreground">by {nightArtist}</p>
        </div>
      </motion.div>
    </div>
  )
} 