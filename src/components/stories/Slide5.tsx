"use client"

import { motion } from "framer-motion"
import { FloatingObject } from "@/components/FloatingObject"
import { Disc, Heart, Play, Repeat, Star, Pause } from "lucide-react"
import Image from 'next/image'
import { useState } from 'react'
import { useAudioPreview } from "@/hooks/useAudioPreview"

interface TopSong {
  name: string;
  artist: string;
  count: number;
  msPlayed: number;
  coverArt: string;
  playCount: number;
  firstListenDate: string;
}

export default function Slide5({ topSong }: { topSong: TopSong }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  
  const titleWords = "Your top song was".split(" ");

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const target = e.currentTarget as HTMLElement;

    const x = ((clientX - target.offsetWidth / 2) / (target.offsetWidth / 2)) * 10;
    const y = ((clientY - target.offsetHeight / 2) / (target.offsetHeight / 2)) * -10;

    setTilt({ x, y });
  };

  const searchQuery = `${topSong.name} ${topSong.artist}`;
  useAudioPreview(searchQuery);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Floating Objects */}
      <FloatingObject className="top-16 left-16" delay={0}>
        <Disc className="w-12 h-12 text-primary/20" />
      </FloatingObject>
      <FloatingObject className="top-24 right-20" delay={1.2}>
        <Heart className="w-10 h-10 text-primary/20" />
      </FloatingObject>
      <FloatingObject className="bottom-20 left-24" delay={0.6}>
        <Play className="w-14 h-14 text-primary/20" />
      </FloatingObject>
      <FloatingObject className="bottom-24 right-16" delay={1.8}>
        <Star className="w-12 h-12 text-primary/20" />
      </FloatingObject>
      <FloatingObject className="top-1/2 right-12" delay={0.3}>
        <Repeat className="w-10 h-10 text-primary/20" />
      </FloatingObject>

      <motion.div className="z-10 flex flex-col items-center">
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
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: titleWords.length * 0.2 + 0.3 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          style={{ 
            transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{ 
              scale: 1.05, 
              rotate: [0, -2, 2, -2, 0],
              transition: { duration: 0.3 }
            }}
          >
            <Image
              src={topSong.coverArt}
              alt={`${topSong.name} cover`}
              width={200}
              height={200}
              className="rounded-lg mb-4 shadow-lg"
            />
          </motion.div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: titleWords.length * 0.2 + 0.6 }}
          className="text-xl font-bold mb-2"
        >
          {topSong.name}
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: titleWords.length * 0.2 + 0.8 }}
          className="text-lg mb-4 text-muted-foreground"
        >
          by {topSong.artist}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: titleWords.length * 0.2 + 1 }}
          className="space-y-2"
        >
          <p className="text-md">You listened to it <span className="text-primary font-bold">{topSong.playCount} times</span></p>
          <p className="text-md">First listen: {topSong.firstListenDate}</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

