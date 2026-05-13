'use client'

import { motion } from 'framer-motion'
import { Zap, Video, FileText, Mic } from 'lucide-react'

export function PricingHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-primary/10" aria-labelledby="pricing-hero-heading">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 id="pricing-hero-heading" className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            AI-Powered Author Tools
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your books into engaging content across multiple formats. Reach wider audiences with our cutting-edge AI tools.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list" aria-label="Tool categories">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="tech-card rounded-xl p-6"
              role="listitem"
            >
              <Video className="h-12 w-12 text-red-500 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">Book-to-Video</h3>
              <p className="text-muted-foreground text-sm">Create engaging video content</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="tech-card rounded-xl p-6"
              role="listitem"
            >
              <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">Book-to-Article</h3>
              <p className="text-muted-foreground text-sm">Generate compelling articles</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="tech-card rounded-xl p-6"
              role="listitem"
            >
              <Mic className="h-12 w-12 text-green-500 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">Book-to-Podcast</h3>
              <p className="text-muted-foreground text-sm">Create podcast episodes</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
