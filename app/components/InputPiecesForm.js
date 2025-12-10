export default function InputPiecesForm({ inputPieces, onInputPiecesChange }) {
  return (
    <div className="md:col-span-2">
      <h2 className="text-base font-semibold text-neutral-900 mb-2">
        Input Pieces
      </h2>

      <div>
        <label className="text-sm font-medium">Number of pieces (recipe)</label>
        <input
          type="number"
          className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-900/20"
          value={inputPieces}
          onChange={(e) => onInputPiecesChange(e.target.value)}
        />
      </div>
    </div>
  );
}
