"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Download, Upload, Star } from 'lucide-react';
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const { data: session } = useSession();

  return (
    <div className="min-h-[calc(100vh-7rem)] bg-gradient-to-br from-background to-primary/10 flex flex-col">
      <header className="py-4">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-regular tracking-tight text-primary font-poppins mt-20"
            variants={itemVariants}
          >
            Your <span className="font-bold">2024</span> in music
          </motion.h2>
          <motion.p
            className="mt-4 text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Let's be honest, Spotify dropped the ball this year with Wrapped. Let's fix that.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button 
              size="lg" 
              className="mt-6 px-8 py-6 text-lg rounded-md"
              onClick={() => signIn('spotify', { callbackUrl: '/upload' })}
            >
              {session ? 'View Your Unwrapped' : 'Connect with Spotify'}
            </Button>
          </motion.div>
        </motion.div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          layout
        >
          <motion.div variants={itemVariants} layout>
            <Card className="flex flex-col h-40">
              <CardHeader className="pb-2">
                <CardTitle>
                  <Download className="inline mr-2" /> Step 1
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow pb-2">
                <p>Download your Spotify data from your settings.</p>
              </CardContent>
              <CardFooter>
                <footer className="text-sm text-muted-foreground">Estimated time: 3-5 days</footer>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants} layout>
            <Card className="flex flex-col h-40">
              <CardHeader className="pb-2">
                <CardTitle>
                  <Upload className="inline mr-2" /> Step 2
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow pb-2">
                <p>Upload your streaming data.</p>
              </CardContent>
              <CardFooter>
                <footer className="text-sm text-muted-foreground">Almost there...</footer>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants} layout>
            <Card className="flex flex-col h-40">
              <CardHeader className="pb-2">
                <CardTitle>
                  <Star className="inline mr-2" /> Step 3
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow pb-2">
                <p>Generate your Unwrapped!</p>
              </CardContent>
              <CardFooter>
                <footer className="text-sm text-muted-foreground">Share your Unwrapped with your friends!</footer>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

