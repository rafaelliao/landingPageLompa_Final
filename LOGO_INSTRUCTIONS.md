# 🎨 Guia para Implementar seu Logo SVG

## 📋 **Como Implementar seu Logo:**

### **Opção 1: Substituir no Componente Logo (Recomendado)**

1. **Abra o arquivo:** `src/components/Logo.tsx`

2. **Localize a seção comentada:**
   ```tsx
   {/* 
   SUBSTITUA ESTE CONTEÚDO PELO SEU LOGO SVG
   
   Exemplo:
   <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
     <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
   </svg>
   */}
   <span className="text-white font-bold text-sm">L</span>
   ```

3. **Substitua pelo seu código SVG:**
   ```tsx
   <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
     <!-- COLE SEU CÓDIGO SVG AQUI -->
   </svg>
   ```

### **Opção 2: Arquivo SVG Separado**

1. **Cole seu SVG em:** `public/logo.svg`

2. **Atualize o componente Logo:**
   ```tsx
   <img src="/logo.svg" alt="Logo" className="w-5 h-5" />
   ```

### **Opção 3: Inline SVG Direto**

1. **Abra:** `src/components/Logo.tsx`

2. **Substitua todo o conteúdo do div do logo:**
   ```tsx
   <div className={cn(
     'bg-gradient-to-br from-[#E11BFF] to-[#3D0099] rounded-lg flex items-center justify-center',
     sizeClasses[size]
   )}>
     {/* SEU LOGO SVG AQUI */}
   </div>
   ```

## 🎯 **Dicas para SVG Otimizado:**

### **Estrutura Recomendada:**
```svg
<svg 
  width="24" 
  height="24" 
  viewBox="0 0 24 24" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5 text-white"
>
  <path d="..." fill="currentColor"/>
</svg>
```

### **Classes CSS Úteis:**
- `text-white` - Cor branca
- `text-[#E11BFF]` - Cor magenta
- `w-5 h-5` - Tamanho 20px
- `w-6 h-6` - Tamanho 24px
- `w-8 h-8` - Tamanho 32px

### **Cores Disponíveis:**
- `#E11BFF` - Magenta
- `#8217E7` - Roxo claro
- `#7D15E2` - Roxo médio
- `#7111D4` - Roxo escuro
- `#5D0ABD` - Roxo profundo
- `#3D0099` - Roxo quase preto

## 🔧 **Personalizações Avançadas:**

### **Logo com Gradiente:**
```tsx
<svg className="w-5 h-5" viewBox="0 0 24 24">
  <defs>
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style={{stopColor: '#E11BFF'}} />
      <stop offset="100%" style={{stopColor: '#3D0099'}} />
    </linearGradient>
  </defs>
  <path d="..." fill="url(#logoGradient)"/>
</svg>
```

### **Logo Animado:**
```tsx
<motion.svg 
  className="w-5 h-5 text-white" 
  viewBox="0 0 24 24"
  whileHover={{ scale: 1.1, rotate: 5 }}
  transition={{ duration: 0.2 }}
>
  <path d="..." fill="currentColor"/>
</motion.svg>
```

## 📱 **Responsividade:**

O componente Logo já está configurado com 3 tamanhos:
- `size="sm"` - 24px (mobile)
- `size="md"` - 32px (padrão)
- `size="lg"` - 48px (desktop)

## 🚀 **Próximos Passos:**

1. **Cole seu código SVG** no componente Logo
2. **Teste em diferentes tamanhos** (sm, md, lg)
3. **Ajuste as cores** conforme necessário
4. **Verifique a responsividade** em mobile e desktop

## 💡 **Exemplo Completo:**

```tsx
// src/components/Logo.tsx
export default function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <div className={cn(
        'bg-gradient-to-br from-[#E11BFF] to-[#3D0099] rounded-lg flex items-center justify-center',
        sizeClasses[size]
      )}>
        {/* SEU LOGO AQUI */}
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
      <span className="text-xl font-bold gradient-text-custom">Lompa</span>
    </div>
  )
}
```

---

**🎨 Agora é só colar seu código SVG e personalizar!** 