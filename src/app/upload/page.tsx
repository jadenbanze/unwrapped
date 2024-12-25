"use client"

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileJson } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function UploadPage() {
  const { data: session, status } = useSession()
  const [error, setError] = useState<string | null>(null)

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    redirect('/')
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    // Check if it's a JSON file
    if (file.type !== 'application/json') {
      setError('Please upload a JSON file')
      return
    }

    // TODO: Handle file upload
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const text = e.target?.result
        const json = JSON.parse(text as string)
        // TODO: Send to your API
        console.log('Parsed JSON:', json)
      } catch (err) {
        setError('Invalid JSON file')
      }
    }
    reader.readAsText(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json']
    },
    maxFiles: 1
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Let's unwrap your 2024 in music</h1>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">How to get your Spotify data:</h2>
          <ol className="list-decimal list-inside space-y-2 mb-6">
            <li>Go to your <a href="https://www.spotify.com/account/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-4">Spotify Privacy Settings</a></li>
            <li>Scroll down to &quot;Download your data&quot;</li>
            <li>Request your account data (not the extended streaming history)</li>
            <li>Confirm in your email that you want to receive the data.</li>
            <li>This will take up to 5 days. <a href="https://venmo.com/u/Jaden-Banze" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-4">Grab a coffee for us in the meantime.</a></li>
            <li>Once received, extract the ZIP file</li>
            <li>Find your streaming history JSON files (they start with &quot;StreamingHistory&quot;)</li>
            <li>Upload those files below</li>
          </ol>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed bg-muted-foreground/5 rounded-lg p-12 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} />
        <FileJson className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        {isDragActive ? (
          <p className="text-lg">Drop the JSON file here...</p>
        ) : (
          <div className="space-y-2">
            <p className="text-lg">Drag & drop your Spotify data JSON file here</p>
            <p className="text-sm text-muted-foreground">or click to select file</p>
          </div>
        )}
      </div>
    </div>
  )
}
