'use client'

import React, { createContext, useContext, useRef } from 'react'

interface CardRefs {
  garrafaRef: React.RefObject<HTMLDivElement>
  ursopeluciaRef: React.RefObject<HTMLDivElement>
  blusaRef: React.RefObject<HTMLDivElement>
  bolsaRef: React.RefObject<HTMLDivElement>
  maquiagemRef: React.RefObject<HTMLDivElement>
  tenisRef: React.RefObject<HTMLDivElement>
  boneRef: React.RefObject<HTMLDivElement>
  relogioRef: React.RefObject<HTMLDivElement>
  cameraRef: React.RefObject<HTMLDivElement>
}

const CardRefsContext = createContext<CardRefs | null>(null)

export const CardRefsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const garrafaRef = useRef<HTMLDivElement>(null)
  const ursopeluciaRef = useRef<HTMLDivElement>(null)
  const blusaRef = useRef<HTMLDivElement>(null)
  const bolsaRef = useRef<HTMLDivElement>(null)
  const maquiagemRef = useRef<HTMLDivElement>(null)
  const tenisRef = useRef<HTMLDivElement>(null)
  const boneRef = useRef<HTMLDivElement>(null)
  const relogioRef = useRef<HTMLDivElement>(null)
  const cameraRef = useRef<HTMLDivElement>(null)

  const cardRefs: CardRefs = {
    garrafaRef,
    ursopeluciaRef,
    blusaRef,
    bolsaRef,
    maquiagemRef,
    tenisRef,
    boneRef,
    relogioRef,
    cameraRef
  }

  return (
    <CardRefsContext.Provider value={cardRefs}>
      {children}
    </CardRefsContext.Provider>
  )
}

export const useCardRefs = () => {
  const context = useContext(CardRefsContext)
  if (!context) {
    throw new Error('useCardRefs must be used within a CardRefsProvider')
  }
  return context
} 