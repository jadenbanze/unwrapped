"use client"
import { motion } from "framer-motion"
import { Timer } from "lucide-react"

export interface BingeProps {
  hour: {
    hour: Date;
    count: number;
  }
}

export default function BingeSlide({ hour }: BingeProps) {
  const formattedDate = hour?.hour ? new Date(hour.hour).toLocaleDateString() : '';
  const formattedTime = hour?.hour ? new Date(hour.hour).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  }) : '';

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Timer className="w-16 h-16 text-primary mx-auto mb-4" />
        </motion.div>

        <h2 className="text-2xl font-bold">Your Power Hour</h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <p className="text-4xl font-bold text-primary">
            {hour?.count || 0} Songs
          </p>
          <p className="text-lg text-muted-foreground">
            in a single hour on
          </p>
          <p className="text-lg">
            {formattedDate}<br />
            {formattedTime}
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
} 