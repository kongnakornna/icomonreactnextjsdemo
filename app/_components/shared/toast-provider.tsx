'use client';

import { useState, useCallback, createContext, useContext } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';

const Toaster = dynamic(
  () => import('sonner').then((m) => m.Toaster),
  { ssr: false },
);

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastContextValue {
  show: (args: { title: string; message?: string; type?: ToastType }) => void;
  showToast: (message: string, type?: ToastType) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const show = useCallback(({ title, message, type = 'info' }: { title: string; message?: string; type?: ToastType }) => {
    const desc = message || undefined;
    switch (type) {
      case 'success': toast.success(title, { description: desc }); break;
      case 'error': toast.error(title, { description: desc }); break;
      case 'warning': toast.warning(title, { description: desc }); break;
      default: toast.info(title, { description: desc }); break;
    }
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    show({ title: message, type });
  }, [show]);

  const success = useCallback((title: string, message?: string) => show({ title, message, type: 'success' }), [show]);
  const error = useCallback((title: string, message?: string) => show({ title, message, type: 'error' }), [show]);
  const warning = useCallback((title: string, message?: string) => show({ title, message, type: 'warning' }), [show]);
  const info = useCallback((title: string, message?: string) => show({ title, message, type: 'info' }), [show]);

  return (
    <ToastContext.Provider value={{ show, showToast, success, error, warning, info }}>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </ToastContext.Provider>
  );
}
