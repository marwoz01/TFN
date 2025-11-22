"use client";
import { useEffect } from "react";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast.duration, toast.id, onClose]);

  return (
    <div
      className={`px-4 py-3 rounded shadow text-sm ${
        toast.type === "error" ? "bg-red-600" : "bg-green-600"
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <p>{toast.message}</p>

        <button onClick={() => onClose(toast.id)}>×</button>
      </div>
    </div>
  );
}
