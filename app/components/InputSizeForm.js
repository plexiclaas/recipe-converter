export default function InputSizeForm({
  mode,
  inA,
  inLength,
  onInAChange,
  onInLengthChange,
}) {
  return (
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
            onChange={(e) => onInAChange(e.target.value)}
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
              onChange={(e) => onInLengthChange(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
