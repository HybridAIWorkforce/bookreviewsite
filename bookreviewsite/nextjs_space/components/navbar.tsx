
'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { BookOpen, Star, User, Menu, X, Coins } from 'lucide-react'
import { useState, useEffect, useCallback, useRef } from 'react'

export function Navbar() {
  const { data: session, status } = useSession() || {}
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [citationBalance, setCitationBalance] = useState<number | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)

  // Fetch user's citation balance when logged in
  useEffect(() => {
    if (session?.user?.id) {
      fetch('/api/dashboard')
        .then(res => res.json())
        .then(data => {
          if (data?.user?.citationBalance !== undefined) {
            setCitationBalance(data.user.citationBalance)
          }
        })
        .catch(err => console.error('Failed to fetch citation balance:', err))
    } else {
      setCitationBalance(null)
    }
  }, [session?.user?.id])

  // Close mobile menu on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && mobileMenuOpen) {
      setMobileMenuOpen(false)
      mobileMenuButtonRef.current?.focus()
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/books', label: 'Books' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/pricing', label: 'AI Tools' },
  ]

  const authenticatedLinks = session ? [
    ...navLinks,
    { href: '/dashboard', label: 'Dashboard' },
  ] : navLinks

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" aria-label="Citeability - Home">
            <div className="relative" aria-hidden="true">
              <BookOpen className="h-8 w-8 text-primary" />
              <Star className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
            </div>
            <span className="text-xl font-bold text-primary" aria-hidden="true">
              Citeability
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {authenticatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <ModeToggle />
            
            {status === 'loading' ? (
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" role="status" aria-label="Loading user session"><span className="sr-only">Loading...</span></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                {/* Citation Balance Display */}
                {citationBalance !== null && (
                  <Link href="/dashboard">
                    <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 hover:border-amber-500/50 transition-all cursor-pointer group" aria-label={`${citationBalance.toLocaleString()} citations`}>
                      <Coins className="h-4 w-4 text-amber-500 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                        {citationBalance.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground hidden lg:inline">Citations</span>
                    </div>
                  </Link>
                )}

                {/* User Info */}
                {session.user && (
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <User className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden sm:inline">{session.user.name || session.user.email}</span>
                      <span className="sm:hidden sr-only">{session.user.name || session.user.email} - Dashboard</span>
                    </Button>
                  </Link>
                )}

                {/* Logout Button */}
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              ref={mobileMenuButtonRef}
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div ref={mobileMenuRef} id="mobile-menu" role="navigation" aria-label="Mobile navigation" className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-3">
              {/* Citation Balance for Mobile */}
              {session && citationBalance !== null && (
                <div className="px-2 py-2 mb-2">
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30" aria-label={`Your citations: ${citationBalance.toLocaleString()}`}>
                      <Coins className="h-5 w-5 text-amber-500" aria-hidden="true" />
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Your Citations</span>
                        <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                          {citationBalance.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {authenticatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-primary px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Logout for Mobile */}
              {session && (
                <div className="px-2 pt-2 border-t mt-2">
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      signOut()
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
