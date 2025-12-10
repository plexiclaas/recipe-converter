"use client";
import { useState, useEffect, useRef } from "react";

const MODE_LABELS = {
  "round-round": "Round → Round",
  "round-square": "Round → Square",
  "square-round": "Square → Round",
  "square-square": "Square → Square",
  "pieces-pieces": "Pieces → Pieces",
};

export default function ModeSelector({ mode, onModeChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-neutral-900">
        Select conversion type:
      </label>
      <div className="relative" ref={dropdownRef}>
        <div
          tabIndex={0}
          role="button"
          className="select select-bordered min-w-[14rem] w-auto bg-white text-neutral-900 cursor-pointer flex items-center justify-between"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setDropdownOpen(!dropdownOpen);
            }
          }}
        >
          <span>{MODE_LABELS[mode]}</span>
          <svg
            className={`w-4 h-4 transition-transform ml-2 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {dropdownOpen && (
          <ul className="absolute top-full left-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg min-w-[14rem] z-50 overflow-hidden max-h-64">
            {Object.entries(MODE_LABELS).map(([key, label]) => (
              <li key={key}>
                <button
                  type="button"
                  className={`w-full text-left px-4 py-2 text-neutral-900 hover:bg-neutral-100 transition-colors ${
                    mode === key ? "bg-neutral-100 font-medium" : ""
                  }`}
                  onClick={() => {
                    onModeChange(key);
                    setDropdownOpen(false);
                  }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
