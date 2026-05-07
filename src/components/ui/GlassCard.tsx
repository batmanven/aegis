import React from 'react';
import { cn } from '@/lib/utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'primary' | 'danger' | 'warning' | 'none';
}

export const GlassCard = ({ children, className, glow = 'none' }: GlassCardProps) => {
  const glowStyles = {
    primary: 'hover:shadow-[0_0_30px_rgba(0,209,255,0.3)] border-primary/20',
    danger: 'hover:shadow-[0_0_30px_rgba(255,59,59,0.3)] border-danger/20',
    warning: 'hover:shadow-[0_0_30px_rgba(255,176,0,0.3)] border-warning/20',
    none: 'border-white/10'
  };

  return (
    <div className={cn(
      "glass-panel rounded-xl overflow-hidden transition-all duration-500",
      glowStyles[glow],
      className
    )}>
      {children}
    </div>
  );
};
