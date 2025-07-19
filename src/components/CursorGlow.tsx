'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const updateMousePosition = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const updateCursorPosition = () => {
      // Suavizar o movimento do cursor
      cursorX += (mouseX - cursorX) * 0.1
      cursorY += (mouseY - cursorY) * 0.1

      cursor.style.left = `${cursorX}px`
      cursor.style.top = `${cursorY}px`
    }

    const animate = () => {
      updateCursorPosition()
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', updateMousePosition)
    animate()

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
              className="fixed pointer-events-none z-20 w-[300px] h-[300px] rounded-full opacity-40 blur-2xl"
      style={{
        background: 'radial-gradient(circle, rgba(227, 27, 255, 0.6) 0%, rgba(130, 23, 231, 0.4) 30%, rgba(72, 7, 173, 0.2) 60%, transparent 100%)',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.3s ease'
      }}
    />
  )
} 