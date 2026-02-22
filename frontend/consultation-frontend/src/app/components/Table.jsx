export default function Table({ columns, data, clickable = false ,onRowClick }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-700">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-800">
            {columns.map((column) => (
              <th
                key={column.id}
                className="px-4 py-3 text-left text-sm font-medium text-slate-200"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr
              key={row.id ?? rowIndex}
              className={`border-t border-slate-700 bg-white hover:bg-gray-300 transition-colors ${clickable ? 'cursor-pointer' : ''}`}
              onClick={() => clickable && onRowClick(row)}
            >
              {columns.map((column) => (
                <td
                  key={column.id}
                  className="px-4 py-3 text-sm text-black"
                >
                  {column.render
                    ? column.render(row[column.id], row)
                    : row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
