'use client'

import { motion } from 'framer-motion'
import { Heart, BookOpen, Users } from 'lucide-react'

export function AboutHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-primary/10" aria-labelledby="about-hero-heading">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 id="about-hero-heading" className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            About Citeability
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            We're building the world's most supportive community for authors to exchange honest, meaningful book reviews.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list" aria-label="Our values">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="tech-card rounded-xl p-6"
              role="listitem"
            >
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">Built with Love</h3>
              <p className="text-muted-foreground text-sm">Created by authors, for authors</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="tech-card rounded-xl p-6"
              role="listitem"
            >
              <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">Quality First</h3>
              <p className="text-muted-foreground text-sm">Meaningful reviews that help authors grow</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="tech-card rounded-xl p-6"
              role="listitem"
            >
              <Users className="h-12 w-12 text-green-500 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
              <p className="text-muted-foreground text-sm">Fair exchange system for all</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
