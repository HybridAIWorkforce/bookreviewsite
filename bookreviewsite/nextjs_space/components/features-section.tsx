'use client'

import { motion } from 'framer-motion'
import { Star, BookOpen, Users, Zap, Shield, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Star,
    title: 'Citation-Based Exchange',
    description: 'Earn citations by reviewing books, spend citations to get your books reviewed. Fair and balanced system.'
  },
  {
    icon: BookOpen,
    title: 'Quality Reviews',
    description: 'Get detailed, honest reviews from fellow authors who understand the craft.'
  },
  {
    icon: Users,
    title: 'Author Community',
    description: 'Connect with like-minded authors and build lasting relationships.'
  },
  {
    icon: Zap,
    title: 'AI-Powered Tools',
    description: 'Transform your books into videos, articles, and podcasts with our AI tools.'
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Moderated platform ensures quality interactions and protects against spam.'
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Audience',
    description: 'Increase visibility and reach new readers through authentic reviews.'
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50" aria-labelledby="features-heading">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Powerful Features for Authors
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to grow your author platform and connect with readers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="tech-card rounded-xl p-6 group hover:shadow-lg transition-all duration-300"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
