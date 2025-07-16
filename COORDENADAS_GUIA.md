# 🎯 Guia de Posicionamento dos Cards

## Como Usar o Sistema de Coordenadas

### 📍 **Passo 1: Ativar o Sistema**
O sistema já está ativo automaticamente! Quando você clica em qualquer lugar da página, as coordenadas aparecem no console do navegador.

### 📍 **Passo 2: Encontrar a Posição Desejada**
1. Abra o console do navegador (F12)
2. Clique exatamente onde você quer que o card vá
3. Anote as coordenadas que aparecem no console

### 📍 **Passo 3: Interpretar as Coordenadas**
```
📍 Coordenadas do Clique:
   X: 136.5px, Y: -98.5px (relativo ao centro)
   CSS calc: left: calc(50% + 136.5px), top: calc(50% - 98.5px)
```

**Significado:**
- **X positivo** = direita do centro
- **X negativo** = esquerda do centro  
- **Y positivo** = abaixo do centro
- **Y negativo** = acima do centro

### 📍 **Passo 4: Aplicar no Código**
No arquivo `src/app/page.tsx`, na seção `cardPositions`, atualize as coordenadas:

```javascript
// Exemplo para a blusa (index 2) mobile:
mobile: {
  2: { x: 136.5, y: -98.5 }, // Blusa - suas coordenadas aqui
}
```

## 🎨 **Posições Sugeridas por Card**

### **Mobile (320px - 768px)**
```javascript
mobile: {
  0: { x: 0, y: 0 },        // Garrafa - centro
  1: { x: -150, y: -100 },  // Urso pelúcia - canto superior esquerdo
  2: { x: 136.5, y: -98.5 }, // Blusa - lado direito (sua posição)
  3: { x: -120, y: 80 },    // Bolsa - canto inferior esquerdo
  4: { x: 100, y: 120 },    // Óculos - canto inferior direito
  5: { x: -80, y: -120 },   // Maquiagem - superior esquerdo
  6: { x: 140, y: 60 },     // Tênis - direito central
  7: { x: -100, y: 140 },   // Boné - inferior esquerdo
  8: { x: 80, y: -140 },    // Creme - superior direito
  9: { x: -140, y: -60 }    // Câmera - esquerdo central
}
```

### **Desktop (1024px+)**
```javascript
desktop: {
  0: { x: 0, y: 0 },        // Garrafa - centro
  1: { x: -200, y: -150 },  // Urso pelúcia - canto superior esquerdo
  2: { x: 180, y: -120 },   // Blusa - lado direito
  3: { x: -160, y: 100 },   // Bolsa - canto inferior esquerdo
  4: { x: 140, y: 160 },    // Óculos - canto inferior direito
  5: { x: -120, y: -180 },  // Maquiagem - superior esquerdo
  6: { x: 200, y: 80 },     // Tênis - direito central
  7: { x: -140, y: 200 },   // Boné - inferior esquerdo
  8: { x: 120, y: -200 },   // Creme - superior direito
  9: { x: -180, y: -100 }   // Câmera - esquerdo central
}
```

## 🔧 **Como Testar**

1. **Abra o site** em `http://localhost:3000`
2. **Abra o console** (F12)
3. **Role a página** até a seção dos cards
4. **Clique onde quer posicionar cada card**
5. **Anote as coordenadas** do console
6. **Atualize o código** com as novas coordenadas
7. **Recarregue a página** para ver o resultado

## 📱 **Dicas para Mobile**

- **Teste em modo mobile** no DevTools (Ctrl+Shift+M)
- **Use coordenadas menores** para mobile (ex: ±100px em vez de ±200px)
- **Considere o tamanho da tela** - mobile tem menos espaço

## 🖥️ **Dicas para Desktop**

- **Use coordenadas maiores** para desktop (ex: ±200px)
- **Teste em diferentes resoluções** (1920x1080, 1366x768, etc.)
- **Considere o espaço disponível** - desktop tem mais área

## 🎯 **Exemplo Prático**

Se você quer a blusa no canto superior direito do retângulo:

1. **Clique no canto superior direito** do retângulo
2. **Console mostra:** `X: 150px, Y: -120px`
3. **Atualize o código:**
   ```javascript
   mobile: {
     2: { x: 150, y: -120 }, // Blusa - canto superior direito
   }
   ```

## ⚡ **Comandos Úteis**

```bash
# Reiniciar servidor na porta 3000
npm run dev

# Ver logs no console
# Abra F12 e veja as mensagens de debug
```

## 🐛 **Debug**

Se algo não funcionar:
1. **Verifique o console** para erros
2. **Confirme as coordenadas** estão corretas
3. **Teste em diferentes tamanhos** de tela
4. **Recarregue a página** após mudanças 