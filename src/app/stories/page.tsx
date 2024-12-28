"use client"

import { useState, useEffect, ReactNode, FC } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Spinner } from "@nextui-org/spinner";
import DownloadButton from '@/components/DownloadButton'
import Slide1 from '@/components/stories/Slide1'
import Slide2 from '@/components/stories/Slide2'
import Slide3 from '@/components/stories/Slide3'
import Slide4 from '@/components/stories/Slide4'
import Slide5 from '@/components/stories/Slide5'
import Slide6 from '@/components/stories/Slide6'
import Slide7 from '@/components/stories/Slide7'
import Slide8 from '@/components/stories/Slide8'
import Slide9 from '@/components/stories/Slide9'
import Slide10 from '@/components/stories/Slide10'

interface TopSong {
  name: string;
  artist: string;
  count: number;
  msPlayed: number;
  coverArt: string;
  playCount: number;
  firstListenDate: string;
}

export default function Stories() {
  const { data: session, status } = useSession()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [processedData, setProcessedData] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem('spotifyData')
    if (data) {
      const parsedData = JSON.parse(data)
      console.log(parsedData)
      setProcessedData(parsedData)
    }
  }, [])

  if (status === "loading") {
    return <Spinner size="lg" />
  }

  if (!session || !processedData) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)]">
        <p className="text-center pb-4">Please sign in and upload your data first!</p>
        <Button onClick={() => signIn('spotify', { callbackUrl: '/upload' })}>
          Sign In
        </Button>
      </div>
    )
  }

  const slides: FC<any>[] = [
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
    Slide7,
    Slide8,
    Slide10,
    Slide9,
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-[calc(100vh-7rem)] w-full bg-gradient-to-br from-background to-primary/10 flex items-center justify-center">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentSlide 
                ? "w-8 bg-primary" 
                : "w-6 bg-primary/30 hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md aspect-[9/16] bg-card rounded-lg shadow-lg overflow-hidden"
          id={`story-slide-${currentSlide}`}
        >
          {slides.map((SlideComponent, index) => (
            currentSlide === index && (
              <SlideComponent
                key={index}
                session={session}
                {...(index === 1 ? { totalMinutes: processedData.totalMinutesPlayed } : {})}
                {...(index === 2 ? { topGenres: processedData.topGenres } : {})}
                {...(index === 3 ? { totalSongsPlayed: processedData.totalSongsPlayed, totalUniqueSongs: processedData.totalUniqueSongs } : {})}
                {...(index === 4 ? { topSong: processedData.topSongs[0] } : {})}
                {...(index === 5 ? { topSongs: processedData.topSongs.slice(1) } : {})}
                {...(index === 6 ? { topArtist: processedData.topArtists[0] } : {})}
                {...(index === 7 ? { topArtists: processedData.topArtists.slice(1) } : {})}
                {...(index === 8 ? { morningFavorite: processedData.morningFavorite, nightFavorite: processedData.nightFavorite } : {})}
              />
            )
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-8 right-8 z-20">
        <DownloadButton 
          elementId={`story-slide-${currentSlide}`} 
          filename={`music-story-slide-${currentSlide + 1}`} 
        />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}

