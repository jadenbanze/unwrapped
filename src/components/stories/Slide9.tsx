"use client"
import { motion } from "framer-motion"

export default function Slide9() {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
        {/* Floating circles background */}
        <motion.div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                border: '1px solid rgba(var(--primary), 0.2)'
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </motion.div>

        <h2 className="text-2xl font-bold mb-4 z-10">That was fun!</h2>
        <p className="text-lg mb-4">Let's do this again next year</p>
        <span className="text-6xl">😊</span>
      </div>
    )
  }
  
  