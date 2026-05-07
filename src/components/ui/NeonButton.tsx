"use client"
import { cn } from '@/lib/utils/cn';
import { motion, HTMLMotionProps } from 'framer-motion';

interface NeonButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'danger' | 'warning' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const NeonButton = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: NeonButtonProps) => {
  const variants = {
    primary: "bg-primary text-background aegis-glow-primary hover:brightness-110",
    danger: "bg-danger text-white aegis-glow-danger hover:brightness-110",
    warning: "bg-warning text-background hover:shadow-[0_0_20px_rgba(255,176,0,0.4)]",
    outline: "bg-transparent border border-primary text-primary hover:bg-primary/10"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs font-bold uppercase tracking-wider",
    md: "px-6 py-2.5 text-sm font-bold uppercase tracking-wider",
    lg: "px-8 py-3.5 text-base font-bold uppercase tracking-wider"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-md transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
