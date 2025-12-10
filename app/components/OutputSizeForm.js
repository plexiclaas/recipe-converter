export default function OutputSizeForm({
  mode,
  outA,
  outLength,
  onOutAChange,
  onOutLengthChange,
}) {
  return (
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
            onChange={(e) => onOutAChange(e.target.value)}
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
              onChange={(e) => onOutLengthChange(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
