'use client'

import { motion } from 'framer-motion'
import { Upload, Search, PenTool, Award } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Submit Your Book',
    description: 'Upload your book details, cover, and description to get started.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Search,
    title: 'Browse & Review',
    description: 'Find interesting books from other authors and write honest reviews.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Award,
    title: 'Earn Citations',
    description: 'Earn 25-150+ Citations per review based on quality, length, and verification status.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: PenTool,
    title: 'Get Reviewed',
    description: 'Spend your earned citations to get your own books reviewed by others.',
    color: 'from-green-500 to-emerald-500'
  }
]

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of authors in our fair review exchange system
          </p>
        </motion.div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 list-none p-0">
          {steps.map((step, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="text-center">
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${step.color} mb-4`} aria-hidden="true">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {/* Connection Line - decorative */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform translate-x-2" aria-hidden="true" />
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
