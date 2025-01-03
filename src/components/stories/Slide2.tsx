"use client"

import { motion } from "framer-motion"
import { FloatingObject } from "@/components/FloatingObject"
import { Clock, Music, Zap, Timer } from "lucide-react"
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

  const titleWords = "This year, you spent".split(" ");

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Floating Objects */}
      <FloatingObject className="top-10 left-10" delay={0}>
        <Clock className="w-12 h-12 text-primary/20" />
      </FloatingObject>
      <FloatingObject className="bottom-32 right-16" delay={1.8}>
        <Timer className="w-12 h-12 text-primary/20" />
      </FloatingObject>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10"
      >
        <div className="flex gap-2 justify-center flex-wrap mb-6">
          {titleWords.map((word, i) => (
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

        <motion.p 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: titleWords.length * 0.2 + 0.3 }}
          className="text-4xl font-bold text-primary mb-4"
        >
          {totalMinutes.toLocaleString()} minutes
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: titleWords.length * 0.2 + 0.5 }}
          className="text-lg mb-2"
        >
          That's {days} days of music!
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: titleWords.length * 0.2 + 0.7 }}
          className="text-sm text-muted-foreground"
        >
          Your music traveled {lightYears.toFixed(2)} light years
        </motion.p>
      </motion.div>
    </div>
  )
}
  
  