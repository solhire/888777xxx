import React from 'react';

export const ZShard: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 1080 1080" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main body - now uses current text color or specific class */}
    <path 
      d="M250.692 216L135 882.414H336.03L375.521 795.098L322.518 525.938L653.97 896.727L866.958 828.375L915 266.934L672.71 185L629.948 587.532L351.521 277.215L250.692 216Z" 
      className="fill-current text-z-card"
    />
    {/* Accent shard */}
    <path 
      d="M336.03 882.414L301.41 706.644L653.97 896.727L795.888 867.86L336.03 525.938V882.414Z" 
      className="fill-z-violet-base"
    />
  </svg>
);
