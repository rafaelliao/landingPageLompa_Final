'use client';

import { useScrollMonitor } from '../hooks/useScrollMonitor';

interface ScrollMonitorProps {
  enabled?: boolean;
}

export const ScrollMonitor: React.FC<ScrollMonitorProps> = ({ enabled = true }) => {
  if (enabled) {
    useScrollMonitor();
  }
  
  return null; // Componente não renderiza nada visualmente
}; 