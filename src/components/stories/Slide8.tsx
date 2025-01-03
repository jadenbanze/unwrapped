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
  }, [topArtists]);
  
  useAudioPreview(searchQuery);

  const titleWords = "You had room for a few more though".split(" ");

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Animated background particles */}
      <motion.div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
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
      </motion.div>

      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, var(--primary) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, var(--primary) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, var(--primary) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="flex gap-2 justify-center flex-wrap mb-8 z-10">
        {titleWords.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.2,
              duration: 0.3
            }}
            className="text-lg font-bold"
          >
            {word}
          </motion.span>
        ))}
      </div>
      
      <div className="flex flex-col gap-4 z-10">
        {topArtists.map((artist, index) => (
          <motion.div
            key={artist.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: titleWords.length * 0.2 + index * 0.2,
              duration: 0.6,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.02,
              x: 10,
              transition: { duration: 0.2 }
            }}
            className="flex items-center group gap-4 w-full max-w-md pl-12 relative"
          >
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
                  src={artist.image || '/placeholder.jpg'}
                  alt={artist.name}
                  fill
                  className="rounded-lg object-cover shadow-lg"
                />
                <motion.div
                  className="absolute inset-0 rounded-lg bg-primary/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
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
              transition={{ delay: titleWords.length * 0.2 + index * 0.2 + 0.3 }}
            >
              {artist.name}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

