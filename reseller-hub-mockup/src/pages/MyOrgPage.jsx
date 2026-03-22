/**
 * MyOrgPage - 我的組織頁面
 * 根據登入帳號顯示不同的組織資訊與庫存
 */
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import OrgInfo from '../components/org/OrgInfo'
import InventoryTab from '../components/org/InventoryTab'
import UsersTab from '../components/org/UsersTab'

export default function MyOrgPage() {
  const { currentAccount, currentInventory } = useApp()
  const [activeTab, setActiveTab] = useState('inventory')

  if (!currentAccount) return null

  return (
    <div>
      {/* 頁面標題 */}
      <h1 className="text-2xl font-semibold text-white mb-6">My Org</h1>

      {/* 組織資訊 */}
      <OrgInfo account={currentAccount} />

      {/* 分頁 */}
      <div className="flex gap-6 border-b border-merlin-border mt-8 mb-4">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-2 text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'inventory'
              ? 'text-white border-b-2 border-merlin-red'
              : 'text-merlin-text-muted hover:text-white'
          }`}
        >
          Inventory
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-2 text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'users'
              ? 'text-white border-b-2 border-merlin-red'
              : 'text-merlin-text-muted hover:text-white'
          }`}
        >
          Users
        </button>
      </div>

      {/* 分頁內容 */}
      {activeTab === 'inventory' && <InventoryTab licenses={currentInventory} />}
      {activeTab === 'users' && <UsersTab />}
    </div>
  )
}
