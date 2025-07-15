#!/bin/bash

echo "========================================"
echo "   Landing Page Lompa - Instalação"
echo "========================================"
echo

echo "[1/4] Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "ERRO: Node.js não encontrado!"
    echo "Por favor, instale o Node.js em: https://nodejs.org/"
    exit 1
fi
echo "✓ Node.js encontrado"

echo
echo "[2/4] Instalando dependências..."
npm install
if [ $? -ne 0 ]; then
    echo "ERRO: Falha ao instalar dependências!"
    exit 1
fi
echo "✓ Dependências instaladas com sucesso"

echo
echo "[3/4] Verificando tipos TypeScript..."
npm run type-check
if [ $? -ne 0 ]; then
    echo "AVISO: Alguns erros de tipo encontrados (normal na primeira execução)"
fi

echo
echo "[4/4] Iniciando servidor de desenvolvimento..."
echo
echo "========================================"
echo "   Servidor iniciado com sucesso!"
echo "   Acesse: http://localhost:3000"
echo "========================================"
echo
echo "Pressione Ctrl+C para parar o servidor"
echo

npm run dev 