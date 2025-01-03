"use client"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { useMemo } from "react";
import { useAudioPreview } from "@/hooks/useAudioPreview";

interface TopMonthProps {
  month: {
    name: string;
    minutes: number;
  };
  streamingHistory: any[];
}

export default function TopMonthSlide({ month, streamingHistory }: TopMonthProps) {
  const searchQuery = useMemo(() => {
    if (!streamingHistory?.length) return '';
    const randomTrack = streamingHistory[Math.floor(Math.random() * streamingHistory.length)];
    if (!randomTrack?.endTime || !randomTrack?.artistName || !randomTrack?.trackName) return '';
    return `${randomTrack.trackName} ${randomTrack.artistName}`;
  }, [streamingHistory]); 

  const backgroundShapes = useMemo(() => 
    Array.from({ length: 15 }).map(() => ({
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      rotation: Math.random() * 360,
    })), []
  );

  useAudioPreview(searchQuery);

  const titleWords = "Your Most Active Month".split(" ");

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      {/* Animated Background */}
      <motion.div className="absolute inset-0 overflow-hidden">
        {backgroundShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute border border-primary/10"
            style={{
              width: shape.width,
              height: shape.height,
              left: shape.left,
              top: shape.top,
              rotate: shape.rotation,
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
            }}
            animate={{
              rotate: [shape.rotation, shape.rotation + 360],
              borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '70% 30% 30% 70% / 70% 70% 30% 30%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      <motion.div className="z-10 space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
        </motion.div>

        <div className="flex gap-2 justify-center flex-wrap mb-6">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.2 + 0.4,
                duration: 0.3
              }}
              className="text-2xl font-bold"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: titleWords.length * 0.2 + 0.6 }}
          className="space-y-4"
        >
          <motion.p 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: titleWords.length * 0.2 + 0.8 }}
            className="text-4xl font-bold text-primary"
          >
            {month.name}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: titleWords.length * 0.2 + 1 }}
            className="text-lg text-muted-foreground"
          >
            You listened to {month.minutes.toLocaleString()} minutes of music
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
} 