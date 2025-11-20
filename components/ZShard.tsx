import React from 'react';

export const ZShard: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 0L0 24H6L16 0H10Z" fill="currentColor" />
    <path d="M18 0L8 24H14L24 0H18Z" fill="#B46CFF" className="opacity-80" />
  </svg>
);