/**
 * ClientList - 左側客戶清單面板
 */
import { Search, Plus } from 'lucide-react'

export default function ClientList({ clients, selectedClientId, onSelect, searchQuery, onSearchChange }) {
  return (
    <div className="w-[240px] bg-merlin-sidebar border-r border-merlin-border flex flex-col shrink-0">
      {/* +ADD 按鈕 */}
      <div className="p-3">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-merlin-red text-white text-sm rounded hover:bg-merlin-red-hover transition-colors cursor-pointer">
          <Plus size={14} />
          ADD
        </button>
      </div>

      {/* 搜尋 */}
      <div className="px-3 mb-2">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-merlin-text-muted" />
          <input
            type="text"
            placeholder="Search for clients"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-merlin-surface border border-merlin-border rounded px-3 py-1.5 pl-8 text-sm text-white placeholder:text-merlin-text-muted focus:outline-none focus:border-merlin-red transition-colors"
          />
        </div>
      </div>

      {/* 表頭 */}
      <div className="flex px-3 py-2 text-xs text-merlin-text-muted border-b border-merlin-border">
        <span className="flex-1">Client Name</span>
        <span className="w-20">Type</span>
      </div>

      {/* 客戶列表 */}
      <div className="flex-1 overflow-y-auto">
        {clients.map((client) => (
          <button
            key={client.id}
            onClick={() => onSelect(client.id)}
            className={`w-full flex items-center px-3 py-2.5 text-left transition-colors cursor-pointer border-l-2 ${
              selectedClientId === client.id
                ? 'border-merlin-red bg-merlin-selected text-white'
                : 'border-transparent text-merlin-text-muted hover:bg-merlin-surface hover:text-white'
            }`}
          >
            <span className="flex-1 text-sm truncate">{client.clientName}</span>
            <span className="w-20 text-xs text-merlin-text-muted">{client.type}</span>
          </button>
        ))}

        {clients.length === 0 && (
          <div className="px-3 py-6 text-sm text-merlin-text-muted text-center">
            No clients found
          </div>
        )}
      </div>

      {/* 分頁 */}
      <div className="p-3 border-t border-merlin-border flex justify-center">
        <span className="text-xs text-merlin-red font-medium">1</span>
      </div>
    </div>
  )
}
