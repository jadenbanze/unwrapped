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
    <div className="h-full flex flex-col items-center justify-center p-4 text-center relative">
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
            className="flex flex-col items-center gap-2"
          >
            <Sun className="w-10 h-10 text-primary" />
            {morningFavorite.coverArt && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-28 h-28"
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
              <h3 className="text-lg font-bold mb-1">Morning Favorite</h3>
              <p className="text-md font-bold">{morningFavorite.name}</p>
              <p className="text-sm text-muted-foreground">by {morningFavorite.artist}</p>
            </div>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-2"
          >
            <Moon className="w-10 h-10 text-primary" />
            {nightFavorite.coverArt && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-28 h-28"
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
              <h3 className="text-lg font-bold mb-1">Night Favorite</h3>
              <p className="text-md font-bold">{nightFavorite.name}</p>
              <p className="text-sm text-muted-foreground">by {nightFavorite.artist}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 