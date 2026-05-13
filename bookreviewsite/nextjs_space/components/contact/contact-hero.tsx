'use client'

import { motion } from 'framer-motion'
import { Mail, MessageSquare, HelpCircle } from 'lucide-react'

export function ContactHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-primary/10" aria-labelledby="contact-hero-heading">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 id="contact-hero-heading" className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Have questions about our platform? Need help with reviews? We're here to support authors every step of the way.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list" aria-label="Contact options">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="tech-card rounded-xl p-6"
              role="listitem"
            >
              <Mail className="h-12 w-12 text-blue-500 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">General Inquiries</h3>
              <p className="text-muted-foreground text-sm">Questions about the platform</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="tech-card rounded-xl p-6"
              role="listitem"
            >
              <HelpCircle className="h-12 w-12 text-green-500 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">Technical Support</h3>
              <p className="text-muted-foreground text-sm">Need help with your account</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="tech-card rounded-xl p-6"
              role="listitem"
            >
              <MessageSquare className="h-12 w-12 text-purple-500 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">Partnership</h3>
              <p className="text-muted-foreground text-sm">Collaborate with us</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
