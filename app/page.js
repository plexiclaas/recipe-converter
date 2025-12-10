"use client";
import { useState } from "react";
import Header from "./components/Header";
import ModeSelector from "./components/ModeSelector";
import InputSizeForm from "./components/InputSizeForm";
import OutputSizeForm from "./components/OutputSizeForm";
import InputPiecesForm from "./components/InputPiecesForm";
import OutputPiecesForm from "./components/OutputPiecesForm";
import ScalingFactorDisplay from "./components/ScalingFactorDisplay";
import { useScalingFactor } from "./hooks/useScalingFactor";

export default function FormConverter() {
  const [mode, setMode] = useState("round-round");
  const [inA, setInA] = useState("");
  const [inLength, setInLength] = useState("");
  const [outA, setOutA] = useState("");
  const [outLength, setOutLength] = useState("");
  const [inputPieces, setInputPieces] = useState("");
  const [outputPieces, setOutputPieces] = useState("");

  const factor = useScalingFactor(
    mode,
    inA,
    inLength,
    outA,
    outLength,
    inputPieces,
    outputPieces
  );

  const isPiecesMode = mode === "pieces-pieces";

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-8">
      <Header />

      <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <ModeSelector mode={mode} onModeChange={setMode} />

        <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {isPiecesMode ? (
            <>
              <InputPiecesForm
                inputPieces={inputPieces}
                onInputPiecesChange={setInputPieces}
              />

              <OutputPiecesForm
                outputPieces={outputPieces}
                onOutputPiecesChange={setOutputPieces}
              />
            </>
          ) : (
            <>
              <InputSizeForm
                mode={mode}
                inA={inA}
                inLength={inLength}
                onInAChange={setInA}
                onInLengthChange={setInLength}
              />

              <OutputSizeForm
                mode={mode}
                outA={outA}
                outLength={outLength}
                onOutAChange={setOutA}
                onOutLengthChange={setOutLength}
              />
            </>
          )}
        </form>
      </section>

      <ScalingFactorDisplay factor={factor} />
    </main>
  );
}
