'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/app/_components/ui/button';

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title = 'Confirm',
  message = 'Are you sure?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/50 rounded-lg border border-gray-200 dark:border-gray-700 p-0 max-w-md w-full"
      onCancel={onCancel}
    >
      <div className="p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>{cancelText}</Button>
          <Button variant="destructive" onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </dialog>
  );
}
