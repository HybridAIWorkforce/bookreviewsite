'use client'

import { motion } from 'framer-motion'
import { Target, Globe, Lightbulb } from 'lucide-react'

export function MissionSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background" aria-labelledby="mission-heading">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="mission-heading" className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We believe every author deserves a fair chance to get their work discovered. Our platform creates a balanced ecosystem where authors support each other through honest reviews.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Target className="h-16 w-16 text-primary mx-auto mb-6" aria-hidden="true" />
            <h3 className="text-xl font-semibold mb-4">Fair Exchange</h3>
            <p className="text-muted-foreground">
              Our citation-based system ensures everyone contributes to the community before requesting reviews, creating a sustainable and fair ecosystem.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Globe className="h-16 w-16 text-primary mx-auto mb-6" aria-hidden="true" />
            <h3 className="text-xl font-semibold mb-4">Global Community</h3>
            <p className="text-muted-foreground">
              Connect with authors from around the world, discover new genres, and expand your readership across different markets and cultures.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Lightbulb className="h-16 w-16 text-primary mx-auto mb-6" aria-hidden="true" />
            <h3 className="text-xl font-semibold mb-4">Growth Focused</h3>
            <p className="text-muted-foreground">
              Beyond reviews, we provide AI-powered tools to help you transform your content into multiple formats and reach wider audiences.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
