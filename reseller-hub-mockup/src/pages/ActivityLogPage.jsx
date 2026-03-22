/**
 * ActivityLogPage - 活動記錄頁面
 */

const mockLogs = [
  { id: 1, dateTime: '2026-03-22 14:30', user: 'admin', action: 'Deliver License', details: 'WatchNode x2 → LILIN' },
  { id: 2, dateTime: '2026-03-21 10:15', user: 'admin', action: 'Create Order', details: 'Cannguard x3 for TechVision Corp' },
  { id: 3, dateTime: '2026-03-20 16:45', user: 'admin', action: 'Add Client', details: 'SmartEye Security (Reseller)' },
  { id: 4, dateTime: '2026-03-19 09:00', user: 'admin', action: 'Deliver License', details: 'Nexus x2 → SecureNet Solutions' },
  { id: 5, dateTime: '2026-03-18 11:30', user: 'admin', action: 'Create Order', details: 'Merlin Cloud Recording x5 for CloudWatch Ltd' },
  { id: 6, dateTime: '2026-03-17 14:00', user: 'admin', action: 'Deliver License', details: 'Trailer Platform x2 → SafeGuard Systems' },
  { id: 7, dateTime: '2026-03-16 08:20', user: 'admin', action: 'Update Client', details: 'ProSurv Inc - Updated billing cycle' },
  { id: 8, dateTime: '2026-03-15 17:10', user: 'admin', action: 'Deliver License', details: 'Call x3 → SafeGuard Systems' },
]

export default function ActivityLogPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">Activity Log</h1>

      <div className="bg-merlin-surface border border-merlin-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-merlin-border">
              <th className="text-left px-4 py-3 text-sm font-medium text-merlin-text-muted">Date/Time</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-merlin-text-muted">User</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-merlin-text-muted">Action</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-merlin-text-muted">Details</th>
            </tr>
          </thead>
          <tbody>
            {mockLogs.map((log) => (
              <tr
                key={log.id}
                className="border-b border-merlin-border last:border-0 hover:bg-merlin-row-hover transition-colors"
              >
                <td className="px-4 py-3 text-sm text-merlin-text-muted">{log.dateTime}</td>
                <td className="px-4 py-3 text-sm text-white">{log.user}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    log.action.includes('Deliver')
                      ? 'bg-green-900/30 text-green-400'
                      : log.action.includes('Create')
                        ? 'bg-blue-900/30 text-blue-400'
                        : 'bg-yellow-900/30 text-yellow-400'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-merlin-text-muted">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
