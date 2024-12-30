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
  
  // Format the first listen date from the data
  const firstListenDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const target = e.currentTarget as HTMLElement;

    const x = ((clientX - target.offsetWidth / 2) / (target.offsetWidth / 2)) * 10; // Adjust the multiplier for tilt strength
    const y = ((clientY - target.offsetHeight / 2) / (target.offsetHeight / 2)) * -10; // Invert Y for natural tilt

    setTilt({ x, y });
  };

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
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 flex flex-col items-center"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-2xl font-bold mb-6"
        >
          Your top song was
        </motion.h2>
        
        <motion.div 
          variants={itemVariants}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })} // Reset tilt on mouse leave
          style={{ 
            transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{ 
              scale: 1.05, 
              rotate: [0, -2, 2, -2, 0], // Shaking effect
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
          variants={itemVariants}
          className="text-xl font-bold mb-2"
        >
          {topSong.name}
        </motion.p>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg mb-4 text-muted-foreground"
        >
          by {topSong.artist}
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="space-y-2"
        >
          <p className="text-md">You listened to it <span className="text-primary font-bold">{topSong.playCount} times</span></p>
          <p className="text-md">First listen: {topSong.firstListenDate}</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

