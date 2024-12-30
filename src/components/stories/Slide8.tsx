"use client"
import { motion } from "framer-motion"
import Image from 'next/image'
import { useAudioPreview } from "@/hooks/useAudioPreview";
import { useMemo } from "react"

interface Slide8Props {
  topArtists: { name: string; image: string }[];
}

export default function Slide8({ topArtists }: Slide8Props) {
  const searchQuery = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * Math.min(5, topArtists.length));
    const randomArtist = topArtists[randomIndex];
    return `${randomArtist.name} popular`;
  }, []);
  useAudioPreview(searchQuery);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Animated background particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [0, -100],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-bold mb-8 z-10"
      >
        You had room for a few more though
      </motion.h2>
      
      <div className="flex flex-col gap-4 z-10">
        {topArtists.map((artist, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: index * 0.2,
              duration: 0.6,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="flex items-center group gap-4 w-full max-w-md pl-12 relative"
          >
            {/* Ranking number (always visible) */}
            <div className="absolute left-0 font-bold text-lg text-primary">
              #{index + 1}
            </div>

            <motion.div 
              className="relative"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-16 h-16">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="rounded-lg object-cover shadow-lg"
                />
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
            <motion.p 
              className="text-sm font-bold text-left flex-grow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 + 0.3 }}
            >
              {artist.name}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

