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
  title: "Unwrapped - Your 2024 in Music",
  description: "Discover your 2024 taste in music!",
  openGraph: {
    title: "Unwrapped - Your 2024 in Music",
    description: "Check out my 2024 music wrapped!",
    images: [
      {
        url: "https://unwrapped2024.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Unwrapped 2024",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unwrapped - Your 2024 in Music",
    description: "Check out my 2024 music wrapped!",
    images: ["https://unwrapped2024.vercel.app/og-image.jpg"],
  },
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
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}

