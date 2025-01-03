"use client"

import { motion } from "framer-motion"
import { FloatingObject } from "@/components/FloatingObject"
import { Headphones, Music2, Radio, Mic2, Piano } from "lucide-react"
import { useEffect, useState } from "react";
import { useAudioPreview } from "@/hooks/useAudioPreview";
import { useMemo } from "react";

interface Slide3Props {
  streamingHistory: any[];
}

export default function Slide3({ streamingHistory }: Slide3Props) {
  const [topGenres, setTopGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchQuery = useMemo(() => {
    if (!streamingHistory?.length) return '';
    const randomTrack = streamingHistory[Math.floor(Math.random() * streamingHistory.length)];
    return `${randomTrack.trackName} ${randomTrack.artistName}`;
  }, [streamingHistory]);

  useAudioPreview(searchQuery);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('/api/spotify/genres');
        if (!response.ok) throw new Error('Failed to fetch genres');
        const data = await response.json();
        setTopGenres(data.genres);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load genres');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

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

  const titleWords = "Your top 5 recent genres".split(" ");

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
        <div className="flex gap-2 justify-center flex-wrap mb-8">
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

        <div className="text-left space-y-3">
          {topGenres.map((genre, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: (titleWords.length * 0.2) + (index * 0.2),
                duration: 0.5 
              }}
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
  
  