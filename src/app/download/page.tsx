'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DownloadPage() {
  const router = useRouter()

  useEffect(() => {
    // Detectar a plataforma do dispositivo
    const detectPlatform = () => {
      if (typeof window === 'undefined') return 'unknown'
      
      const userAgent = window.navigator.userAgent.toLowerCase()
      
      if (/android/.test(userAgent)) {
        return 'android'
      } else if (/iphone|ipad|ipod/.test(userAgent)) {
        return 'ios'
      }
      
      return 'unknown'
    }

    const platform = detectPlatform()
    let downloadUrl = ''

    // Definir URL baseada na plataforma
    if (platform === 'android') {
      downloadUrl = 'https://play.google.com/store/apps/details?id=com.app.lompamarketplace'
    } else if (platform === 'ios') {
      downloadUrl = 'https://apps.apple.com/in/app/lompa/id6742741600'
    } else {
      // Para desktop ou plataforma desconhecida, mostrar página de escolha
      return
    }

    // Redirecionar para a loja apropriada
    if (downloadUrl) {
      window.location.href = downloadUrl
    }
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FBF7FF',
      fontFamily: 'Inter, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '400px'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#1A1A1A',
          marginBottom: '16px'
        }}>
          Baixando Lompa...
        </h1>
        
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '32px'
        }}>
          Detectando sua plataforma e redirecionando para a loja apropriada...
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '32px'
        }}>
          <a 
            href="https://play.google.com/store/apps/details?id=com.app.lompamarketplace"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 24px',
              backgroundColor: '#E321FF',
              color: '#FBF7FF',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            Google Play
          </a>
          
          <a 
            href="https://apps.apple.com/in/app/lompa/id6742741600"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 24px',
              backgroundColor: '#E321FF',
              color: '#FBF7FF',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            App Store
          </a>
        </div>
      </div>
    </div>
  )
} 