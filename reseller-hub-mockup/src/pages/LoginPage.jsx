/**
 * LoginPage - 登入頁面
 * 選擇 Admin 或 LILIN 帳號直接登入
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import AuthLayout from '../layouts/AuthLayout'

export default function LoginPage() {
  const [selectedAccount, setSelectedAccount] = useState('admin')
  const { login } = useApp()
  const navigate = useNavigate()

  const handleLogin = () => {
    login(selectedAccount)
    navigate('/my-org')
  }

  return (
    <AuthLayout>
      <div className="w-[380px] flex flex-col items-center">
        {/* Logo */}
        <div className="mb-2">
          <img
            src="/logo.png"
            alt="Reseller Hub"
            className="w-84 h-84 object-contain"
            style={{ filter: 'drop-shadow(0 0 20px rgba(212, 160, 23, 0.4))' }}
          />
        </div>

        {/* 標題 */}
        <h1 className="text-2xl font-bold text-white mb-8 tracking-wide">
          Reseller Hub
        </h1>

        {/* 帳號選擇 */}
        <div className="w-full mb-4">
          <label className="block text-sm text-merlin-text-muted mb-1.5">Account</label>
          <div className="relative">
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full bg-merlin-surface border border-merlin-border rounded-md px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-merlin-red transition-colors"
            >
              <option value="admin">Admin (Distributor)</option>
              <option value="lilin">LILIN (Reseller)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-merlin-text-muted">
              ▾
            </div>
          </div>
        </div>

        {/* 密碼欄位（裝飾用） */}
        <div className="w-full mb-4">
          <label className="block text-sm text-merlin-text-muted mb-1.5">Password</label>
          <input
            type="password"
            value="••••••••"
            readOnly
            className="w-full bg-merlin-surface border border-merlin-border rounded-md px-4 py-3 text-white focus:outline-none"
          />
        </div>

        {/* Keep me logged in */}
        <label className="w-full flex items-center gap-2 mb-6 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 accent-merlin-red"
          />
          <span className="text-sm text-merlin-text-muted">Keep me logged in</span>
        </label>

        {/* Login 按鈕 */}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-merlin-red text-white font-medium rounded-md hover:bg-merlin-red-hover transition-colors cursor-pointer text-lg"
        >
          Login
        </button>

        {/* 語言選擇 */}
        <div className="mt-6 text-sm text-merlin-text-muted flex items-center gap-1">
          <span>🌐</span>
          <span>English</span>
        </div>
      </div>
    </AuthLayout>
  )
}
