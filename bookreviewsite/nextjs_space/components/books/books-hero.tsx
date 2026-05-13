'use client'

import { motion } from 'framer-motion'
import { Search, BookOpen, Filter } from 'lucide-react'

export function BooksHero() {
  return (
    <section className="py-16 bg-gradient-to-br from-background via-background to-primary/10" aria-labelledby="books-hero-heading">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 id="books-hero-heading" className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Discover Amazing Books
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse books from talented authors. Write reviews to earn citations and get your own books reviewed.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list" aria-label="Browse options">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="tech-card rounded-xl p-6"
              role="listitem"
            >
              <Search className="h-10 w-10 text-blue-500 mx-auto mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">Discover</h3>
              <p className="text-muted-foreground text-sm">Find your next great read</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="tech-card rounded-xl p-6"
              role="listitem"
            >
              <BookOpen className="h-10 w-10 text-green-500 mx-auto mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">Review</h3>
              <p className="text-muted-foreground text-sm">Write honest reviews</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="tech-card rounded-xl p-6"
              role="listitem"
            >
              <Filter className="h-10 w-10 text-purple-500 mx-auto mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">Filter</h3>
              <p className="text-muted-foreground text-sm">Find books by genre</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
