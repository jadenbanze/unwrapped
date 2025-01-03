"use client"

import { motion } from "framer-motion"
import { FloatingObject } from "@/components/FloatingObject"
import { Mic, Music, Star, Trophy, Crown } from "lucide-react"
import Image from 'next/image'
import { useAudioPreview } from "@/hooks/useAudioPreview"

interface TopArtist {
  name: string;
  count: number;
  image: string;
}

export default function Slide7({ topArtist }: { topArtist: TopArtist }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  }

  const searchQuery = `${topArtist.name} popular`;  
  useAudioPreview(searchQuery);

  const words = "Your top artist was".split(" ");

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Floating Objects */}
      <FloatingObject className="top-20 left-16" delay={0}>
        <Mic className="w-12 h-12 text-primary/20" />
      </FloatingObject>
      <FloatingObject className="top-28 right-20" delay={1.2}>
        <Star className="w-14 h-14 text-primary/20" />
      </FloatingObject>
      <FloatingObject className="bottom-24 left-20" delay={0.6}>
        <Music className="w-10 h-10 text-primary/20" />
      </FloatingObject>
      <FloatingObject className="bottom-32 right-16" delay={1.8}>
        <Trophy className="w-12 h-12 text-primary/20" />
      </FloatingObject>
      <FloatingObject className="top-1/2 right-12" delay={0.3}>
        <Crown className="w-16 h-16 text-primary/20" />
      </FloatingObject>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 w-full max-w-md mx-auto"
      >
        <div className="flex gap-2 justify-center flex-wrap mb-6">
          {words.map((word, i) => (
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

        <motion.div 
          variants={imageVariants}
          whileHover={{ scale: 1.05, rotate: [-2, 2, -2] }}
          transition={{ duration: 0.5, delay: words.length * 0.2 }}
          className="flex justify-center"
        >
          <Image
            src={topArtist.image}
            alt={topArtist.name}
            sizes="200px"
            width={200}
            height={200}
            className="rounded-full mb-6 shadow-lg border-4 border-primary/20"
          />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: (words.length * 0.2) + 0.5 }}
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
        >
          {topArtist.name}
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: (words.length * 0.2) + 0.7 }}
          className="text-lg text-primary"
        >
          {topArtist.count} plays
        </motion.p>
      </motion.div>
    </div>
  )
}

