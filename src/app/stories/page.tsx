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
import SpringSlide from '@/components/stories/SpringSlide'
import SummerSlide from '@/components/stories/SummerSlide'
import FallSlide from '@/components/stories/FallSlide'
import WinterSlide from '@/components/stories/WinterSlide'
import TopMonthSlide from '@/components/stories/TopMonthSlide'
import { SeasonalTopSong } from '@/types/spotify';
import BingeSlide from '@/components/stories/BingeSlide'
import ArtistLoyaltySlide from '@/components/stories/ArtistLoyaltySlide'
import DiscoveriesSlide from '@/components/stories/DiscoveriesSlide'
import type { BingeProps } from '@/components/stories/BingeSlide'
import type { ArtistLoyaltyProps } from '@/components/stories/ArtistLoyaltySlide'
import type { DiscoveriesProps } from '@/components/stories/DiscoveriesSlide'

interface TopSong {
  name: string;
  artist: string;
  count: number;
  msPlayed: number;
  coverArt: string;
  playCount: number;
  firstListenDate: string;
}

interface TopArtist {
  name: string;
  count: number;
  image?: string;
}

type SlideComponent = React.ComponentType<any>;

interface ProcessedData {
  totalMinutesPlayed: number;
  topGenres: string[];
  totalUniqueSongs: number;
  topSongs: TopSong[];
  topArtists: TopArtist[];
  morningFavorite: TopSong;
  nightFavorite: TopSong;
  seasonalTopSongs: SeasonalTopSong[];
  topListeningMonth: {
    name: string;
    minutes: number;
  };
  bingeHour: {
    hour: Date;
    count: number;
  };
  topArtistsByTime: Array<{
    name: string;
    percentage: number;
    image?: string;
  }>;
  newDiscoveries: Array<{
    name: string;
    artist: string;
    date: string;
    coverArt?: string;
  }>;
}

export default function Stories() {
  const { data: session, status } = useSession()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null)

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

  const slides: SlideComponent[] = [
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
    Slide7,
    Slide8,
    Slide9,
    ({ springSong }: { springSong: SeasonalTopSong }) => <SpringSlide song={springSong} />,
    ({ summerSong }: { summerSong: SeasonalTopSong }) => <SummerSlide song={summerSong} />,
    ({ fallSong }: { fallSong: SeasonalTopSong }) => <FallSlide song={fallSong} />,
    ({ winterSong }: { winterSong: SeasonalTopSong }) => <WinterSlide song={winterSong} />,
    ({ month }: { month: { name: string; minutes: number } }) => <TopMonthSlide month={month} />,
    ({ binge }: { binge: BingeProps['hour'] }) => <BingeSlide hour={binge} />,
    ({ artists }: { artists: ArtistLoyaltyProps['artists'] }) => <ArtistLoyaltySlide artists={artists} />,
    ({ discoveries }: { discoveries: DiscoveriesProps['discoveries'] }) => <DiscoveriesSlide discoveries={discoveries} />,
    Slide10,
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative min-h-[calc(100vh-7rem)] w-full bg-gradient-to-br from-background to-primary/10 px-4 py-6">
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-full max-w-md flex justify-center gap-2 sm:gap-3 mb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentSlide 
                  ? "w-6 sm:w-8 bg-primary" 
                  : "w-4 sm:w-6 bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="relative w-full max-w-[85vw] sm:max-w-md aspect-[9/16]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full bg-card rounded-lg shadow-lg overflow-hidden"
              id={`story-slide-${currentSlide}`}
            >
              {slides.map((SlideComponent, index) => (
                currentSlide === index && (
                  <SlideComponent
                    key={index}
                    session={session}
                    {...(index === 1 ? { totalMinutes: processedData.totalMinutesPlayed } : {})}
                    {...(index === 2 ? { topGenres: processedData.topGenres } : {})}
                    {...(index === 3 ? { totalUniqueSongs: processedData.totalUniqueSongs } : {})}
                    {...(index === 4 ? { topSong: processedData.topSongs[0] } : {})}
                    {...(index === 5 ? { topSongs: processedData.topSongs } : {})}
                    {...(index === 6 ? { topArtist: processedData.topArtists[0] } : {})}
                    {...(index === 7 ? { topArtists: processedData.topArtists } : {})}
                    {...(index === 8 ? { morningFavorite: processedData.morningFavorite, nightFavorite: processedData.nightFavorite } : {})}
                    {...(index === 9 ? { springSong: processedData.seasonalTopSongs.find(s => s.season === 'Spring') } : {})}
                    {...(index === 10 ? { summerSong: processedData.seasonalTopSongs.find(s => s.season === 'Summer') } : {})}
                    {...(index === 11 ? { fallSong: processedData.seasonalTopSongs.find(s => s.season === 'Fall') } : {})}
                    {...(index === 12 ? { winterSong: processedData.seasonalTopSongs.find(s => s.season === 'Winter') } : {})}
                    {...(index === 13 ? { month: processedData.topListeningMonth } : {})}
                    {...(index === 14 ? { binge: processedData.bingeHour } : {})}
                    {...(index === 15 ? { artists: processedData.topArtistsByTime } : {})}
                    {...(index === 16 ? { discoveries: processedData.newDiscoveries } : {})}
                  />
                )
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex justify-center sm:justify-start sm:fixed sm:top-24 sm:right-8 sm:mt-0 z-20">
            <DownloadButton 
              elementId={`story-slide-${currentSlide}`} 
              filename={`music-story-slide-${currentSlide + 1}`} 
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="fixed left-1 sm:left-4 md:left-8 top-1/2 transform -translate-y-1/2 
                       w-8 h-8 sm:w-10 sm:h-10 bg-background/50 hover:bg-background/80 backdrop-blur-sm"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="fixed right-1 sm:right-4 md:right-8 top-1/2 transform -translate-y-1/2 
                       w-8 h-8 sm:w-10 sm:h-10 bg-background/50 hover:bg-background/80 backdrop-blur-sm"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}

