# Script para iniciar o servidor de desenvolvimento de forma estavel
param(
    [switch]$Clean,
    [switch]$Debug,
    [switch]$Stable
)

Write-Host "Iniciando servidor de desenvolvimento..." -ForegroundColor Green

# Funcao para limpar cache
function Clear-Cache {
    Write-Host "Limpando cache..." -ForegroundColor Yellow
    if (Test-Path ".next") {
        Remove-Item -Recurse -Force ".next"
        Write-Host "Cache limpo" -ForegroundColor Green
    }
    if (Test-Path "node_modules/.cache") {
        Remove-Item -Recurse -Force "node_modules/.cache"
        Write-Host "Cache do node_modules limpo" -ForegroundColor Green
    }
}

# Funcao para verificar se a porta 3000 esta em uso
function Test-Port {
    $port = 3000
    $connections = netstat -ano | findstr ":$port"
    if ($connections) {
        Write-Host "Porta $port esta em uso. Tentando liberar..." -ForegroundColor Yellow
        $connections | ForEach-Object {
            $parts = $_ -split '\s+'
            if ($parts.Length -ge 5) {
                $processId = $parts[4]
                try {
                    taskkill /F /PID $processId 2>$null
                    Write-Host "Processo $processId encerrado" -ForegroundColor Green
                } catch {
                    Write-Host "Nao foi possivel encerrar processo $processId" -ForegroundColor Red
                }
            }
        }
        Start-Sleep -Seconds 2
    }
}

# Funcao para iniciar o servidor
function Start-DevServer {
    param($Mode)
    
    switch ($Mode) {
        "debug" {
            Write-Host "Iniciando em modo debug..." -ForegroundColor Cyan
            $env:NODE_OPTIONS = "--inspect"
            npm run dev:debug
        }
        "stable" {
            Write-Host "Iniciando em modo estavel..." -ForegroundColor Cyan
            $env:NODE_OPTIONS = "--max-old-space-size=4096"
            npm run dev:stable
        }
        default {
            Write-Host "Iniciando em modo turbo..." -ForegroundColor Cyan
            npm run dev
        }
    }
}

# Executar limpeza se solicitado
if ($Clean) {
    Clear-Cache
}

# Verificar porta
Test-Port

# Determinar modo de execucao
$mode = "default"
if ($Debug) { $mode = "debug" }
if ($Stable) { $mode = "stable" }

# Iniciar servidor
try {
    Start-DevServer -Mode $mode
} catch {
    Write-Host "Erro ao iniciar servidor: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Tente executar: .\start-dev.ps1 -Clean" -ForegroundColor Yellow
    exit 1
} 