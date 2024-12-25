"use client"

import { motion } from "framer-motion"
import { FloatingObject } from "@/components/FloatingObject"
import { Headphones, Music2, Radio, Mic2, Piano } from "lucide-react"

export default function Slide3() {
  const topGenres = ["Pop", "Rock", "Hip-Hop", "Electronic", "Jazz"]
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Floating Objects - each icon represents a different genre */}
      <FloatingObject className="top-12 left-12" delay={0}>
        <Headphones className="w-12 h-12 text-primary/20" />
      </FloatingObject>
      <FloatingObject className="top-20 right-16" delay={1.2}>
        <Music2 className="w-14 h-14 text-primary/20" />
      </FloatingObject>
      <FloatingObject className="bottom-24 left-20" delay={0.8}>
        <Radio className="w-10 h-10 text-primary/20" />
      </FloatingObject>
      <FloatingObject className="bottom-16 right-12" delay={1.6}>
        <Mic2 className="w-16 h-16 text-primary/20" />
      </FloatingObject>
      <FloatingObject className="top-1/2 right-8" delay={0.4}>
        <Piano className="w-12 h-12 text-primary/20" />
      </FloatingObject>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-2xl font-bold mb-8"
        >
          Your top genres this year
        </motion.h2>
        <div className="text-left space-y-3">
          {topGenres.map((genre, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, x: 10 }}
              className="flex items-center space-x-2"
            >
              <span className="text-primary">{index + 1}.</span>
              <span className="text-xl">{genre}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
  
  