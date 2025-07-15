'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { HeroSection } from '@/types'

interface HeroProps {
  data: HeroSection
  className?: string
}

export default function Hero({ data, className }: HeroProps) {
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

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className={cn('relative min-h-screen flex items-center pt-20 overflow-hidden', className)}>
      {/* Background Gradient - Removido pois está no body */}
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-[#E11BFF] rounded-full opacity-20"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-[#8217E7] rounded-full opacity-20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-12 h-12 bg-[#7D15E2] rounded-full opacity-30"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-[#E11BFF]/10 text-[#E11BFF] px-4 py-2 rounded-full text-sm font-medium"
              variants={itemVariants}
            >
              <Star className="w-4 h-4 fill-current" />
              <span>{data.subtitle}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl lg:text-6xl font-bold text-white leading-tight"
              variants={itemVariants}
            >
              {data.title.split(' ').map((word, index) => (
                <span key={index} className="inline-block">
                  {word}{' '}
                </span>
              ))}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl text-white/80 leading-relaxed max-w-lg"
              variants={itemVariants}
            >
              {data.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.button
                className="btn-primary group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {data.ctaPrimary}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                className="btn-secondary group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5 mr-2" />
                {data.ctaSecondary}
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              className="flex items-center space-x-6 pt-8"
              variants={itemVariants}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-[#E11BFF] to-[#3D0099]"
                  />
                ))}
              </div>
              <div className="text-sm text-white/80">
                <span className="font-semibold text-white">+2.5k</span> usuários confiam em nós
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            variants={itemVariants}
          >
            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-[#E11BFF] to-[#3D0099] rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E11BFF]/20 to-[#3D0099]/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 fill-current" />
                    </div>
                    <p className="text-lg font-medium">Demonstração Interativa</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#8217E7] rounded-full opacity-50" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#E11BFF] rounded-full opacity-50" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ border: '2px solid rgba(255, 255, 255, 0.3)' }}
        >
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  )
} 