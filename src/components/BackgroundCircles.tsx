'use client'

import { useEffect, useRef } from 'react'

const BackgroundCircles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configurar canvas para tela cheia
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Cores do gradiente da marca
    const colors = [
      { r: 225, g: 27, b: 255, a: 0.03 }, // E11BFF muito sutil
      { r: 255, g: 27, b: 255, a: 0.02 }, // FF1BFF muito sutil
      { r: 255, g: 27, b: 155, a: 0.025 }, // FF1B9B muito sutil
    ]

    // Criar círculos grandes e sutis (estáticos) - bem distribuídos
    const circles = [
      // Círculos grandes - distribuídos pelos cantos e centro
      { x: 0.15, y: 0.15, radius: 0.6, color: colors[0] }, // Superior esquerda
      { x: 0.85, y: 0.15, radius: 0.55, color: colors[1] }, // Superior direita
      { x: 0.15, y: 0.85, radius: 0.5, color: colors[2] }, // Inferior esquerda
      { x: 0.85, y: 0.85, radius: 0.45, color: colors[0] }, // Inferior direita
      { x: 0.5, y: 0.5, radius: 0.7, color: colors[1] }, // Centro
      { x: 0.5, y: 0.05, radius: 0.65, color: colors[2] }, // Topo central
      
      // Círculos médios - distribuídos nas bordas e áreas intermediárias
      { x: 0.3, y: 0.3, radius: 0.35, color: colors[2] }, // Quadrante superior esquerdo
      { x: 0.7, y: 0.3, radius: 0.4, color: colors[0] }, // Quadrante superior direito
      { x: 0.3, y: 0.7, radius: 0.3, color: colors[1] }, // Quadrante inferior esquerdo
      { x: 0.7, y: 0.7, radius: 0.25, color: colors[2] }, // Quadrante inferior direito
      { x: 0.1, y: 0.5, radius: 0.4, color: colors[0] }, // Lateral esquerda
      { x: 0.9, y: 0.5, radius: 0.35, color: colors[1] }, // Lateral direita
      
      // Círculos menores - preenchendo espaços vazios
      { x: 0.25, y: 0.1, radius: 0.2, color: colors[1] }, // Superior esquerda
      { x: 0.75, y: 0.1, radius: 0.15, color: colors[2] }, // Superior direita
      { x: 0.25, y: 0.9, radius: 0.18, color: colors[0] }, // Inferior esquerda
      { x: 0.75, y: 0.9, radius: 0.12, color: colors[1] }, // Inferior direita
      { x: 0.05, y: 0.3, radius: 0.22, color: colors[2] }, // Borda esquerda
      { x: 0.95, y: 0.3, radius: 0.16, color: colors[0] }, // Borda direita
      { x: 0.05, y: 0.7, radius: 0.19, color: colors[1] }, // Borda esquerda inferior
      { x: 0.95, y: 0.7, radius: 0.14, color: colors[2] }, // Borda direita inferior
    ]

    // Função para desenhar círculos
    const drawCircles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      circles.forEach(circle => {
        const x = circle.x * canvas.width
        const y = circle.y * canvas.height
        const radius = circle.radius * Math.min(canvas.width, canvas.height)

        // Criar gradiente radial para cada círculo
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, `rgba(${circle.color.r}, ${circle.color.g}, ${circle.color.b}, ${circle.color.a * 2})`)
        gradient.addColorStop(0.5, `rgba(${circle.color.r}, ${circle.color.g}, ${circle.color.b}, ${circle.color.a})`)
        gradient.addColorStop(1, `rgba(${circle.color.r}, ${circle.color.g}, ${circle.color.b}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Desenhar círculos estáticos
    drawCircles()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'soft-light' }}
    />
  )
}

export default BackgroundCircles 