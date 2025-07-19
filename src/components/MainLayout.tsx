'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface MainLayoutProps {
  children: ReactNode
  className?: string
}

const MainLayout = ({ children, className = '' }: MainLayoutProps) => {
  return (
    <div className={`main-layout ${className}`}>
      {/* Container principal centralizado */}
      <div className="main-container">
        {children}
      </div>
    </div>
  )
}

export default MainLayout 