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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { useIsMounted } from "@/hooks/useIsMounted"
import NextLink from "next/link"
import { Info } from "lucide-react"

const UserMenu = () => {
  const { data: session, status } = useSession()
  const isMounted = useIsMounted()

  if (!isMounted) {
    return <Skeleton className="h-8 w-8 md:h-10 md:w-10 rounded-full" />
  }

  if (status === "loading") {
    return <Skeleton className="h-8 w-8 md:h-10 md:w-10 rounded-full" />
  }

  if (!session) {
    return (
      <Button 
        onClick={() => signIn('spotify', { callbackUrl: '/upload' })}
        className="text-sm md:text-base px-3 md:px-4"
      >
        Get Started
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 md:h-10 md:w-10 cursor-pointer">
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
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <NextLink href="/" className="text-xl md:text-2xl font-poppins font-bold truncate">
          Unwrapped
        </NextLink>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9">
                <Info className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Help & FAQs</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <span className="text-sm text-muted-foreground">
                  Unwrapped 2024 was created by&nbsp;
                  <a href="https://jadenbanze.com" className="text-primary hover:underline">
                    Jaden Banze
                  </a>. This web application is not affiliated with Spotify.
                </span>
                <span className="text-sm text-muted-foreground block">
                  Please contact me if you run into any issues at{" "}
                  <a href="mailto:jadenbanze@gmail.com" className="text-primary hover:underline">
                    jadenbanze@gmail.com
                  </a>{" "}
                  or submit a PR at{" "}
                  <a 
                    href="https://github.com/jadenbanze/unwrapped/tree/main"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    the repo
                  </a>
                </span>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Are you stealing my data?</AccordionTrigger>
                  <AccordionContent>
                    No! The only information that is stored when signing in with spotify is your Spotify profile details, 
                    such as your username, email (I&apos;m not going to send you emails I promise), and profile picture.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>My results are a lot different than Spotify&apos;s wrapped</AccordionTrigger>
                  <AccordionContent>
                    Yeah I calculated and scored things a different way, I&apos;ll drop detailed documentation on how I scored 
                    the data and issues I ran into during development that might lead to your results being slightly skewed.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Why did you make this? Spotify already has it</AccordionTrigger>
                  <AccordionContent>
                    My favorite thing about the holiday season was when Spotify dropped Wrapped like clockwork by the beginning 
                    of December. Honestly, the quality has regressed over the years, missing key details that made Wrapped unique! 
                    I hope they can bring it back in future years. Oh and I was bored when I took PTO.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Why do I need my privacy data</AccordionTrigger>
                  <AccordionContent>
                    Spotify&apos;s API doesn&apos;t show extended streaming history, so you need to request your account data instead of the extended streaming history.
                    You can do this by going to your <a href="https://www.spotify.com/account/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-4">Spotify Privacy Settings</a> and requesting your account data.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>I can&apos;t get past the upload step</AccordionTrigger>
                  <AccordionContent>
                    If you can&apos;t get past the upload step, it&apos;s probably because you haven&apos;t uploaded the proper files.
                    For example, you need to upload all the files that start with &quot;StreamingHistory_music&quot;. I had 4 files for my 2024 data, but you might have more or less depending on your listening history.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </DialogContent>
          </Dialog>
          {isMounted ? <ModeToggle /> : <Skeleton className="h-8 w-8 md:h-9 md:w-9" />}
          <UserMenu />
        </div>
      </div>
    </header>
  )
} 