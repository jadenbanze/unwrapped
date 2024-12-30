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
    // Ensure we have both track name and artist name from the structure
    if (!randomTrack?.endTime || !randomTrack?.artistName || !randomTrack?.trackName) return '';
    
    // Debug information
    console.log('Selected Track:', {
      name: randomTrack.trackName,
      artist: randomTrack.artistName,
      time: randomTrack.endTime
    });

    return `${randomTrack.trackName} ${randomTrack.artistName}`;
  }, []); 

  useAudioPreview(searchQuery);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
        </motion.div>

        <h2 className="text-2xl font-bold">Your Most Active Month</h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <p className="text-4xl font-bold text-primary">{month.name}</p>
          <p className="text-lg text-muted-foreground">
            You listened to {month.minutes.toLocaleString()} minutes of music
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
} 