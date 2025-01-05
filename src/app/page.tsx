"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Download, Upload, Star, ArrowRight } from 'lucide-react'
import { signIn, useSession } from "next-auth/react"
import SlideOverview from "@/components/stories/SlideOverview"
import { useState, useEffect } from "react"

const MOCK_DATA = {
  topArtists: [
    { name: "The Weeknd", count: 423, image: "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb" },
    { name: "Taylor Swift", count: 532, image: "https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3132a15fbb0" },
    { name: "Ken Carson", count: 122, image: "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb" },
    { name: "Drake", count: 120, image: "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb" },
    { name: "Kanye West", count: 110, image: "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb" },
  ],
  topSongs: [
    { 
      name: "Blinding Lights", 
      artist: "The Weeknd", 
      count: 132, 
      coverArt: "https://i.scdn.co/image/ab67616d0000b273c6f7af36f64d229883cfc2a6",
      msPlayed: 132 * 200000,
      playCount: 132,
      firstListenDate: "2024-01-01"
    },
    { 
      name: "Cruel Summer", 
      artist: "Taylor Swift", 
      count: 125, 
      coverArt: "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647",
      msPlayed: 125 * 180000, // Approximate song length in ms
      playCount: 125,
      firstListenDate: "2024-01-01"
    },
    { 
      name: "Freestyle 2", 
      artist: "Ken Carson", 
      count: 122, 
      coverArt: "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647",
      msPlayed: 122 * 180000, // Approximate song length in ms
      playCount: 122,
      firstListenDate: "2024-01-01"
    },
    { 
      name: "the perfect pair", 
      artist: "beabadoobee", 
      count: 120, 
      coverArt: "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647",
      msPlayed: 120 * 180000, // Approximate song length in ms
      playCount: 120,
      firstListenDate: "2024-01-01"
    },
    { 
      name: "Revival", 
      artist: "Zach Bryan", 
      count: 110, 
      coverArt: "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647",
      msPlayed: 110 * 180000, // Approximate song length in ms
      playCount: 110,
      firstListenDate: "2024-01-01"
    },
  ],
  totalMinutesPlayed: 45367,
  streamingHistory: []
}

export default function Home() {
  const { data: session } = useSession()
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) - 0.5
    const y = ((e.clientY - rect.top) / rect.height) - 0.5
    setMouseX(x)
    setMouseY(y)
  }

  // Add this CSS to your globals.css
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .perspective-1000 { perspective: 1000px; }
      .preserve-3d { transform-style: preserve-3d; }
    `
    document.head.appendChild(style)
    return () => style.remove()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  }

  const slideUpVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay: 0.5
      }
    }
  }

  return (
    <div 
      className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-background via-background to-primary/10"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setMouseX(0)
        setMouseY(0)
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="flex flex-col gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary"
              variants={itemVariants}
            >
              Your <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">2024</span>
              <br />in Music
            </motion.h1>
            
            <motion.p
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl font-light"
              variants={itemVariants}
            >
              Let's be honest, Spotify dropped the ball this year with Wrapped. 
              We're here to fix that with a deeper dive into your music taste.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button 
                size="lg" 
                className="group text-lg px-8 py-6 rounded-full"
                onClick={() => signIn('spotify', { callbackUrl: '/upload' })}
              >
                {session ? 'View Your Unwrapped' : 'Connect with Spotify'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Steps */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <Card className="h-full border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle>
                      <Download className="inline mr-2 h-5 w-5" /> Step 1
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>Download your Spotify data from your settings.</p>
                    <footer className="text-sm text-muted-foreground">Estimated time: 3-5 days</footer>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card className="h-full border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle>
                      <Upload className="inline mr-2 h-5 w-5" /> Step 2
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>Upload your streaming data.</p>
                    <footer className="text-sm text-muted-foreground">Almost there...</footer>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card className="h-full border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle>
                      <Star className="inline mr-2 h-5 w-5" /> Step 3
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>Generate your Unwrapped!</p>
                    <footer className="text-sm text-muted-foreground">Share your Unwrapped with your friends!</footer>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Preview */}
          <motion.div
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block perspective-1000 w-full h-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              setMouseX(0)
              setMouseY(0)
            }}
          >
            <motion.div 
              className="transform scale-95 origin-top rounded-xl border border-primary/20 shadow-lg overflow-hidden bg-background preserve-3d"
              whileHover={{ scale: 0.98 }}
              animate={{ 
                rotateX: mouseY * 5,
                rotateY: mouseX * -5,
                transition: { type: "spring", stiffness: 400, damping: 30 }
              }}
            >
              <SlideOverview 
                session={session || { user: { name: "Preview User", image: null }}} 
                processedData={MOCK_DATA}
                isPreview={true}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

