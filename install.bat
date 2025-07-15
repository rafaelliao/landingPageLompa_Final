@echo off
echo ========================================
echo    Landing Page Lompa - Instalacao
echo ========================================
echo.

echo [1/4] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    echo Por favor, instale o Node.js em: https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js encontrado

echo.
echo [2/4] Instalando dependencias...
npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias!
    pause
    exit /b 1
)
echo ✓ Dependencias instaladas com sucesso

echo.
echo [3/4] Verificando tipos TypeScript...
npm run type-check
if %errorlevel% neq 0 (
    echo AVISO: Alguns erros de tipo encontrados (normal na primeira execucao)
)

echo.
echo [4/4] Iniciando servidor de desenvolvimento...
echo.
echo ========================================
echo    Servidor iniciado com sucesso!
echo    Acesse: http://localhost:3000
echo ========================================
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

npm run dev 