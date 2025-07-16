// Script para mostrar coordenadas de clique no navegador
// Cole este código no console do navegador (F12 > Console)

console.log('🎯 Script de coordenadas ativado! Clique em qualquer lugar para ver as coordenadas.');

// Remover listener anterior se existir
if (window.coordenadasListener) {
    document.removeEventListener('click', window.coordenadasListener);
}

// Função para mostrar coordenadas
function mostrarCoordenadas(event) {
    const x = event.clientX;
    const y = event.clientY;
    const pageX = event.pageX;
    const pageY = event.pageY;
    
    // Calcular posição relativa ao centro da tela
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const relativeX = x - centerX;
    const relativeY = y - centerY;
    
    console.log('📍 Coordenadas do Clique:');
    console.log(`   X: ${x}px, Y: ${y}px (viewport)`);
    console.log(`   PageX: ${pageX}px, PageY: ${pageY}px (página)`);
    console.log(`   Relativo ao centro: X: ${relativeX}px, Y: ${relativeY}px`);
    console.log(`   CSS calc: left: calc(50% ${relativeX >= 0 ? '+' : ''}${relativeX}px), top: calc(50% ${relativeY >= 0 ? '+' : ''}${relativeY}px)`);
    
    // Mostrar visualmente no elemento clicado
    const elemento = event.target;
    const originalBackground = elemento.style.backgroundColor;
    const originalOutline = elemento.style.outline;
    
    elemento.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
    elemento.style.outline = '2px solid red';
    
    setTimeout(() => {
        elemento.style.backgroundColor = originalBackground;
        elemento.style.outline = originalOutline;
    }, 1000);
    
    // Criar marcador visual temporário
    const marcador = document.createElement('div');
    marcador.style.cssText = `
        position: fixed;
        left: ${x - 10}px;
        top: ${y - 10}px;
        width: 20px;
        height: 20px;
        background: red;
        border: 2px solid white;
        border-radius: 50%;
        z-index: 10000;
        pointer-events: none;
        animation: pulse 2s ease-out;
    `;
    
    // Adicionar CSS para animação
    if (!document.getElementById('coordenadas-styles')) {
        const style = document.createElement('style');
        style.id = 'coordenadas-styles';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                100% { transform: scale(2); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(marcador);
    
    setTimeout(() => {
        document.body.removeChild(marcador);
    }, 2000);
}

// Adicionar listener de clique
window.coordenadasListener = mostrarCoordenadas;
document.addEventListener('click', window.coordenadasListener);

// Função para desativar o script
window.desativarCoordenadas = function() {
    if (window.coordenadasListener) {
        document.removeEventListener('click', window.coordenadasListener);
        console.log('❌ Script de coordenadas desativado.');
    }
};

console.log('✅ Script ativo! Use window.desativarCoordenadas() para desativar.');
console.log('💡 Dica: As coordenadas "Relativo ao centro" são úteis para posicionar cards.'); 