import { useState, useEffect } from 'react';

// Global audio controller
let currentAudio: HTMLAudioElement | null = null;
let lastQuery: string | null = null;

export function useAudioPreview(query: string | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
          await newAudio.play();
          setIsPlaying(true);
        }
      } catch (err) {
        console.error('Audio preview error:', err);
        setError('Failed to load preview');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreview();

    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setIsPlaying(false);
      }
    };
  }, [query]);

  return { isLoading, error, isPlaying };
} 