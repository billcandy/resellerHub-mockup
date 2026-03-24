/**
 * MyOrgPage - 我的組織頁面
 * 根據登入帳號顯示不同的組織資訊與庫存
 * 含 Organization（階層）、Inventory、Users 三個分頁
 */
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import OrgInfo from '../components/org/OrgInfo'
import InventoryTab from '../components/org/InventoryTab'
import UsersTab from '../components/org/UsersTab'
import OrganizationTab from '../components/org/OrganizationTab'

export default function MyOrgPage() {
  const { currentAccount, currentInventory } = useApp()
  const [activeTab, setActiveTab] = useState('organization')

  if (!currentAccount) return null

  // 分頁定義
  const tabs = [
    { id: 'organization', label: 'Organization' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'users', label: 'Users' },
  ]

  return (
    <div>
      {/* 頁面標題 */}
      <h1 className="text-2xl font-semibold text-white mb-6">My Org</h1>

      {/* 組織資訊 */}
      <OrgInfo account={currentAccount} />

      {/* 分頁 */}
      <div className="flex gap-6 border-b border-merlin-border mt-8 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'text-white border-b-2 border-merlin-red'
                : 'text-merlin-text-muted hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 分頁內容 */}
      {activeTab === 'organization' && <OrganizationTab />}
      {activeTab === 'inventory' && <InventoryTab licenses={currentInventory} />}
      {activeTab === 'users' && <UsersTab />}
    </div>
  )
}
