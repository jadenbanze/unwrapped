import { useEffect, useState } from 'react'

// Honestly fuck hydration errors and this is a hacky solution to get around them with client and server components.
// Maybe one day I'll learn Next.js properly but this is some voodoo that works for now.

export function useIsMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
} 