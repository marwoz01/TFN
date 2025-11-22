"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-4 
                  rounded-lg border border-rose-500/30 
                  shadow-md shadow-rose-900/20 transition
                  flex items-center justify-center
                  ${pending ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      {pending ? "Przetwarzanie..." : children}
    </button>
  );
}
