"use client"
import { motion } from "framer-motion"
import Image from 'next/image'

interface Slide8Props {
  topArtists: { name: string; image: string }[];
}

export default function Slide8({ topArtists }: Slide8Props) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      <motion.div 
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, var(--primary) 100%)',
          backgroundSize: '400% 400%',
        }}
      />

      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-4 z-10"
      >
        You had room for a few more though:
      </motion.h2>
      
      <div className="grid grid-cols-2 gap-4 z-10">
        {topArtists.map((artist, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <Image
                src={artist.image}
                alt={artist.name}
                width={80}
                height={80}
                className="rounded-full mb-2"
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            </div>
            <p className="text-sm font-bold">{artist.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

