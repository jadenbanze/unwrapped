"use client"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import * as htmlToImage from 'html-to-image'
import { useState } from 'react'

export default function DownloadButton({ elementId, filename }: { elementId: string, filename: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const downloadImage = async () => {
    try {
      setIsLoading(true)
      const element = document.getElementById(elementId)
      if (!element) return

      const dataUrl = await htmlToImage.toPng(element)
      
      // Create a link and trigger download
      const link = document.createElement('a')
      link.download = `${filename}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={downloadImage}
      disabled={isLoading}
      className="absolute top-4 right-4 z-50 bg-background/80 backdrop-blur-sm"
    >
      <Download className="w-4 h-4 mr-2" />
      {isLoading ? 'Saving...' : 'Save Slide'}
    </Button>
  )
}