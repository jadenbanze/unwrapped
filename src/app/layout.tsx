import "@/app/globals.css"
import type { Metadata } from "next"
import { Roboto_Mono, Playfair_Display } from 'next/font/google'
import { Providers } from "@/components/providers"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Analytics } from "@vercel/analytics/react"

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: "Unwrapped",
  description: "Discover your true music taste with Unwrapped, a better Spotify Wrapped alternative.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${robotoMono.variable} ${playfair.variable} font-mono min-h-screen flex flex-col antialiased`}>
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}

