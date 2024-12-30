"use client"
import { motion } from "framer-motion"
import { Crown } from "lucide-react"
import Image from "next/image"

export interface ArtistLoyaltyProps {
  artists: Array<{
    name: string;
    percentage: number;
    image?: string;
  }>
}

export default function ArtistLoyaltySlide({ artists }: ArtistLoyaltyProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 space-y-8"
      >
        <h2 className="text-2xl font-bold">Your Most Loyal Listens</h2>
        
        {artists.map((artist, index) => (
          <motion.div
            key={artist.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center gap-4"
          >
            {artist.image ? (
              <Image
                src={artist.image}
                alt={artist.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <Crown className="w-12 h-12 text-primary" />
            )}
            <div className="text-left">
              <p className="font-bold">{artist.name}</p>
              <p className="text-sm text-primary">
                {artist.percentage.toFixed(1)}% of your time
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
} 