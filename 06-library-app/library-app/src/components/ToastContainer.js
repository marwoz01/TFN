"use client";
import { createPortal } from "react-dom";
import Toast from "./Toast";

export default function ToastContainer({ toasts, onClose }) {
  if (typeof window === "undefined") return null;

  const root = document.getElementById("toast-root");
  const content = (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onClose={onClose} />
      ))}
    </div>
  );

  return createPortal(content, root);
}
