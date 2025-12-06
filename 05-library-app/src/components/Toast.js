"use client";

import { useEffect } from "react";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [toast.duration, onClose]);

  const background = toast.type === "success" ? "#16a34a" : "#dc2626";

  return (
    <div
      style={{
        background,
        color: "white",
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "0.5rem",
        minWidth: "260px",
        maxWidth: "360px",
        fontSize: "0.9rem",
      }}
    >
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={onClose}
        style={{
          marginLeft: "auto",
          border: "none",
          background: "transparent",
          color: "inherit",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
        aria-label="Zamknij powiadomienie"
      >
        ×
      </button>
    </div>
  );
}
