"use client"
import { motion } from "framer-motion"
import { useMemo } from "react";
import { useAudioPreview } from "@/hooks/useAudioPreview";

interface Slide4Props {
  totalUniqueSongs: number;
  streamingHistory: any[];
}

export default function Slide4({ totalUniqueSongs = 0, streamingHistory }: { totalUniqueSongs: number, streamingHistory: any[] }) {
  const searchQuery = useMemo(() => {
    if (!streamingHistory?.length) return '';
    const randomTrack = streamingHistory[Math.floor(Math.random() * streamingHistory.length)];
    return `${randomTrack.trackName} ${randomTrack.artistName}`;
  }, [streamingHistory]);

  useAudioPreview(searchQuery);

  const titleWords = "This year, you listened to".split(" ");

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

      <motion.div className="z-10 space-y-4">
        <div className="flex gap-2 justify-center flex-wrap mb-4">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.2 + 1.6, // Add 1.6s delay to let background pattern animate first
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
          transition={{ 
            delay: titleWords.length * 0.2 + 1.8,
            duration: 0.5,
            ease: "easeOut"
          }}
          className="text-4xl font-bold text-primary mb-4"
        >
          {totalUniqueSongs.toLocaleString()} songs
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: titleWords.length * 0.2 + 2.1,
            duration: 0.5 
          }}
          className="text-lg"
        >
          That's a lot of music!
        </motion.p>
      </motion.div>
    </div>
  )
}
  
  