'use client'

import React, { createContext, useContext, ReactNode, useMemo } from 'react'
import { useResponsive } from '@/hooks/useResponsive'

type MobileContextType = ReturnType<typeof useResponsive>;

const MobileContext = createContext<MobileContextType | undefined>(undefined)

interface MobileProviderProps {
  children: ReactNode
}

export function MobileProvider({ children }: MobileProviderProps) {
  const responsiveConfig = useResponsive()

  // Memoizar o valor do contexto para evitar re-renderizações desnecessárias
  const value = useMemo<MobileContextType>(() => ({
    ...responsiveConfig
  }), [responsiveConfig])

  return (
    <MobileContext.Provider value={value}>
      {children}
    </MobileContext.Provider>
  )
}

export function useMobile() {
  const context = useContext(MobileContext)
  if (context === undefined) {
    throw new Error('useMobile must be used within a MobileProvider')
  }
  return context
} 