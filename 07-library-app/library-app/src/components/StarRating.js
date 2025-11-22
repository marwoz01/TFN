"use client";

import { useState } from "react";

export default function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = hover ? star <= hover : star <= value;

        return (
          <button
            key={star}
            type="button"
            className={`
              text-xl leading-none transition cursor-pointer
              ${filled ? "text-yellow-400" : "text-neutral-600"}
            `}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onChange(star)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
