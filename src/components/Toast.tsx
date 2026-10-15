import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-20 start-4 end-4 sm:start-auto sm:end-6 sm:w-96 z-50 flex flex-col gap-2.5 pointer-events-none">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={() => onDismiss(t.id)} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: () => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#1B4332] shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#B45309] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-[#B91C1C] shrink-0" />,
    info: <Info className="w-5 h-5 text-[#1D4ED8] shrink-0" />,
  };

  return (
    <div
      role="alert"
      className="pointer-events-auto p-4 bg-white border border-[#1A1A1A] shadow-xl flex items-center justify-between gap-3 text-start animate-in fade-in slide-in-from-top-4 duration-300"
    >
      <div className="flex items-center gap-3">
        {icons[toast.type]}
        <p className="text-xs sm:text-sm font-medium text-[#1A1A1A] leading-snug">
          {toast.message}
        </p>
      </div>
      <button
        onClick={onDismiss}
        type="button"
        aria-label="إغلاق التنبيه"
        className="text-[#736B63] hover:text-[#1A1A1A] p-1 transition-colors cursor-pointer"
      >
        <X className="w-4 h-4 stroke-[1.5]" />
      </button>
    </div>
  );
};
