
import React from 'react';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`liquid-glass inner-highlight rounded-3xl overflow-hidden transition-all duration-300 hover:bg-white/[0.08] ${className}`}>
      {children}
    </div>
  );
};
