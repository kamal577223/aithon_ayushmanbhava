type Row = Record<string, string | number | null | undefined>;

export default function Table({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return (
      <div className="glass-panel p-4 text-sm text-slate-600">
        No data found. Add records to see them in the table.
      </div>
    );
  }

  const headers = Object.keys(rows[0]);
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-100/80">
          <tr>
            {headers.map((head) => (
              <th key={head} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
                {head.replaceAll("_", " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={`border-t transition hover:bg-blue-50/50 ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50/70"
              }`}
            >
              {headers.map((head) => (
                <td key={head} className="px-4 py-3 text-slate-700">
                  {head.includes("status") ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                      {String(row[head] ?? "active")}
                    </span>
                  ) : (
                    String(row[head] ?? "")
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
