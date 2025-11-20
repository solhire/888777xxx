import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative font-display font-bold uppercase tracking-widest transform -skew-x-6 transition-all duration-200 flex items-center justify-center group overflow-hidden active:scale-95";
  
  const variants = {
    primary: "bg-z-violet-base hover:bg-z-violet-peak text-white shadow-[0_0_15px_rgba(106,0,255,0.4)] hover:shadow-[0_0_25px_rgba(180,108,255,0.6)]",
    secondary: "bg-z-steel-gray hover:bg-z-onyx text-z-black",
    outline: "border border-z-violet-base text-z-violet-base hover:bg-z-violet-base/10 hover:text-z-violet-peak",
  };

  const sizes = {
    sm: "px-4 py-1 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Inner content un-skewed */}
      <span className="block transform skew-x-6">
        {children}
      </span>
    </button>
  );
};