/**
 * ClientUsersTab - 客戶使用者分頁（placeholder）
 */
export default function ClientUsersTab() {
  const mockUsers = [
    { id: 1, name: 'Client Admin', email: 'admin@client.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Client User', email: 'user@client.com', role: 'Viewer', status: 'Active' },
  ]

  return (
    <div className="border border-merlin-border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-merlin-border bg-merlin-surface">
            <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Name</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Email</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Role</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((u) => (
            <tr key={u.id} className="border-b border-merlin-border last:border-0 hover:bg-merlin-row-hover transition-colors">
              <td className="px-4 py-3 text-sm text-white">{u.name}</td>
              <td className="px-4 py-3 text-sm text-merlin-text-muted">{u.email}</td>
              <td className="px-4 py-3 text-sm text-white">{u.role}</td>
              <td className="px-4 py-3 text-sm">
                <span className="px-2 py-0.5 rounded text-xs bg-green-900/30 text-green-400">{u.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
