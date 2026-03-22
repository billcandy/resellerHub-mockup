/**
 * Sidebar - 左側圖示導航列
 */
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Building2,
  Users,
  BarChart3,
  ClipboardList,
  Settings,
  LayoutDashboard,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

const navItems = [
  { path: '/my-org', icon: Building2, label: 'My Org' },
  { path: '/clients', icon: Users, label: 'Clients', adminOnly: true },
  { path: '/usage', icon: BarChart3, label: 'Usage' },
  { path: '/activity-log', icon: ClipboardList, label: 'Activity Log' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser } = useApp()

  return (
    <aside className="w-14 bg-merlin-sidebar border-r border-merlin-border flex flex-col items-center py-4 shrink-0">
      {/* Logo 小圖示 */}
      <button
        onClick={() => navigate('/my-org')}
        className="mb-6 w-10 h-10 hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
      >
        <img
          src="/logo.png"
          alt="R"
          className="w-10 h-10 object-contain"
          style={{ transform: 'scale(2)', transformOrigin: 'center center' }}
        />
      </button>

      {/* 導航項目 */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          // 非 Admin 不顯示 Clients
          if (item.adminOnly && currentUser !== 'admin') return null

          const isActive = location.pathname.startsWith(item.path)
          const Icon = item.icon

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              title={item.label}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer
                ${isActive
                  ? 'bg-merlin-selected text-merlin-red border-l-2 border-merlin-red'
                  : 'text-merlin-text-muted hover:text-merlin-text hover:bg-merlin-surface'
                }`}
            >
              <Icon size={20} />
            </button>
          )
        })}
      </nav>

      {/* 底部設定圖示 */}
      <button
        title="Settings"
        className="w-10 h-10 rounded-lg flex items-center justify-center text-merlin-text-muted hover:text-merlin-text hover:bg-merlin-surface transition-all cursor-pointer"
      >
        <Settings size={20} />
      </button>
    </aside>
  )
}
