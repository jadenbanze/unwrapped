"use client"
import { motion } from "framer-motion"
import { useMemo } from "react";
import { useAudioPreview } from "@/hooks/useAudioPreview";

export default function Slide10({ streamingHistory }: { streamingHistory: any[] }) {
  const searchQuery = useMemo(() => {
    if (!streamingHistory?.length) return '';
    const randomTrack = streamingHistory[Math.floor(Math.random() * streamingHistory.length)];
    return `${randomTrack.trackName} ${randomTrack.artistName}`;
  }, [streamingHistory]); 

  const backgroundCircles = useMemo(() => 
    Array.from({ length: 8 }).map(() => ({
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    })), []
  );

  useAudioPreview(searchQuery);

  const titleWords = "That was fun!".split(" ");
  const subtitleWords = "Let's do this again next year".split(" ");

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      {/* Floating circles background */}
      <motion.div className="absolute inset-0 overflow-hidden">
        {backgroundCircles.map((circle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: circle.width,
              height: circle.height,
              left: circle.left,
              top: circle.top,
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

      <motion.div className="z-10 space-y-8">
        <div className="flex gap-2 justify-center flex-wrap">
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

        <div className="flex gap-2 justify-center flex-wrap">
          {subtitleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: titleWords.length * 0.2 + i * 0.2,
                duration: 0.3
              }}
              className="text-lg"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.span 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: (titleWords.length + subtitleWords.length) * 0.2,
            duration: 0.5
          }}
          className="text-6xl inline-block"
        >
          😊
        </motion.span>
      </motion.div>
    </div>
  )
}
  
  