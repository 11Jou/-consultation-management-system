export default function DetailRow({ label, value, badge = false }) {
  return (
    <div className="border-b border-slate-100 last:border-b-0 py-4 first:pt-0">
      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
        {label}
      </dt>
      <dd className="text-slate-800 text-[15px] leading-relaxed">
        {badge ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
            {value}
          </span>
        ) : (
          <span className="break-words">{value || '—'}</span>
        )}
      </dd>
    </div>
  )
}
