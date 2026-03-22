/**
 * AppContext - 全域共享狀態
 * 管理帳號切換、庫存資料、License 轉移
 * 重新整理瀏覽器即重置所有資料
 */
import { createContext, useContext, useState, useCallback } from 'react'
import {
  accounts,
  initialClients,
  buildInitialClientInventory,
  buildInitialLilinInventory,
  generateId,
  products,
} from '../data/initialData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // 當前登入帳號（null = 未登入）
  const [currentUser, setCurrentUser] = useState(null)

  // 客戶清單
  const [clients] = useState(initialClients)

  // 各客戶的已轉移 License（Admin 視角）
  const [clientInventory, setClientInventory] = useState(() => buildInitialClientInventory())

  // LILIN 帳號的庫存（LILIN 視角）
  const [lilinInventory, setLilinInventory] = useState(() => buildInitialLilinInventory())

  // 登入
  const login = useCallback((userId) => {
    setCurrentUser(userId)
  }, [])

  // 登出
  const logout = useCallback(() => {
    setCurrentUser(null)
  }, [])

  // 新增訂單到客戶（尚未 Deliver）
  const addOrderToClient = useCallback((clientId, order) => {
    const newOrder = {
      id: generateId(),
      orderNumber: `${Date.now().toString(36)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      productName: order.productName,
      price: order.price,
      qty: order.qty,
      unused: order.qty,
      used: 0,
      deliveredAt: null,
      deliveredBy: null,
      status: 'pending', // 尚未轉移
    }

    setClientInventory((prev) => ({
      ...prev,
      [clientId]: [...(prev[clientId] || []), newOrder],
    }))

    return newOrder
  }, [])

  // ★ 核心：轉移 License 給客戶
  const deliverLicense = useCallback((clientId, licenseId) => {
    const now = new Date().toISOString()
    const newLilinId = generateId()

    // 更新客戶庫存狀態
    setClientInventory((prev) => {
      const updated = { ...prev }
      const clientLicenses = [...(updated[clientId] || [])]
      const idx = clientLicenses.findIndex((l) => l.id === licenseId)

      if (idx !== -1) {
        const license = clientLicenses[idx]
        clientLicenses[idx] = {
          ...license,
          status: 'delivered',
          deliveredAt: now,
          deliveredBy: 'admin',
        }
        updated[clientId] = clientLicenses

        // 如果客戶有連結帳號（如 LILIN），同步到該帳號的庫存
        const client = initialClients.find((c) => c.id === clientId)
        if (client?.linkedAccount === 'lilin') {
          setLilinInventory((prevInv) => {
            // 防止 StrictMode 重複新增
            if (prevInv.some((l) => l.id === newLilinId)) return prevInv
            return [
              ...prevInv,
              {
                ...license,
                id: newLilinId,
                deliveredAt: now,
                deliveredBy: 'admin',
                status: 'delivered',
              },
            ]
          })
        }
      }

      return updated
    })
  }, [])

  // 取得當前帳號資訊
  const currentAccount = currentUser ? accounts[currentUser] : null

  // 取得當前帳號的庫存
  const currentInventory = currentUser === 'lilin' ? lilinInventory : []

  const value = {
    currentUser,
    currentAccount,
    currentInventory,
    clients,
    clientInventory,
    products,
    login,
    logout,
    addOrderToClient,
    deliverLicense,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// 自訂 Hook
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp 必須在 AppProvider 內使用')
  }
  return context
}
