/**
 * AddLicenseForm - 新增授權內嵌表單
 * 選擇產品 + 手動輸入價格 + 數量
 */
import { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function AddLicenseForm({ clientId, onClose }) {
  const { products, addOrderToClient } = useApp()
  const [productName, setProductName] = useState(products[0]?.name || '')
  const [price, setPrice] = useState('')
  const [qty, setQty] = useState(1)

  const handleSave = () => {
    if (!productName || !price || qty < 1) return

    addOrderToClient(clientId, {
      productName,
      price: parseFloat(price),
      qty: parseInt(qty, 10),
    })

    // 重置表單
    setProductName(products[0]?.name || '')
    setPrice('')
    setQty(1)
    onClose()
  }

  return (
    <div className="bg-merlin-surface border border-merlin-border rounded-lg p-4 mb-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* 產品選擇 */}
        <div>
          <label className="block text-xs text-merlin-text-muted mb-1">Product Name</label>
          <select
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full bg-merlin-bg border border-merlin-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-merlin-red cursor-pointer"
          >
            {products.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* 價格（手動輸入） */}
        <div>
          <label className="block text-xs text-merlin-text-muted mb-1">Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full bg-merlin-bg border border-merlin-border rounded px-3 py-2 text-sm text-white placeholder:text-merlin-text-muted focus:outline-none focus:border-merlin-red"
          />
        </div>

        {/* 數量 */}
        <div>
          <label className="block text-xs text-merlin-text-muted mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="w-full bg-merlin-bg border border-merlin-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-merlin-red"
          />
        </div>
      </div>

      {/* 底部操作列 */}
      <div className="flex items-center justify-between border-t border-merlin-border pt-3">
        <p className="text-xs text-merlin-text-muted">
          Please remember to click Save after finishing editing. Click Cancel to undo changes.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-merlin-surface border border-merlin-border text-sm text-white rounded hover:bg-merlin-row-hover transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-merlin-red text-sm text-white rounded hover:bg-merlin-red-hover transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
