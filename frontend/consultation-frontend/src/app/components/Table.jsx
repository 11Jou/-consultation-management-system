export default function Table({ columns, data, clickable = false, onRowClick }) {
  const isEmpty = !data || data.length === 0;

  return (
    <>
      {/* ── Mobile: stacked card layout (< sm) ── */}
      <div className="sm:hidden space-y-3">
        {isEmpty ? (
          <p className="text-center text-slate-500 py-8">No data available</p>
        ) : (
          data.map((row, rowIndex) => (
            <div
              key={row.id ?? rowIndex}
              onClick={() => clickable && onRowClick(row)}
              className={`bg-white rounded-lg border border-slate-200 shadow-sm p-4 space-y-2 transition-colors ${
                clickable ? "cursor-pointer hover:bg-gray-50 active:bg-gray-100" : ""
              }`}
            >
              {columns.map((column) => (
                <div
                  key={column.id}
                  className="flex justify-between items-start gap-3 text-sm"
                >
                  <span className="font-medium text-slate-500 shrink-0">
                    {column.label}
                  </span>
                  <span className="text-slate-800 text-right break-all">
                    {column.render
                      ? column.render(row[column.id], row)
                      : row[column.id]}
                  </span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* ── Desktop: scrollable table (≥ sm) ── */}
      <div className="hidden sm:block overflow-x-auto rounded-lg border border-slate-700">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-slate-800">
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="px-4 py-3 text-left text-sm font-medium text-slate-200 whitespace-nowrap"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isEmpty ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-slate-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id ?? rowIndex}
                  onClick={() => clickable && onRowClick(row)}
                  className={`border-t border-slate-700 bg-white hover:bg-gray-300 transition-colors ${
                    clickable ? "cursor-pointer" : ""
                  }`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className="px-4 py-3 text-sm text-black whitespace-nowrap"
                    >
                      {column.render
                        ? column.render(row[column.id], row)
                        : row[column.id]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
