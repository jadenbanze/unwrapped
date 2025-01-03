"use client"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import Image from 'next/image'
import { useAudioPreview } from "@/hooks/useAudioPreview";
import { useMemo } from "react";

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
  const searchQuery = useMemo(() => {
    const randomTrack = Math.random() > 0.5 ? morningFavorite : nightFavorite;
    return `${randomTrack.name} ${randomTrack.artist}`;
  }, [morningFavorite, nightFavorite]);

  useAudioPreview(searchQuery);

  const titleWords = "Your day and night favorites".split(" ");

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 text-center relative">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Day/Night gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-blue-900/10"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 z-10"
      >
        {/* Title */}
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

        {/* Morning Favorite */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: titleWords.length * 0.2 }}
          className="flex flex-col items-center gap-2"
        >
          <Sun className="w-10 h-10 text-primary" />
          {morningFavorite.coverArt && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-28 h-28"
            >
              <Image
                src={morningFavorite.coverArt || '/placeholder.jpg'}
                alt={morningFavorite.name}
                fill
                className="rounded-lg object-cover shadow-lg"
              />
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: titleWords.length * 0.2 + 0.3 }}
          >
            <h3 className="text-lg font-bold mb-1">Morning Favorite</h3>
            <p className="text-md font-bold">{morningFavorite.name}</p>
            <p className="text-sm text-muted-foreground">by {morningFavorite.artist}</p>
          </motion.div>
        </motion.div>

        {/* Night Favorite */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: titleWords.length * 0.2 + 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          <Moon className="w-10 h-10 text-primary" />
          {nightFavorite.coverArt && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-28 h-28"
            >
              <Image
                src={nightFavorite.coverArt || '/placeholder.jpg'}
                alt={nightFavorite.name}
                fill
                className="rounded-lg object-cover shadow-lg"
              />
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: titleWords.length * 0.2 + 0.9 }}
          >
            <h3 className="text-lg font-bold mb-1">Night Favorite</h3>
            <p className="text-md font-bold">{nightFavorite.name}</p>
            <p className="text-sm text-muted-foreground">by {nightFavorite.artist}</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
} 