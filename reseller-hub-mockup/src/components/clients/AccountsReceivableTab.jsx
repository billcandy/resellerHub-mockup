/**
 * AccountsReceivableTab - 應收帳款分頁（placeholder）
 */
export default function AccountsReceivableTab() {
  const mockRecords = [
    { id: 1, date: '2026-03-15', invoice: 'INV-001', amount: 250, status: 'Paid' },
    { id: 2, date: '2026-02-28', invoice: 'INV-002', amount: 180, status: 'Paid' },
    { id: 3, date: '2026-03-20', invoice: 'INV-003', amount: 95, status: 'Pending' },
  ]

  return (
    <div className="border border-merlin-border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-merlin-border bg-merlin-surface">
            <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Date</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Invoice</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Amount</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockRecords.map((r) => (
            <tr key={r.id} className="border-b border-merlin-border last:border-0 hover:bg-merlin-row-hover transition-colors">
              <td className="px-4 py-3 text-sm text-merlin-text-muted">{r.date}</td>
              <td className="px-4 py-3 text-sm text-white font-mono">{r.invoice}</td>
              <td className="px-4 py-3 text-sm text-white">${r.amount}</td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-2 py-0.5 rounded text-xs ${
                  r.status === 'Paid' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'
                }`}>
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
