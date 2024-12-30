import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Global audio controller
let currentAudio: HTMLAudioElement | null = null;
let lastQuery: string | null = null;

export function useAudioPreview(query: string | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!query || query === lastQuery) return;
    lastQuery = query;

    const fetchPreview = async () => {
      setIsLoading(true);
      try {
        // Stop any currently playing audio
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }

        const response = await fetch('/api/spotify/preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });
        
        const data = await response.json();
        
        if (data.previewUrl) {
          const newAudio = new Audio(data.previewUrl);
          newAudio.volume = 0.3;
          currentAudio = newAudio;
          
          try {
            await newAudio.play();
            setIsPlaying(true);
          } catch (playError: any) {
            if (playError.name === 'NotAllowedError') {
              console.log('Audio playback requires user interaction first');
            } else {
              console.error('Playback error:', playError);
              setError('Failed to play audio');
            }
          }
        } else {
          console.log('No preview available for:', query);
        }
      } catch (err) {
        console.error('Audio preview error:', err);
        setError('Failed to load preview');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreview();

    // Cleanup function
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setIsPlaying(false);
      }
    };
  }, [query]);

  // Stop audio when navigating away
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setIsPlaying(false);
      }
    };
  }, [router]);

  return { isLoading, error, isPlaying };
} 