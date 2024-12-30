import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { useMemo } from "react";
import { useAudioPreview } from "@/hooks/useAudioPreview";

export default function Slide1({ session, streamingHistory }: { session: any, streamingHistory: any[] }) {
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
        className="absolute inset-0 opacity-20"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-2 border-primary/40" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border-2 border-primary/40" />
      </motion.div>
      
      <Avatar className="w-24 h-24 mb-4 z-10">
        <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
        <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-bold mb-4">
        Hello {session?.user?.name || "there"}!
      </h2>
      <p className="text-lg">Let's unwrap your music in 2024...</p>
    </div>
  )
}

