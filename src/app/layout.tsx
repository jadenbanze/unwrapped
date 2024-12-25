import "@/app/globals.css"
import type { Metadata } from "next"
import { Roboto_Mono, Playfair_Display } from 'next/font/google'
import { Providers } from "@/components/providers"

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: "Unwrapped - Your 2024 in Music",
  description: "Discover your true music taste with Unwrapped, a better Spotify Wrapped alternative.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${robotoMono.variable} ${playfair.variable} font-mono antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

