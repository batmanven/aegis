"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { NeonButton } from './NeonButton';
import { X, ShieldAlert, Info, CheckCircle2 } from 'lucide-react';

interface SystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'info' | 'danger' | 'success';
}

export const SystemModal = ({ isOpen, onClose, title, message, type = 'info' }: SystemModalProps) => {
  const icons = {
    info: <Info className="text-primary w-8 h-8" />,
    danger: <ShieldAlert className="text-danger w-8 h-8" />,
    success: <CheckCircle2 className="text-success w-8 h-8" />,
  };

  const glows = {
    info: 'primary',
    danger: 'danger',
    success: 'primary', // Use primary for success glow
  } as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md z-10"
          >
            <GlassCard className="p-8 relative overflow-hidden" glow={glows[type]}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center space-y-6">
                <div className={`p-4 rounded-full bg-white/5 border border-white/10 aegis-glow-${type === 'info' ? 'primary' : type}`}>
                  {icons[type]}
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase italic tracking-tight">{title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed uppercase tracking-widest font-bold">
                    {message}
                  </p>
                </div>

                <NeonButton
                  onClick={onClose}
                  variant={type === 'danger' ? 'danger' : 'primary'}
                  className="w-full"
                >
                  Acknowledge Protocol
                </NeonButton>
              </div>

              {/* Decorative scanline */}
              <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="w-full h-1 bg-white animate-scan" />
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
