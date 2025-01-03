import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { useMemo } from "react";
import { useAudioPreview } from "@/hooks/useAudioPreview";

export default function Slide1({ session, streamingHistory }: { session: any, streamingHistory: any[] }) {
  const searchQuery = useMemo(() => {
    if (!streamingHistory?.length) return '';
    const randomTrack = streamingHistory[Math.floor(Math.random() * streamingHistory.length)];
    if (!randomTrack?.endTime || !randomTrack?.artistName || !randomTrack?.trackName) return '';
    return `${randomTrack.trackName} ${randomTrack.artistName}`;
  }, []); 

  useAudioPreview(searchQuery);

  const words = `Hello ${session?.user?.name || "there"}!`.split(" ");

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
      
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4 z-10"
      >
        <Avatar className="w-24 h-24">
          <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
          <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
      </motion.div>

      <div className="flex gap-2 justify-center flex-wrap mb-4">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.2 + 0.5,
              duration: 0.3
            }}
            className="text-2xl font-bold"
          >
            {word}
          </motion.span>
        ))}
      </div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: words.length * 0.2 + 0.7 }}
        className="text-lg"
      >
        Let's unwrap your music in 2024...
      </motion.p>
    </div>
  )
}

