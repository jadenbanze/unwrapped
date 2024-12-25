"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useIsMounted } from "@/hooks/useIsMounted"
import NextLink from "next/link"

const UserMenu = () => {
  const { data: session, status } = useSession()
  const isMounted = useIsMounted()

  if (!isMounted) {
    return <Skeleton className="h-10 w-10 rounded-full" />
  }

  if (status === "loading") {
    return <Skeleton className="h-10 w-10 rounded-full" />
  }

  if (!session) {
    return (
      <Button onClick={() => signIn('spotify', { callbackUrl: '/upload' })}>
        Get Started
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage 
            src={session.user?.image ?? "https://images.unsplash.com/broken"} 
            alt={session.user?.name ?? "User avatar"} 
          />
          <AvatarFallback>{session.user?.name?.[0] ?? "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => signOut()}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Navbar() {
  const isMounted = useIsMounted()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <NextLink href="/" className="text-2xl font-poppins font-bold">
          Unwrapped
        </NextLink>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {isMounted ? <ModeToggle /> : <Skeleton className="h-9 w-9" />}
          <UserMenu />
        </div>
      </div>
    </header>
  )
} 