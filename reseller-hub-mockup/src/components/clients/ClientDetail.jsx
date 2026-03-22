/**
 * ClientDetail - 右側客戶詳情面板
 */
import { useState } from 'react'
import { User } from 'lucide-react'
import ClientInventoryTab from './ClientInventoryTab'
import AccountsReceivableTab from './AccountsReceivableTab'
import ClientUsersTab from './ClientUsersTab'

export default function ClientDetail({ client }) {
  const [activeTab, setActiveTab] = useState('inventory')

  const infoFields = [
    { label: 'Client Name', value: client.clientName },
    { label: 'Address', value: client.address },
    { label: 'Phone Number', value: client.phoneNumber },
    { label: 'VAT Number', value: client.vatNumber },
    { label: 'Billing Cycle', value: client.billingCycle },
    { label: 'Description', value: client.description },
  ]

  const tabs = [
    { id: 'inventory', label: 'Inventory' },
    { id: 'accounts', label: 'Accounts Receivable' },
    { id: 'users', label: 'Users' },
  ]

  return (
    <div>
      {/* 標題 */}
      <h2 className="text-xl font-semibold text-white mb-4">
        Clients <span className="text-merlin-text-muted">/{client.clientName}</span>
      </h2>

      {/* 頭像 */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-merlin-surface border border-merlin-border flex items-center justify-center">
          <User size={28} className="text-merlin-text-muted" />
        </div>
      </div>

      {/* 客戶資訊 */}
      <div className="grid grid-cols-6 gap-4 mb-3">
        {infoFields.map((f) => (
          <div key={f.label}>
            <p className="text-xs text-merlin-text-muted mb-1">{f.label}</p>
            <p className="text-sm text-white">{f.value || '-'}</p>
          </div>
        ))}
      </div>

      {/* Pricing Structure */}
      <div className="mb-6">
        <p className="text-xs text-merlin-text-muted mb-1">Pricing Structure</p>
        <span className="inline-block px-3 py-1 bg-merlin-surface border border-merlin-border rounded text-sm text-white">
          {client.pricingStructure}
        </span>
      </div>

      {/* 分頁 */}
      <div className="flex gap-6 border-b border-merlin-border mb-4">
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
      {activeTab === 'inventory' && <ClientInventoryTab clientId={client.id} />}
      {activeTab === 'accounts' && <AccountsReceivableTab />}
      {activeTab === 'users' && <ClientUsersTab />}
    </div>
  )
}
