"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast";

export default function ToastContainer({ toasts, onCloseToast }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toastRoot = document.getElementById("toast-root");
  if (!toastRoot) return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-[9999] flex flex-col items-end space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => onCloseToast(toast.id)}
        />
      ))}
    </div>,
    toastRoot,
  );
}
