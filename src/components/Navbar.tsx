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

export function Navbar() {
  const { data: session } = useSession()

  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <h1 className="text-2xl font-poppins font-bold">Unwrapped</h1>
      <div className="flex items-center gap-4">
        <ModeToggle />
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage 
                  src={session?.user?.image ?? "https://images.unsplash.com/broken"} 
                  alt={session?.user?.name ?? "User avatar"} 
                />
                <AvatarFallback>{session?.user?.name?.[0] ?? "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => signOut()}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn('spotify', { callbackUrl: '/' })}>Get Started</Button>
        )}
      </div>
    </header>
  )
} 