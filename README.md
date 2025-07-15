# 🚀 Landing Page Lompa - Moderna e Responsiva

Uma landing page moderna e responsiva construída com **Next.js 14**, **TypeScript**, **Framer Motion** e **Tailwind CSS**. Desenvolvida com foco em performance, acessibilidade e experiências de usuário excepcionais.

## ✨ Características

- 🎨 **Design Moderno**: Interface limpa e profissional com gradientes e animações suaves
- 📱 **Totalmente Responsiva**: Funciona perfeitamente em todos os dispositivos
- ⚡ **Performance Otimizada**: Lazy loading, tree-shaking e otimizações avançadas
- 🎭 **Animações Avançadas**: Transições fluidas com Framer Motion
- ♿ **Acessibilidade**: Conformidade com WCAG 2.1 AA
- 🔧 **TypeScript**: Tipagem forte para desenvolvimento mais seguro
- 🎯 **SEO Otimizado**: Meta tags, estrutura semântica e performance

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Framer Motion** - Animações e transições
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones modernos
- **clsx & tailwind-merge** - Utilitários para classes CSS

## 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd LandingPageLompa_Final
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

4. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis
│   ├── Navigation.tsx     # Navegação responsiva
│   ├── Hero.tsx          # Seção hero com animações
│   ├── Features.tsx      # Seção de recursos
│   └── Footer.tsx        # Rodapé
├── lib/                   # Utilitários
│   └── utils.ts          # Funções auxiliares
└── types/                 # Definições TypeScript
    └── index.ts          # Interfaces e tipos
```

## 🎨 Componentes Principais

### Navigation
- Navegação responsiva com menu mobile
- Mudança de estilo no scroll
- Animações suaves de entrada

### Hero
- Seção principal com call-to-action
- Animações de entrada escalonadas
- Elementos flutuantes animados
- Indicador de scroll

### Features
- Grid responsivo de recursos
- Animações de hover
- Cores dinâmicas para ícones
- Detecção de visibilidade

### Footer
- Links organizados por seção
- Informações de contato
- Animações de entrada

## 🚀 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
npm run type-check   # Verificação de tipos TypeScript
```

## 🎯 Personalização

### Cores
As cores podem ser personalizadas no arquivo `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... outras variações
  },
  secondary: {
    50: '#fdf4ff',
    // ... outras variações
  }
}
```

### Animações
As animações são configuradas no `tailwind.config.js` e podem ser customizadas:

```javascript
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.5s ease-out',
  // ... outras animações
}
```

### Dados
Os dados da landing page estão definidos em `src/app/page.tsx` e podem ser facilmente modificados:

```typescript
const heroData: HeroSection = {
  title: 'Seu Título Aqui',
  subtitle: 'Seu Subtítulo',
  // ... outros dados
}
```

## 📱 Responsividade

A landing page é totalmente responsiva com breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Acessibilidade

- Navegação por teclado
- Contraste adequado
- Textos alternativos
- Estrutura semântica
- ARIA labels

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente se necessário
3. Deploy automático a cada push

### Outras Plataformas
```bash
npm run build
npm run start
```

## 📊 Performance

A aplicação é otimizada para performance:

- **Lazy Loading**: Componentes carregados sob demanda
- **Tree Shaking**: Remoção de código não utilizado
- **Image Optimization**: Otimização automática de imagens
- **Code Splitting**: Divisão automática de código
- **Caching**: Estratégias de cache otimizadas

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para contato@lompa.com ou abra uma issue no repositório.

---

Desenvolvido com ❤️ pelo **CursorAgent-FrontEnd** 