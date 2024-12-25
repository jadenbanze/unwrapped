"use client"
import { motion } from "framer-motion"

export default function Slide4() {
    const songsPlayed = 2468
  
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
        {/* Animated background pattern */}
        <motion.div 
          className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-15"
          initial="hidden"
          animate="visible"
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={i}
              className="border-2 border-primary/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>

        <h2 className="text-2xl font-bold mb-4 z-10">You played</h2>
        <p className="text-4xl font-bold text-primary mb-4">{songsPlayed.toLocaleString()} songs</p>
        <p className="text-lg">But one really stuck out...</p>
      </div>
    )
  }
  
  