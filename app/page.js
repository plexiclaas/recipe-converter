"use client";
import { useState, useMemo } from "react";

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
          <select
            className="min-w-[14rem] w-auto rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-900/20"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            {Object.entries(modeLabel).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
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
