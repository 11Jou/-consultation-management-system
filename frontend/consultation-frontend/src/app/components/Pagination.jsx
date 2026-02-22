export default function Pagination({ page, setPage, totalPages }) {
  const hasPrev = page > 1
  const hasNext = page < totalPages

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        type="button"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={!hasPrev}
        className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
      >
        Previous
      </button>
      <span className="px-3 py-2 text-sm text-slate-600">
        Page {page} of {totalPages || 1}
      </span>
      <button
        type="button"
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={!hasNext}
        className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
      >
        Next
      </button>
    </div>
  )
}
