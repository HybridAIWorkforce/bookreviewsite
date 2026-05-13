
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle, Video, FileText, Mic, Crown } from 'lucide-react'
import { PayPalSubscribeButton } from '@/components/pricing/paypal-subscribe-button'

const tools = [
  {
    id: 'book-to-video',
    name: 'Book-to-Video AI',
    icon: Video,
    price: 29.99,
    description: 'Transform your book content into engaging video presentations',
    features: [
      'AI-generated video content from your book',
      'Multiple video styles and templates',
      'HD quality export (1080p)',
      'Custom branding options',
      'Automated subtitles and captions',
      'Social media optimization'
    ],
    color: 'from-red-500 to-pink-500',
    popular: false
  },
  {
    id: 'book-to-article',
    name: 'Book-to-Article AI',
    icon: FileText,
    price: 19.99,
    description: 'Convert your books into compelling blog articles and web content',
    features: [
      'AI-generated articles from chapters',
      'SEO-optimized content',
      'Multiple writing styles',
      'Keyword integration',
      'Content calendar suggestions',
      'Publishing platform integration'
    ],
    color: 'from-blue-500 to-cyan-500',
    popular: true
  },
  {
    id: 'book-to-podcast',
    name: 'Book-to-Podcast AI',
    icon: Mic,
    price: 24.99,
    description: 'Create podcast episodes and audio content from your books',
    features: [
      'AI voice narration options',
      'Episode script generation',
      'Audio editing and enhancement',
      'Intro/outro customization',
      'Multi-format export',
      'Podcast platform optimization'
    ],
    color: 'from-green-500 to-emerald-500',
    popular: false
  }
]

export function ToolsGrid() {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your AI Tools</h2>
          <p className="text-lg text-muted-foreground">
            Select the tools that best fit your content marketing strategy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative tech-card rounded-2xl p-8 ${tool.popular ? 'ring-2 ring-primary' : ''}`}
            >
              {tool.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Crown className="h-4 w-4 mr-1" aria-hidden="true" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${tool.color} mb-6`}>
                <tool.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-2">{tool.name}</h3>
              <p className="text-muted-foreground mb-6">{tool.description}</p>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">${tool.price}</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tool.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <PayPalSubscribeButton
                toolId={tool.id}
                toolName={tool.name}
                price={tool.price}
                popular={tool.popular}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
