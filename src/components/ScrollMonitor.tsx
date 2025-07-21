'use client';

import { useScrollMonitor } from '../hooks/useScrollMonitor';

interface ScrollMonitorProps {
  enabled?: boolean;
}

export const ScrollMonitor: React.FC<ScrollMonitorProps> = ({ enabled = true }) => {
  const scrollMonitor = useScrollMonitor();
  
  // Se não estiver habilitado, não faz nada
  if (!enabled) {
    return null;
  }
  
  return null; // Componente não renderiza nada visualmente
}; 