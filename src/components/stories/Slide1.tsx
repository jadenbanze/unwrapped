import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

export default function Slide1({ session }: { session: any }) {
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

