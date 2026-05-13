'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Star, Users, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/10 py-20 md:py-32" aria-labelledby="hero-heading">
      {/* Animated background elements - decorative */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 animate-float">
          <BookOpen className="h-8 w-8 text-primary/40" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <Star className="h-6 w-6 text-yellow-500/40" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float" style={{ animationDelay: '4s' }}>
          <Users className="h-10 w-10 text-primary/30" />
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 id="hero-heading" className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
            Build Trust and
            <br />
            <span className="text-primary">Visibility Through Reviews</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Gain credibility and stand out on major online bookstores with authentic, verified reader reviews.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-4 group">
                Start Reviewing
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/books">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Browse Books
              </Button>
            </Link>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            role="list"
            aria-label="Platform statistics"
          >
            <div className="tech-card rounded-xl p-6 text-center" role="listitem">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-3" aria-hidden="true" />
              <h3 className="text-2xl font-bold mb-2">1,000+</h3>
              <p className="text-muted-foreground">Books Available</p>
            </div>
            <div className="tech-card rounded-xl p-6 text-center" role="listitem">
              <Users className="h-12 w-12 text-primary mx-auto mb-3" aria-hidden="true" />
              <h3 className="text-2xl font-bold mb-2">500+</h3>
              <p className="text-muted-foreground">Active Authors</p>
            </div>
            <div className="tech-card rounded-xl p-6 text-center" role="listitem">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-3" aria-hidden="true" />
              <h3 className="text-2xl font-bold mb-2">5,000+</h3>
              <p className="text-muted-foreground">Reviews Exchanged</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
