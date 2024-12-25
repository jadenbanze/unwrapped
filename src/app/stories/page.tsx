"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Slide1 from '@/components/stories/Slide1'
import Slide2 from '@/components/stories/Slide2'
import Slide3 from '@/components/stories/Slide3'
import Slide4 from '@/components/stories/Slide4'
import Slide5 from '@/components/stories/Slide5'
import Slide6 from '@/components/stories/Slide6'
import Slide7 from '@/components/stories/Slide7'
import Slide8 from '@/components/stories/Slide8'
import Slide9 from '@/components/stories/Slide9'

const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9]

export default function Stories() {
  const { data: session } = useSession()
  const [currentSlide, setCurrentSlide] = useState(0)

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
        >
          {slides.map((Slide, index) => (
            currentSlide === index && <Slide key={index} session={session} />
          ))}
        </motion.div>
      </AnimatePresence>

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

