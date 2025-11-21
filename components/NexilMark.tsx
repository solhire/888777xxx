import React from 'react';

export const NexilMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    role="img"
    aria-label="NEXIL mark"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="nexil-accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7F66FF" />
        <stop offset="100%" stopColor="#4C2CFF" />
      </linearGradient>
    </defs>
    <path
      d="M14 14v92h34l24-46v46h34V14H76L52 60V14H14Z"
      fill="currentColor"
    />
    <path
      d="M38 80l26-45 26 45-26 25z"
      fill="url(#nexil-accent)"
    />
  </svg>
);