"use client"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAudioPreview } from "@/hooks/useAudioPreview";
import { useMemo } from "react";
import Link from "next/link";
interface ProcessedData {
  topArtists: { name: string; count: number; image?: string }[];
  topSongs: { 
    name: string;
    artist: string;
    count: number;
    msPlayed: number;
    playCount: number;
    firstListenDate: string;
  }[];
  totalMinutesPlayed: number;
  streamingHistory: any[];
}

export default function SlideOverview({ 
  session, 
  processedData 
}: { 
  session: any;
  processedData: ProcessedData;
}) {
  const searchQuery = useMemo(() => {
    if (!processedData?.topSongs?.length) return '';
    const randomSong = processedData.topSongs[Math.floor(Math.random() * processedData.topSongs.length)];
    return `${randomSong.name} ${randomSong.artist}`;
  }, [processedData]);

  useAudioPreview(searchQuery);

  if (!processedData) return null;

  const { topArtists, topSongs, totalMinutesPlayed } = processedData;
  const titleLine1 = `${session?.user?.name}'s`;
  const titleLine2 = "2024 Unwrapped";

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative bg-primary/5">
      <motion.div className="w-full max-w-2xl space-y-8">
        {/* Header with Avatar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6"
        >
          <Avatar className="w-20 h-20">
            <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
            <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold"
            >
              {titleLine1}
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold"
            >
              {titleLine2}
            </motion.h2>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-12 mt-8">
          {/* Top Artists */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-left"
          >
            <h3 className="text-xl font-bold mb-4">Top Artists</h3>
            <div className="space-y-3">
              {topArtists?.slice(0, 5).map((artist, index) => (
                <motion.div
                  key={artist.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-primary font-bold">{index + 1}</span>
                  <span>{artist.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Top Songs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-left"
          >
            <h3 className="text-xl font-bold mb-4">Top Songs</h3>
            <div className="space-y-3">
              {topSongs?.slice(0, 5).map((song, index) => (
                <motion.div
                  key={song.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-primary font-bold">{index + 1}</span>
                  <div>
                    <span>{song.name}</span>
                    <span className="text-muted-foreground text-sm block">by {song.artist}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex justify-between items-end mt-12 text-sm"
        >
          <div className="text-left">
            <p className="text-muted-foreground">Total Minutes Listened</p>
            <p className="text-xl font-bold text-primary">
              {totalMinutesPlayed?.toLocaleString()}
            </p>
          </div>
          <p className="text-xl font-bold text-primary hover:underline">
            <Link href="https://unwrapped2024.vercel.app">Get yours at unwrapped2024.vercel.app</Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

