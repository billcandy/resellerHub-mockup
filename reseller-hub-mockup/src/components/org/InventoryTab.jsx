/**
 * InventoryTab - 庫存分頁（My Org 頁面用）
 * 顯示當前帳號擁有的 License 列表
 */
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

export default function InventoryTab({ licenses }) {
  const [filter, setFilter] = useState('delivered') // delivered | items
  const [expandedRows, setExpandedRows] = useState(new Set())

  const toggleRow = (id) => {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // 格式化日期
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
                <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Delivered At</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Order Number</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Product Name</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Price</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Qty</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Unused</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Used</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-merlin-text-muted">Delivered By</th>
              </tr>
            </thead>
            <tbody>
              {licenses.map((lic) => (
                <tr
                  key={lic.id}
                  className="border-b border-merlin-border last:border-0 hover:bg-merlin-row-hover transition-colors cursor-pointer"
                  onClick={() => toggleRow(lic.id)}
                >
                  <td className="px-2 text-merlin-text-muted">
                    {expandedRows.has(lic.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </td>
                  <td className="px-4 py-3 text-sm text-merlin-text-muted">{formatDate(lic.deliveredAt)}</td>
                  <td className="px-4 py-3 text-sm text-merlin-text-muted font-mono">{lic.orderNumber}</td>
                  <td className="px-4 py-3 text-sm text-white">{lic.productName}</td>
                  <td className="px-4 py-3 text-sm text-white">${lic.price}</td>
                  <td className="px-4 py-3 text-sm text-white">{lic.qty}</td>
                  <td className="px-4 py-3 text-sm text-white">{lic.unused}</td>
                  <td className="px-4 py-3 text-sm text-white">{lic.used}</td>
                  <td className="px-4 py-3 text-sm text-merlin-text-muted">
                    Delivered by: {lic.deliveredBy || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
