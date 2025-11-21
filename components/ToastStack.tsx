import React from 'react';
import { useToast } from '../context/ToastContext';

const variantStyles = {
  success: 'border-green-400 text-green-200',
  info: 'border-z-violet-base text-white',
  error: 'border-z-violet-peak/50 text-white bg-gradient-to-r from-z-violet-base/20 to-z-violet-peak/20 shadow-[0_0_20px_rgba(180,108,255,0.4)]',
};

export const ToastStack: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-24 left-4 z-50 space-y-3 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-black/90 border px-4 py-3 text-sm font-mono shadow-lg animate-fade-in ${variantStyles[toast.variant]}`}
        >
          <div className="flex items-start justify-between gap-4">
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-xs text-z-steel-gray hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

