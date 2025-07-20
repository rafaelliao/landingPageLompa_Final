/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de imagem
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: false,
  },
  
  // Configurações do compilador
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Otimizações de performance
  swcMinify: true,
  
  // Configurações de desenvolvimento
  experimental: {
    // Melhorar estabilidade do hot reload
    optimizePackageImports: ['gsap'],
  },
  
  // Configurações de webpack para estabilidade
  webpack: (config, { dev, isServer }) => {
    // Otimizações para desenvolvimento
    if (dev && !isServer) {
      // Reduzir warnings desnecessários
      config.stats = 'errors-only'
      
      // Melhorar performance do hot reload
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.git', '**/.next'],
      }
    }
    
    // Otimizações para GSAP - TEMPORARIAMENTE DESABILITADO
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   'gsap': 'gsap/dist/gsap',
    //   'gsap/ScrollTrigger': 'gsap/dist/ScrollTrigger',
    // }
    
    return config
  },
  
  // Configurações de servidor
  serverRuntimeConfig: {
    // Timeout mais longo para evitar desconexões
    maxDuration: 30,
  },
  
  // Configurações de build
  output: 'standalone',
  
  // Configurações de cache
  generateEtags: false,
  
  // Configurações de compressão
  compress: true,
  
  // Configurações de headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 