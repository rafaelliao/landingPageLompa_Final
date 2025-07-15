export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  period: string
  features: string[]
  popular?: boolean
  cta: string
}

export interface NavItem {
  label: string
  href: string
  external?: boolean
}

export interface HeroSection {
  title: string
  subtitle: string
  description: string
  ctaPrimary: string
  ctaSecondary: string
  image: string
}

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterSection {
  title: string
  links: FooterLink[]
} 