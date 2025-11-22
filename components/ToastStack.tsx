import React from 'react';
import { useToast } from '../context/ToastContext';

const variantStyles = {
  success: 'border-green-500/50 text-green-100 bg-green-900/20',
  info: 'border-z-violet-base/50 text-white bg-z-violet-base/10',
  error: 'border-red-500/50 text-red-100 bg-red-900/20',
};

export const ToastStack: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-24 left-4 z-[100] space-y-3 max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`backdrop-blur-md border px-6 py-4 text-sm font-mono shadow-2xl animate-fade-in rounded-lg relative overflow-hidden ${variantStyles[toast.variant]}`}
        >
          <div className="absolute left-0 top-0 h-full w-1 bg-current opacity-50" />
          <div className="flex items-start justify-between gap-4">
            <span className="font-medium tracking-wide">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-xs opacity-50 hover:opacity-100 transition-opacity -mt-1 -mr-2 p-2"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
