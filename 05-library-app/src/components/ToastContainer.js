"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast";

export default function ToastContainer({ toasts, onCloseToast }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toastRoot = document.getElementById("toast-root");
  if (!toastRoot) {
    return null;
  }

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
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
