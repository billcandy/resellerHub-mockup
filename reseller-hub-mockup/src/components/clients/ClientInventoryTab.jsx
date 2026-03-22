/**
 * ClientInventoryTab - 客戶庫存分頁
 * 含新增訂單、Deliver 功能
 */
import { useState } from 'react'
import { Plus, ChevronDown, ChevronRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import AddLicenseForm from './AddLicenseForm'

export default function ClientInventoryTab({ clientId }) {
  const { clientInventory, deliverLicense } = useApp()
  const [filter, setFilter] = useState('delivered')
  const [showAddForm, setShowAddForm] = useState(false)
  const [expandedRows, setExpandedRows] = useState(new Set())

  const licenses = clientInventory[clientId] || []

  const toggleRow = (id) => {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleDeliver = (licenseId) => {
    deliverLicense(clientId, licenseId)
  }

  const formatDate = (isoString) => {
    if (!isoString) return '-'
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div>
      {/* +ADD 按鈕 */}
      <div className="mb-4">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-merlin-red text-white text-sm rounded hover:bg-merlin-red-hover transition-colors cursor-pointer"
        >
          <Plus size={14} />
          ADD
        </button>
      </div>

      {/* 新增授權表單 */}
      {showAddForm && (
        <AddLicenseForm
          clientId={clientId}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {/* 篩選按鈕 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter('delivered')}
          className={`px-3 py-1.5 text-sm rounded transition-colors cursor-pointer ${
            filter === 'delivered'
              ? 'bg-merlin-red text-white'
              : 'bg-merlin-surface border border-merlin-border text-merlin-text-muted hover:text-white'
          }`}
        >
          Delivered Orders
        </button>
        <button
          onClick={() => setFilter('items')}
          className={`px-3 py-1.5 text-sm rounded transition-colors cursor-pointer ${
            filter === 'items'
              ? 'bg-merlin-red text-white'
              : 'bg-merlin-surface border border-merlin-border text-merlin-text-muted hover:text-white'
          }`}
        >
          Items
        </button>
      </div>

      {/* 授權表格 */}
      {licenses.length === 0 ? (
        <div className="text-center py-12 text-merlin-text-muted">
          No licenses found
        </div>
      ) : (
        <div className="border border-merlin-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-merlin-border bg-merlin-surface">
                <th className="w-8"></th>
                <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Delivered At / ID</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Product Name</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Price</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Qty</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Unused</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Used</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {licenses.map((lic) => (
                <>
                  <tr
                    key={lic.id}
                    className="border-b border-merlin-border hover:bg-merlin-row-hover transition-colors cursor-pointer"
                    onClick={() => toggleRow(lic.id)}
                  >
                    <td className="px-2 text-merlin-text-muted">
                      {expandedRows.has(lic.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-merlin-text-muted">{formatDate(lic.deliveredAt)}</div>
                      <div className="text-xs text-merlin-text-muted font-mono mt-0.5">{lic.id.substring(0, 18)}...</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-white">{lic.productName}</td>
                    <td className="px-4 py-3 text-sm text-white">${lic.price}</td>
                    <td className="px-4 py-3 text-sm text-white">{lic.qty}</td>
                    <td className="px-4 py-3 text-sm text-white">{lic.unused}</td>
                    <td className="px-4 py-3 text-sm text-white">{lic.used}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        lic.status === 'delivered'
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-yellow-900/30 text-yellow-400'
                      }`}>
                        {lic.status === 'delivered' ? 'Delivered' : 'Pending'}
                      </span>
                    </td>
                  </tr>

                  {/* 展開行 */}
                  {expandedRows.has(lic.id) && (
                    <tr key={`${lic.id}-detail`} className="border-b border-merlin-border bg-merlin-surface/50">
                      <td colSpan={8} className="px-8 py-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs text-merlin-text-muted">Delivered By: </span>
                            <span className="text-sm text-white">{lic.deliveredBy || '-'}</span>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-merlin-surface border border-merlin-border text-sm text-white rounded hover:bg-merlin-row-hover transition-colors cursor-pointer">
                              Edit
                            </button>
                            {lic.status !== 'delivered' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeliver(lic.id)
                                }}
                                className="px-3 py-1 bg-merlin-red text-sm text-white rounded hover:bg-merlin-red-hover transition-colors cursor-pointer"
                              >
                                Deliver
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
