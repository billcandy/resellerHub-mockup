/**
 * ClientsPage - 客戶管理頁面（Admin 專屬）
 * 左側客戶清單 + 右側客戶詳情
 */
import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import ClientList from '../components/clients/ClientList'
import ClientDetail from '../components/clients/ClientDetail'

export default function ClientsPage() {
  const { clients } = useApp()
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || null)
  const [searchQuery, setSearchQuery] = useState('')

  // 搜尋過濾
  const filteredClients = useMemo(() => {
    if (!searchQuery) return clients
    const q = searchQuery.toLowerCase()
    return clients.filter(
      (c) =>
        c.clientName.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q)
    )
  }, [clients, searchQuery])

  const selectedClient = clients.find((c) => c.id === selectedClientId)

  return (
    <div className="flex h-full -m-6">
      {/* 左側：客戶清單 */}
      <ClientList
        clients={filteredClients}
        selectedClientId={selectedClientId}
        onSelect={setSelectedClientId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 右側：客戶詳情 */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedClient ? (
          <ClientDetail client={selectedClient} />
        ) : (
          <div className="flex items-center justify-center h-full text-merlin-text-muted">
            請選擇一個客戶
          </div>
        )}
      </div>
    </div>
  )
}
