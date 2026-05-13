'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-primary/10" aria-labelledby="cta-heading">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="tech-card rounded-2xl p-12 text-center"
        >
          <Sparkles className="h-16 w-16 text-primary mx-auto mb-6" aria-hidden="true" />
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Review Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of authors and start building meaningful connections through honest book reviews.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="text-lg px-8 py-4 group">
              Join Now - It&apos;s Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
