"use client"

import { motion } from "framer-motion"

interface FloatingObjectProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FloatingObject({ 
  children, 
  delay = 0, 
  duration = 4,
  className = "" 
}: FloatingObjectProps) {
  const floatingAnimation = {
    y: [0, -20, 0],
    rotate: [-2, 2, -2],
    transition: {
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }
  }

  return (
    <motion.div
      animate={floatingAnimation}
      className={`absolute ${className}`}
    >
      {children}
    </motion.div>
  )
} 