export default function ScalingFactorDisplay({ factor }) {
  return (
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
  );
}
