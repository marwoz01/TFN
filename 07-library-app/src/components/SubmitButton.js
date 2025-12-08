"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  pendingLabel = "Przetwarzanie...",
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="
        w-full mt-2 rounded-xl
        bg-cyan-600 hover:bg-cyan-400
        text-white font-semibold py-2.5 text-sm tracking-wide
        disabled:opacity-60 disabled:cursor-not-allowed
        transition
      "
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
