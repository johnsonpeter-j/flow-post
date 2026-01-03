'use client';

import { CheckCircle2 } from 'lucide-react';
import type { Toast as ToastType } from './types';

interface ToastProps {
  toast: ToastType | null;
}

export default function Toast({ toast }: ToastProps) {
  if (!toast) return null;

  return (
    <div
      className="toast fixed bottom-5 left-1/2 -translate-x-1/2 bg-white border border-[#E5E7EB] border-l-4 rounded-lg py-2.5 px-4 flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.1)] animate-[slideUp_0.3s_ease] z-[100]"
      style={{ borderLeftColor: toast.client?.color }}
    >
      <CheckCircle2 size={16} className="text-[#10B981] shrink-0" />
      <span className="text-[0.8rem] text-[#374151]">{toast.message}</span>
    </div>
  );
}





