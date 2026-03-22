/**
 * Header - 頂部導航列
 */
import { useNavigate } from 'react-router-dom'
import { LogOut, Globe, ChevronDown } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useState } from 'react'

export default function Header() {
  const navigate = useNavigate()
  const { currentUser, currentAccount, logout } = useApp()
  const [showServiceMenu, setShowServiceMenu] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="h-12 bg-merlin-header border-b border-merlin-border flex items-center justify-between px-4 shrink-0">
      {/* 左側：服務切換 + 標題 */}
      <div className="flex items-center gap-3">
        {/* 服務下拉選單 */}
        <div className="relative">
          <button
            onClick={() => setShowServiceMenu(!showServiceMenu)}
            className="flex items-center gap-1 text-sm text-merlin-text-muted hover:text-merlin-text transition-colors cursor-pointer"
          >
            <span>Reseller Hub</span>
            <ChevronDown size={14} />
          </button>

          {showServiceMenu && (
            <div className="absolute top-full left-0 mt-1 bg-merlin-surface border border-merlin-border rounded-md shadow-lg z-50 min-w-[160px]">
              <button
                onClick={() => setShowServiceMenu(false)}
                className="w-full px-3 py-2 text-left text-sm text-merlin-text-muted hover:bg-merlin-row-hover transition-colors cursor-pointer"
              >
                VSaaS
              </button>
              <button
                onClick={() => setShowServiceMenu(false)}
                className="w-full px-3 py-2 text-left text-sm text-merlin-red border-l-2 border-merlin-red bg-merlin-selected cursor-pointer"
              >
                Reseller Hub
              </button>
            </div>
          )}
        </div>

        <span className="text-merlin-border">|</span>
        <span className="text-sm text-merlin-text-muted">Bridge Version 1.8.9</span>
      </div>

      {/* 右側：管理員資訊 + 登出 */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-merlin-text-muted">
          Admin: <span className="text-merlin-text font-medium">{currentAccount?.orgName || currentUser}</span>
        </span>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 px-3 py-1.5 bg-merlin-red text-white text-sm rounded hover:bg-merlin-red-hover transition-colors cursor-pointer"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>

        {/* 語言選擇器 */}
        <div className="flex items-center gap-1 text-sm text-merlin-text-muted">
          <Globe size={14} />
          <span>English</span>
        </div>
      </div>
    </header>
  )
}
