"use client";

import { useEffect } from "react";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onClose]);

  const baseClasses =
    "text-white px-4 py-3 rounded-lg shadow-lg text-sm flex items-start gap-3";
  const color =
    toast.type === "success"
      ? "bg-green-600"
      : toast.type === "error"
      ? "bg-red-600"
      : "bg-gray-700";

  return (
    <div className={`${baseClasses} ${color}`}>
      <div className="flex-1">{toast.message}</div>
      <button
        onClick={() => onClose(toast.id)}
        className="text-gray-200 font-bold text-lg leading-none hover:text-white"
      >
        ×
      </button>
    </div>
  );
}
