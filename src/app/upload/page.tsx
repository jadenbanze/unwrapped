"use client"

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileJson } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { processSpotifyData } from '@/utils/processSpotifyData'
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { fetchMetadata } from '@/utils/fetchMetadata'

export default function Upload() {
  const { data: session, status } = useSession()
  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const router = useRouter()

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    redirect('/')
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Sort files by name to ensure correct order
    const sortedFiles = acceptedFiles.sort((a, b) => a.name.localeCompare(b.name));
    setFiles(sortedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json']
    },
    multiple: true
  })

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one file to upload.');
      return;
    }

    try {
      // Read all files and parse them
      const allTracks = await Promise.all(
        files.map(async (file) => {
          const text = await file.text();
          const data = JSON.parse(text);
          console.log(`Parsed ${file.name}:`, data.length, 'tracks'); // Debug log
          return data;
        })
      ).then(fileContents => fileContents.flat());

      // Log the combined data for debugging
      console.log('Total tracks across all files:', allTracks.length);

      // Process the data
      const processed = processSpotifyData(allTracks);

      // Prepare items for metadata fetch
      const metadataItems = [
        ...processed.topSongs.map(song => ({
          type: 'track' as const,
          name: song.name,
          artist: song.artist
        })),
        ...processed.topArtists.map(artist => ({
          type: 'artist' as const,
          name: artist.name
        })),
        // Add morning and night favorites
        {
          type: 'track' as const,
          name: processed.morningFavorite.name,
          artist: processed.morningFavorite.artist
        },
        {
          type: 'track' as const,
          name: processed.nightFavorite.name,
          artist: processed.nightFavorite.artist
        }
      ];

      try {
        const metadata = await fetchMetadata(metadataItems);
        
        // Update processed data with metadata
        const songsWithMetadata = processed.topSongs.map((song, index) => ({
          ...song,
          coverArt: metadata[index].coverArt || ''
        }));

        const artistsWithMetadata = processed.topArtists.map((artist, index) => ({
          ...artist,
          image: metadata[index + processed.topSongs.length].image || ''
        }));

        // Add metadata for morning and night favorites
        const morningFavoriteWithMetadata = {
          ...processed.morningFavorite,
          coverArt: metadata[metadata.length - 2].coverArt || ''
        };

        const nightFavoriteWithMetadata = {
          ...processed.nightFavorite,
          coverArt: metadata[metadata.length - 1].coverArt || ''
        };

        const processedWithMetadata = {
          ...processed,
          topSongs: songsWithMetadata,
          topArtists: artistsWithMetadata,
          morningFavorite: morningFavoriteWithMetadata,
          nightFavorite: nightFavoriteWithMetadata
        };

        // Store the processed data with metadata
        localStorage.setItem('spotifyData', JSON.stringify(processedWithMetadata));
        
        toast.success('Data processed successfully!');
        router.push('/stories');
      } catch (error) {
        console.error('Error fetching metadata:', error);
        toast.error('Error fetching artwork. Some images may be missing.');
        // Store the data anyway, just without metadata
        localStorage.setItem('spotifyData', JSON.stringify(processed));
        router.push('/stories');
      }
    } catch (error) {
      console.error('Error processing files:', error);
      toast.error('Error processing files. Please ensure all files are valid Spotify streaming history.');
    }
  };

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
          <p className="text-lg">Drop the JSON files here...</p>
        ) : (
          <div className="space-y-2">
            <p className="text-lg">Drag & drop your Spotify data JSON files here</p>
            <p className="text-sm text-muted-foreground">or click to select files</p>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Selected Files:</h3>
          <ul className="list-disc list-inside">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
          <Button onClick={handleUpload} className="mt-4">
            Process Files
          </Button>
        </div>
      )}
    </div>
  )
}

