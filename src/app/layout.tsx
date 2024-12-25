import "@/app/globals.css"
import type { Metadata } from "next"
import { Roboto_Mono, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

