'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import type { Feature } from '@/types'

interface FeaturesProps {
  features: Feature[]
  title?: string
  subtitle?: string
  className?: string
}

export default function Features({ 
  features, 
  title = "Recursos Poderosos", 
  subtitle = "Tudo que você precisa para ter sucesso",
  className 
}: FeaturesProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const iconColors = {
    primary: 'bg-[#E11BFF]/10 text-[#E11BFF]',
    secondary: 'bg-[#8217E7]/10 text-[#8217E7]',
    success: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-100 text-yellow-600',
    danger: 'bg-red-100 text-red-600',
  }

  return (
    <section className={cn('py-20 bg-transparent', className)} ref={ref}>
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="group"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card p-8 h-full bg-white/10 backdrop-blur-sm border border-white/20">
                {/* Icon */}
                <motion.div
                  className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center mb-6',
                    iconColors[feature.color as keyof typeof iconColors] || iconColors.primary
                  )}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="w-7 h-7">
                    {/* Placeholder for icon - you can replace with actual icons */}
                    <div className="w-full h-full bg-current rounded" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#E11BFF] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#E11BFF]/5 to-[#3D0099]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explorar Todos os Recursos
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 