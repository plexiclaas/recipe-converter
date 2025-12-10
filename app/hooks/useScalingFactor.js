import { useMemo } from "react";
import { circleArea, rectArea } from "../utils/calculations";

/**
 * Custom hook to calculate the scaling factor based on input and output pan sizes or pieces
 * @param {string} mode - The conversion mode (round-round, round-square, pieces-pieces, etc.)
 * @param {string} inA - Input diameter or width
 * @param {string} inLength - Input length (for square pans)
 * @param {string} outA - Output diameter or width
 * @param {string} outLength - Output length (for square pans)
 * @param {string} inputPieces - Number of pieces in recipe (for pieces-pieces mode)
 * @param {string} outputPieces - Number of pieces needed (for pieces-pieces mode)
 * @returns {string|null} The scaling factor or null if calculation is not possible
 */
export function useScalingFactor(
  mode,
  inA,
  inLength,
  outA,
  outLength,
  inputPieces,
  outputPieces
) {
  return useMemo(() => {
    // PIECES → PIECES (simple division)
    if (mode === "pieces-pieces") {
      const input = Number(inputPieces);
      const output = Number(outputPieces);
      if (!input || !output) return null;
      return Number(output / input).toFixed(2);
    }

    // AREA-BASED CALCULATIONS
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
  }, [mode, inA, inLength, outA, outLength, inputPieces, outputPieces]);
}
