'use client'

import { motion } from 'framer-motion'
import type { Feature } from '@/types'

interface FeaturesSectionProps {
  features: Feature[]
  className?: string
}

const FeaturesSection = ({ features, className = '' }: FeaturesSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className={`features-section ${className}`}>
      <div className="features-container">
        {/* Cabeçalho da seção */}
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="features-title">
            Recursos Poderosos
          </h2>
          <p className="features-subtitle">
            Tudo que você precisa para transformar seu negócio digital
          </p>
        </motion.div>

        {/* Grid de recursos */}
        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="feature-icon">
                <div className={`icon-bg icon-${feature.color}`}>
                  {/* Ícone placeholder */}
                  <div className="icon-placeholder">
                    {feature.icon.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection 