"use client"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import Image from 'next/image'

interface Slide10Props {
  morningFavorite: { 
    name: string; 
    artist: string; 
    count: number;
    coverArt?: string;
  };
  nightFavorite: { 
    name: string; 
    artist: string; 
    count: number;
    coverArt?: string;
  };
}

export default function Slide10({ morningFavorite, nightFavorite }: Slide10Props) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <Sun className="w-12 h-12 text-primary" />
            {morningFavorite.coverArt && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-32 h-32"
              >
                <Image
                  src={morningFavorite.coverArt}
                  alt={morningFavorite.name}
                  fill
                  className="rounded-lg object-cover shadow-lg"
                />
              </motion.div>
            )}
            <div>
              <h3 className="text-xl font-bold mb-2">Morning Favorite</h3>
              <p className="text-lg font-bold">{morningFavorite.name}</p>
              <p className="text-sm text-muted-foreground">by {morningFavorite.artist}</p>
            </div>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <Moon className="w-12 h-12 text-primary" />
            {nightFavorite.coverArt && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-32 h-32"
              >
                <Image
                  src={nightFavorite.coverArt}
                  alt={nightFavorite.name}
                  fill
                  className="rounded-lg object-cover shadow-lg"
                />
              </motion.div>
            )}
            <div>
              <h3 className="text-xl font-bold mb-2">Night Favorite</h3>
              <p className="text-lg font-bold">{nightFavorite.name}</p>
              <p className="text-sm text-muted-foreground">by {nightFavorite.artist}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 