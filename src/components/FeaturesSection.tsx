'use client'


import type { Feature } from '@/types'

interface FeaturesSectionProps {
  features: Feature[]
  className?: string
}

const FeaturesSection = ({ features, className = '' }: FeaturesSectionProps) => {
  return (
    <section className={`features-section ${className}`}>
      <div className="features-container">
        {/* Cabeçalho da seção */}
        <div className="features-header">
          <h2 className="features-title">
            Recursos Poderosos
          </h2>
          <p className="features-subtitle">
            Tudo que você precisa para transformar seu negócio digital
          </p>
        </div>

        {/* Grid de recursos */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="feature-card"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection 