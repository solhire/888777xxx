import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-display font-bold italic uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-z-bg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";
  
  const variants = {
    primary: `
      bg-z-violet-base text-white border border-transparent
      hover:bg-z-violet-base/90 hover:shadow-[0_0_20px_rgba(109,40,217,0.5)]
      focus:ring-z-violet-base
    `,
    secondary: `
      bg-white text-black border border-transparent
      hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
      focus:ring-white
    `,
    outline: `
      bg-transparent text-white border border-white/20
      hover:border-z-violet-base hover:text-z-violet-peak hover:bg-z-violet-base/10
      focus:ring-z-violet-base
    `,
    ghost: `
      bg-transparent text-z-text-secondary
      hover:text-white hover:bg-white/5
      focus:ring-white/20
    `
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const widthClass = fullWidth ? 'w-full' : '';

  // Clip path style for that "cyber" look
  const clipStyle = {
    clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      style={variant !== 'ghost' ? clipStyle : undefined}
      {...props}
    >
      {/* Hover Glint Effect for Primary/Secondary */}
      {(variant === 'primary' || variant === 'secondary') && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
      )}
      
      <span className="relative z-20 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};
