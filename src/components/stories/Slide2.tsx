"use client"

import { motion } from "framer-motion"
import { FloatingObject } from "@/components/FloatingObject"
import { Clock, Music, Zap } from "lucide-react"
import { useMemo } from "react";
import { useAudioPreview } from "@/hooks/useAudioPreview";
import { getRandomTrack } from "@/utils/processSpotifyData";

export default function Slide2({ totalMinutes, streamingHistory }: { totalMinutes: number, streamingHistory: any[] }) {
  const searchQuery = useMemo(() => {
    if (!streamingHistory?.length) return '';
    const randomTrack = streamingHistory[Math.floor(Math.random() * streamingHistory.length)];
    if (!randomTrack?.endTime || !randomTrack?.artistName || !randomTrack?.trackName) return '';
    return `${randomTrack.trackName} ${randomTrack.artistName}`;
  }, []);

  useAudioPreview(searchQuery);

  const days = Math.floor(totalMinutes / (60 * 24))
  const lightYears = (totalMinutes * 299792458 * 60) / 9.461e15

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

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Floating Objects */}
      <FloatingObject className="top-10 left-10" delay={0}>
        <Clock className="w-12 h-12 text-primary/20" />
      </FloatingObject>
      <FloatingObject className="top-20 right-20" delay={1}>
        <Music className="w-16 h-16 text-primary/20" />
      </FloatingObject>
      <FloatingObject className="bottom-20 left-20" delay={2}>
        <Zap className="w-14 h-14 text-primary/20" />
      </FloatingObject>

      {/* Content with Animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-2xl font-bold mb-4"
        >
          This year, you listened to
        </motion.h2>
        
        <motion.p 
          variants={itemVariants}
          className="text-4xl font-bold text-primary mb-4"
        >
          {totalMinutes.toLocaleString()} minutes
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <p className="text-lg mb-2">That's {days} days</p>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <p className="text-lg mb-4">and {lightYears.toFixed(10)} light years</p>
        </motion.div>
        
        <motion.span 
          variants={itemVariants}
          className="text-6xl inline-block"
          whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          😱
        </motion.span>
      </motion.div>
    </div>
  )
}
  
  