"use client"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SlideOverview({ session }: { session: any }) {
  const stats = {
    topArtists: [
      "Ken Carson",
      "Drake",
      "Brent Faiyaz",
      "Nafi Islam",
      "Jesus Christ"
    ],
    topSongs: [
      "Freestyle 2",
      "Darling, I",
      "Party Rock Anthem",
      "Test",
      "Test"
    ],
    minutesListened: "127,528",
    topGenre: "Opium Rap",
    topArtistImage: "/placeholder.svg"
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative bg-primary/10">
      <motion.div 
        className="w-full max-w-md flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top Avatar */}
        <motion.div variants={itemVariants} className="mb-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={stats.topArtistImage} alt={stats.topArtists[0]} />
            <AvatarFallback>{stats.topArtists[0][0]}</AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Top Artist Name */}
        <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-8">
          {stats.topArtists[0]}
        </motion.h2>

        {/* Lists Section */}
        <div className="grid grid-cols-2 gap-x-6 mb-8 w-full">
          {/* Top Artists */}
          <motion.div variants={itemVariants} className="text-left">
            <h3 className="text-xl font-bold mb-4">Top Artists</h3>
            {stats.topArtists.map((artist, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <span className="text-primary font-bold">{index + 1}</span>
                <span className="text-sm">{artist}</span>
              </div>
            ))}
          </motion.div>

          {/* Top Songs */}
          <motion.div variants={itemVariants} className="text-left">
            <h3 className="text-xl font-bold mb-4">Top Songs</h3>
            {stats.topSongs.map((song, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <span className="text-primary font-bold">{index + 1}</span>
                <span className="text-sm">{song}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 gap-6 w-full">
          {/* Minutes Listened */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-lg font-bold mb-2">Minutes Listened</h3>
            <p className="text-3xl font-bold text-primary">
              {stats.minutesListened}
            </p>
          </motion.div>

          {/* Top Genre */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-lg font-bold mb-2">Top Genre</h3>
            <p className="text-3xl font-bold text-primary">
              {stats.topGenre}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Background decoration */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-20 overflow-hidden"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-2 border-primary/40" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border-2 border-primary/40" />
      </motion.div>
    </div>
  )
}

