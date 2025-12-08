"use client";
import { useState, useMemo, useEffect, useRef } from "react";

/* ---------------------------------------
   Helper Functions
-----------------------------------------*/

// Kreisfläche
const circleArea = (diameter) => {
  const r = diameter / 2;
  return Math.PI * r * r;
};

// Rechteckfläche
const rectArea = (width, length) => width * length;

/* ---------------------------------------
   MAIN COMPONENT
-----------------------------------------*/

export default function FormConverter() {
  const [mode, setMode] = useState("round-round");
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

  // INPUTS
  const [inA, setInA] = useState(""); // Durchmesser oder Breite
  const [inLength, setInLength] = useState(""); // Länge (nur bei square)

  // OUTPUTS
  const [outA, setOutA] = useState(""); // Durchmesser oder Breite
  const [outLength, setOutLength] = useState(""); // Länge (nur square)

  /* ---------------------------------------
     COMPUTATION
  -----------------------------------------*/
  const factor = useMemo(() => {
    let inputArea = 0;
    let outputArea = 0;

    // ROUND → ROUND
    if (mode === "round-round") {
      inputArea = circleArea(Number(inA));
      outputArea = circleArea(Number(outA));
    }

    // ROUND → SQUARE
    if (mode === "round-square") {
      inputArea = circleArea(Number(inA));
      outputArea = rectArea(Number(outA), Number(outLength));
    }

    // SQUARE → ROUND
    if (mode === "square-round") {
      inputArea = rectArea(Number(inA), Number(inLength));
      outputArea = circleArea(Number(outA));
    }

    // SQUARE → SQUARE
    if (mode === "square-square") {
      inputArea = rectArea(Number(inA), Number(inLength));
      outputArea = rectArea(Number(outA), Number(outLength));
    }

    if (!inputArea || !outputArea) return null;

    return Number(outputArea / inputArea).toFixed(2);
  }, [mode, inA, inLength, outA, outLength]);

  const modeLabel = {
    "round-round": "Round → Round",
    "round-square": "Round → Square",
    "square-round": "Square → Round",
    "square-square": "Square → Square",
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-8">
      {/* -----------------------------------
          HEADER
      -------------------------------------*/}
      <section>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Cake Pan Converter
        </h1>
        <p className="mt-2 text-neutral-600">
          Convert baking recipes between round and square pans. Enter your sizes
          and get the exact scaling factor for your ingredients.
        </p>
      </section>

      {/* -----------------------------------
          MODE SELECTOR
      -------------------------------------*/}
      <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
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
              <span>{modeLabel[mode]}</span>
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
              <ul className="absolute top-full left-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg min-w-[14rem] z-50 overflow-hidden">
                {Object.entries(modeLabel).map(([key, label]) => (
                  <li key={key}>
                    <button
                      type="button"
                      className={`w-full text-left px-4 py-2 text-neutral-900 hover:bg-neutral-100 transition-colors ${
                        mode === key ? "bg-neutral-100 font-medium" : ""
                      }`}
                      onClick={() => {
                        setMode(key);
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

        {/* -----------------------------------
            INPUTS
        -------------------------------------*/}
        <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* INPUT BLOCK */}
          <div className="md:col-span-2">
            <h2 className="text-base font-semibold text-neutral-900 mb-2">
              Input Size
            </h2>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">
                  {mode.startsWith("round") ? "Diameter (cm)" : "Width (cm)"}
                </label>
                <input
                  type="number"
                  className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-900/20"
                  value={inA}
                  onChange={(e) => setInA(e.target.value)}
                />
              </div>

              {/* LENGTH ONLY IF SQUARE INPUT */}
              {mode.startsWith("square") && (
                <div>
                  <label className="text-sm font-medium">Length (cm)</label>
                  <input
                    type="number"
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-900/20"
                    value={inLength}
                    onChange={(e) => setInLength(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* -----------------------------------
              OUTPUT BLOCK
          -------------------------------------*/}
          <div className="md:col-span-2 mt-2">
            <h2 className="text-base font-semibold text-neutral-900 mb-2">
              Output Size
            </h2>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">
                  {mode.endsWith("round") ? "Diameter (cm)" : "Width (cm)"}
                </label>
                <input
                  type="number"
                  className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-900/20"
                  value={outA}
                  onChange={(e) => setOutA(e.target.value)}
                />
              </div>

              {/* LENGTH ONLY IF SQUARE OUTPUT */}
              {mode.endsWith("square") && (
                <div>
                  <label className="text-sm font-medium">Length (cm)</label>
                  <input
                    type="number"
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-900/20"
                    value={outLength}
                    onChange={(e) => setOutLength(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </form>
      </section>

      {/* -----------------------------------
          RESULT SECTION
      -------------------------------------*/}
      <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold text-neutral-900 mb-1">
          Scaling Factor
        </h2>

        <p className="text-neutral-600 text-sm">
          Multiply all ingredients in your recipe by this factor:
        </p>

        <div className="mt-3">
          <p className="text-3xl font-semibold text-neutral-900">
            {factor ?? "—"}
          </p>
        </div>
      </section>
    </main>
  );
}
