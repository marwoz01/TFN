"use client";

import { useState } from "react";

const baseStarClasses =
  "inline-flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition";

export default function StarRating({ value = 0, onChange }) {
  const [hovered, setHovered] = useState(0);

  const handleClick = (rating) => {
    if (!onChange) return;
    onChange(rating);
  };

  const handleMouseEnter = (rating) => {
    setHovered(rating);
  };

  const handleMouseLeave = () => {
    setHovered(0);
  };

  const current = hovered || value;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((rating) => {
        const isActive = current >= rating;
        return (
          <button
            key={rating}
            type="button"
            onClick={() => handleClick(rating)}
            onMouseEnter={() => handleMouseEnter(rating)}
            onMouseLeave={handleMouseLeave}
            className={`${baseStarClasses} ${
              isActive
                ? "bg-yellow-400/90 text-neutral-900"
                : "bg-neutral-800 text-neutral-500 hover:bg-neutral-700"
            }`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
