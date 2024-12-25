"use client"

import { motion } from "framer-motion"
import { FloatingObject } from "@/components/FloatingObject"
import { Mic, Music, Star, Trophy, Crown } from "lucide-react"
import Image from 'next/image'

export default function Slide7() {
  const topArtist = {
    name: "Taylor Swift",
    image: "/placeholder.svg"
  }

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
        <motion.div variants={itemVariants}>
          <motion.h2 className="text-2xl font-bold mb-6">
            Your top artist was
          </motion.h2>
        </motion.div>

        <motion.div 
          variants={imageVariants}
          whileHover={{ scale: 1.05, rotate: [-2, 2, -2] }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Image
            src={topArtist.image}
            alt={topArtist.name}
            width={200}
            height={200}
            className="rounded-full mb-6 shadow-lg border-4 border-primary/20"
          />
        </motion.div>

        <motion.p 
          variants={itemVariants}
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
        >
          {topArtist.name}
        </motion.p>
      </motion.div>
    </div>
  )
}

