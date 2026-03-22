/**
 * UsersTab - 使用者分頁（placeholder）
 */

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Viewer', status: 'Active' },
  { id: 3, name: 'Mike Chen', email: 'mike@example.com', role: 'Editor', status: 'Inactive' },
]

export default function UsersTab() {
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
          {mockUsers.map((user) => (
            <tr
              key={user.id}
              className="border-b border-merlin-border last:border-0 hover:bg-merlin-row-hover transition-colors"
            >
              <td className="px-4 py-3 text-sm text-white">{user.name}</td>
              <td className="px-4 py-3 text-sm text-merlin-text-muted">{user.email}</td>
              <td className="px-4 py-3 text-sm text-white">{user.role}</td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-2 py-0.5 rounded text-xs ${
                  user.status === 'Active'
                    ? 'bg-green-900/30 text-green-400'
                    : 'bg-gray-700/30 text-gray-400'
                }`}>
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
