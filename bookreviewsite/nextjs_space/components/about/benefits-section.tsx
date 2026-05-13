'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const benefits = [
  'Get honest, constructive feedback from fellow authors',
  'Build genuine relationships within the author community',
  'Increase your book\'s visibility and reach new readers',
  'Learn about new books and genres to expand your reading',
  'Access AI-powered tools to amplify your content marketing',
  'Fair citation-based system ensures quality interactions',
  'Safe and moderated platform protects against spam',
  'Mobile-friendly platform accessible anywhere, anytime'
]

export function BenefitsSection() {
  return (
    <section className="py-20" aria-labelledby="benefits-heading">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold mb-4">Why Choose Citeability?</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of authors who are already growing their readership
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0">
          {benefits.map((benefit, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-3"
            >
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-muted-foreground">{benefit}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
