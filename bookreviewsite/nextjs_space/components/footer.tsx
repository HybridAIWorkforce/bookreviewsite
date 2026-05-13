
import Link from 'next/link'
import { BookOpen, Star } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur" role="contentinfo">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4" aria-label="Citeability - Home">
              <div className="relative" aria-hidden="true">
                <BookOpen className="h-8 w-8 text-primary" />
                <Star className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
              </div>
              <span className="text-xl font-bold text-primary" aria-hidden="true">
                Citeability
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Connecting authors through honest book reviews. Earn citations by reviewing, get reviews for your books.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  AI Tools
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Citeability. Built for authors, by authors.</p>
        </div>
      </div>
    </footer>
  )
}
