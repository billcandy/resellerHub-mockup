/**
 * AppContext - 全域共享狀態
 * 管理帳號切換、庫存資料、License 轉移
 * 重新整理瀏覽器即重置所有資料
 */
import { createContext, useContext, useState, useCallback } from 'react'
import {
  accounts,
  initialClients,
  initialLilinClients,
  initialAlphaClients,
  initialGammaClients,
  buildInitialClientInventory,
  buildInitialLilinInventory,
  buildInitialLilinClientInventory,
  buildInitialAlphaClientInventory,
  buildInitialGammaClientInventory,
  buildInitialSecurenetClientInventory,
  buildInitialSafeguardClientInventory,
  buildInitialVisionlinkClientInventory,
  buildInitialSmarteyeClientInventory,
  orgHierarchyMap,
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

  // 所有層級的庫存快照（用於計算 license 摘要）
  const allInventories = {
    ...clientInventory,
    ...buildInitialLilinClientInventory(),
    ...buildInitialAlphaClientInventory(),
    ...buildInitialGammaClientInventory(),
    ...buildInitialSecurenetClientInventory(),
    ...buildInitialSafeguardClientInventory(),
    ...buildInitialVisionlinkClientInventory(),
    ...buildInitialSmarteyeClientInventory(),
  }

  // 取得直屬 Parent Org 資訊（只回傳直屬上層，不暴露更上面的）
  const getParentOrg = useCallback((accountId) => {
    const account = accounts[accountId]
    if (!account || !account.parentOrg) return null
    const parent = accounts[account.parentOrg]
    return parent ? { orgName: parent.orgName, address: parent.address, phoneNumber: parent.phoneNumber } : null
  }, [])

  // 取得直屬 Sub Org 列表
  const getSubOrgs = useCallback((accountId) => {
    const hierarchy = orgHierarchyMap[accountId]
    if (!hierarchy) return []
    return hierarchy.clients
  }, [])

  /**
   * 遞迴建立組織樹狀結構
   * managed org：展開顯示其下層
   * independent org：不展開（葉節點）
   */
  const getOrgTree = useCallback((accountId) => {
    const subOrgs = getSubOrgs(accountId)
    return subOrgs.map((org) => {
      // 計算該 org 的 license 總數
      const inventory = allInventories[org.id] || []
      const totalLicenses = inventory.reduce((sum, lic) => sum + lic.qty, 0)

      const node = {
        id: org.id,
        name: org.clientName,
        managementType: org.managementType,
        totalLicenses,
        address: org.address,
        phoneNumber: org.phoneNumber,
        children: [],
      }

      // managed org 才遞迴展開子層
      if (org.managementType === 'managed') {
        node.children = getOrgTree(org.id)
      }

      return node
    })
  }, [allInventories, getSubOrgs])

  const value = {
    currentUser,
    currentAccount,
    currentInventory,
    clients,
    clientInventory,
    products,
    allInventories,
    login,
    logout,
    addOrderToClient,
    deliverLicense,
    getParentOrg,
    getSubOrgs,
    getOrgTree,
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
