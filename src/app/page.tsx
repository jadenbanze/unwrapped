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
    <div className="h-[calc(100vh-3.5rem)] bg-gradient-to-br from-background to-primary/10 flex flex-col">
      <div className="flex-1 flex flex-col justify-center gap-8 px-4">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-regular tracking-tight text-primary font-poppins"
            variants={itemVariants}
          >
            Your <span className="font-bold">2024</span> in music
          </motion.h2>
          <motion.p
            className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto"
            variants={itemVariants}
          >
            2024 music analyzed and unwrapped!
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button 
              size="lg" 
              className="mt-6 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-md"
              onClick={() => signIn('spotify', { callbackUrl: '/upload' })}
            >
              {session ? 'View Your Unwrapped' : 'Connect with Spotify'}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto w-full px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle>
                  <Download className="inline mr-2 h-5 w-5" /> Step 1
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>Download your Spotify data from your settings.</p>
                <footer className="text-sm text-muted-foreground">Estimated time: 3-5 days</footer>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle>
                  <Upload className="inline mr-2 h-5 w-5" /> Step 2
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>Upload your streaming data.</p>
                <footer className="text-sm text-muted-foreground">Almost there...</footer>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle>
                  <Star className="inline mr-2 h-5 w-5" /> Step 3
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>Generate your Unwrapped!</p>
                <footer className="text-sm text-muted-foreground">Share your Unwrapped with your friends!</footer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

