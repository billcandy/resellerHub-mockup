/**
 * 初始假資料 - 帳號、客戶、產品、庫存
 * 所有資料在 AppContext 中管理，重新整理瀏覽器即重置
 */

// 產品清單（無預設價格，建立訂單時手動輸入）
export const products = [
  { id: 'watchnode', name: 'WatchNode' },
  { id: 'call', name: 'Call' },
  { id: 'cannguard', name: 'Cannguard' },
  { id: 'nexus', name: 'Nexus' },
  { id: 'merlin-cloud', name: 'Merlin Cloud Recording' },
  { id: 'nxmap', name: 'NxMap' },
  { id: 'trailer', name: 'Trailer Platform' },
]

// 帳號資料
export const accounts = {
  admin: {
    id: 'admin',
    orgName: 'Admin Corp',
    address: '123 Main Street, Las Vegas',
    phoneNumber: '555-0100',
    vatNumber: 'VAT-ADM-001',
    billingCycle: 'Yearly',
    description: 'Master Distributor Account',
    pricingStructure: 'By License',
    role: 'Distributor',
    parentOrg: null, // 頂層組織，無上層
  },
  lilin: {
    id: 'lilin',
    orgName: 'LILIN',
    address: '456 Tech Blvd, Taipei',
    phoneNumber: '886-2-1234-5678',
    vatNumber: 'VAT-LIL-002',
    billingCycle: 'Yearly',
    description: 'LILIN Reseller Account',
    pricingStructure: 'By License',
    role: 'Reseller',
    parentOrg: 'admin', // 上層組織為 Admin Corp
  },
}

// 生成唯一 ID
let _idCounter = 1000
export function generateId() {
  return `lic-${Date.now()}-${_idCounter++}`
}

// 生成隨機 Order Number
function randomOrderNum() {
  const chars = 'abcdef0123456789'
  let s = ''
  for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)]
  return s + '-' + Math.floor(Math.random() * 9000 + 1000)
}

// 客戶清單（Admin 的客戶）
// managementType: 'managed' = 上層可看穿到其下層組織, 'independent' = 上層只能看到這一層
export const initialClients = [
  {
    id: 'client-lilin',
    clientName: 'LILIN',
    type: 'Reseller',
    address: '456 Tech Blvd, Taipei',
    phoneNumber: '886-2-1234-5678',
    vatNumber: 'VAT-LIL-002',
    billingCycle: 'Yearly',
    description: 'LILIN Reseller Account',
    pricingStructure: 'By License',
    linkedAccount: 'lilin', // 連結到 lilin 帳號
    managementType: 'managed',
  },
  {
    id: 'client-techvision',
    clientName: 'TechVision Corp',
    type: 'Reseller',
    address: '789 Innovation Way, San Jose',
    phoneNumber: '555-0201',
    vatNumber: 'VAT-TV-003',
    billingCycle: 'Monthly',
    description: 'Regional reseller - West Coast',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'independent',
  },
  {
    id: 'client-securenet',
    clientName: 'SecureNet Solutions',
    type: 'Installer',
    address: '321 Security Lane, Chicago',
    phoneNumber: '555-0302',
    vatNumber: 'VAT-SN-004',
    billingCycle: 'Yearly',
    description: 'Enterprise security installer',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'managed',
  },
  {
    id: 'client-cloudwatch',
    clientName: 'CloudWatch Ltd',
    type: 'Reseller',
    address: '55 Cloud Ave, London',
    phoneNumber: '44-20-7946-0958',
    vatNumber: 'VAT-CW-005',
    billingCycle: 'Yearly',
    description: 'UK cloud services reseller',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'independent',
  },
  {
    id: 'client-safeguard',
    clientName: 'SafeGuard Systems',
    type: 'Installer',
    address: '88 Guard St, Sydney',
    phoneNumber: '61-2-8765-4321',
    vatNumber: 'VAT-SG-006',
    billingCycle: 'Monthly',
    description: 'APAC security installer',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'managed',
  },
  {
    id: 'client-prosurv',
    clientName: 'ProSurv Inc',
    type: 'Reseller',
    address: '42 Surveillance Dr, Houston',
    phoneNumber: '555-0607',
    vatNumber: 'VAT-PS-007',
    billingCycle: 'Yearly',
    description: 'Professional surveillance reseller',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'independent',
  },
  {
    id: 'client-visionlink',
    clientName: 'VisionLink Asia',
    type: 'Installer',
    address: '16 Vision Rd, Singapore',
    phoneNumber: '65-6789-0123',
    vatNumber: 'VAT-VL-008',
    billingCycle: 'Monthly',
    description: 'SEA region installer',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'managed',
  },
  {
    id: 'client-smarteye',
    clientName: 'SmartEye Security',
    type: 'Reseller',
    address: '99 Smart Way, Berlin',
    phoneNumber: '49-30-1234-5678',
    vatNumber: 'VAT-SE-009',
    billingCycle: 'Yearly',
    description: 'European security reseller',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'managed',
  },
]

// LILIN 的客戶清單（LILIN 的下層組織）
export const initialLilinClients = [
  {
    id: 'lilin-client-alpha',
    clientName: 'Alpha Security',
    type: 'Installer',
    address: '12 Alpha Rd, Taichung',
    phoneNumber: '886-4-2345-6789',
    vatNumber: 'VAT-ALP-010',
    billingCycle: 'Monthly',
    description: 'Central Taiwan security installer',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'managed',
  },
  {
    id: 'lilin-client-beta',
    clientName: 'Beta Networks',
    type: 'Reseller',
    address: '88 Beta St, Kaohsiung',
    phoneNumber: '886-7-3456-7890',
    vatNumber: 'VAT-BET-011',
    billingCycle: 'Yearly',
    description: 'Southern Taiwan network reseller',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'independent',
  },
  {
    id: 'lilin-client-gamma',
    clientName: 'Gamma Tech',
    type: 'Installer',
    address: '36 Gamma Ave, Hsinchu',
    phoneNumber: '886-3-4567-8901',
    vatNumber: 'VAT-GAM-012',
    billingCycle: 'Monthly',
    description: 'Hsinchu tech park installer',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'managed',
  },
]

// Alpha Security 的客戶清單（展示 managed 可看穿多層）
export const initialAlphaClients = [
  {
    id: 'alpha-client-userco-a',
    clientName: 'UserCo A',
    type: 'End User',
    address: '1 User Lane, Taichung',
    phoneNumber: '886-4-1111-2222',
    vatNumber: 'VAT-UCA-013',
    billingCycle: 'Monthly',
    description: 'End user - office building',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'independent',
  },
  {
    id: 'alpha-client-userco-b',
    clientName: 'UserCo B',
    type: 'End User',
    address: '2 User Ave, Taichung',
    phoneNumber: '886-4-3333-4444',
    vatNumber: 'VAT-UCB-014',
    billingCycle: 'Monthly',
    description: 'End user - retail chain',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'independent',
  },
]

// Gamma Tech 的客戶清單（另一個 managed org 的下層）
export const initialGammaClients = [
  {
    id: 'gamma-client-delta',
    clientName: 'Delta Corp',
    type: 'End User',
    address: '99 Delta Blvd, Hsinchu',
    phoneNumber: '886-3-5555-6666',
    vatNumber: 'VAT-DEL-015',
    billingCycle: 'Yearly',
    description: 'Science park end user',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'independent',
  },
]

// SecureNet Solutions 的客戶清單（Managed，有下層）
export const initialSecurenetClients = [
  {
    id: 'securenet-client-1',
    clientName: 'Midwest Guard Co',
    type: 'End User',
    address: '50 Guard Ave, Detroit',
    phoneNumber: '555-0401',
    vatNumber: 'VAT-MWG-016',
    billingCycle: 'Monthly',
    description: 'Midwest industrial security',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'independent',
  },
]

// SafeGuard Systems 的客戶清單（Managed，有下層）
export const initialSafeguardClients = [
  {
    id: 'safeguard-client-1',
    clientName: 'OzSecure Pty',
    type: 'End User',
    address: '10 Koala St, Melbourne',
    phoneNumber: '61-3-9876-5432',
    vatNumber: 'VAT-OZS-017',
    billingCycle: 'Monthly',
    description: 'Melbourne retail security',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'independent',
  },
  {
    id: 'safeguard-client-2',
    clientName: 'KiwiWatch NZ',
    type: 'End User',
    address: '22 Fern Rd, Auckland',
    phoneNumber: '64-9-1234-5678',
    vatNumber: 'VAT-KWN-018',
    billingCycle: 'Yearly',
    description: 'New Zealand surveillance end user',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'independent',
  },
]

// VisionLink Asia 的客戶清單（Managed，有下層）
export const initialVisionlinkClients = [
  {
    id: 'visionlink-client-1',
    clientName: 'SG Campus Security',
    type: 'End User',
    address: '5 Campus Dr, Singapore',
    phoneNumber: '65-6111-2222',
    vatNumber: 'VAT-SGC-019',
    billingCycle: 'Monthly',
    description: 'University campus security',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'independent',
  },
]

// SmartEye Security 的客戶清單（Managed，有下層）
export const initialSmarteyeClients = [
  {
    id: 'smarteye-client-1',
    clientName: 'BerlinWatch GmbH',
    type: 'End User',
    address: '33 Wache Str, Berlin',
    phoneNumber: '49-30-9999-8888',
    vatNumber: 'VAT-BWG-020',
    billingCycle: 'Yearly',
    description: 'Berlin commercial security',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'independent',
  },
  {
    id: 'smarteye-client-2',
    clientName: 'MunichSafe AG',
    type: 'End User',
    address: '77 Sicher Weg, Munich',
    phoneNumber: '49-89-7777-6666',
    vatNumber: 'VAT-MSA-021',
    billingCycle: 'Monthly',
    description: 'Munich office building security',
    pricingStructure: 'By License',
    linkedAccount: null,
    managementType: 'independent',
  },
]

// 各客戶的預設已轉移 License
export function buildInitialClientInventory() {
  const now = new Date()
  const pastDate = (daysAgo) => {
    const d = new Date(now)
    d.setDate(d.getDate() - daysAgo)
    return d.toISOString()
  }

  return {
    'client-lilin': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'WatchNode', price: 50, qty: 2, unused: 2, used: 0, deliveredAt: pastDate(30), deliveredBy: 'admin', status: 'delivered' },
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Call', price: 30, qty: 1, unused: 1, used: 0, deliveredAt: pastDate(15), deliveredBy: 'admin', status: 'delivered' },
    ],
    'client-techvision': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Cannguard', price: 45, qty: 3, unused: 1, used: 2, deliveredAt: pastDate(60), deliveredBy: 'admin', status: 'delivered' },
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'NxMap', price: 60, qty: 1, unused: 0, used: 1, deliveredAt: pastDate(45), deliveredBy: 'admin', status: 'delivered' },
    ],
    'client-securenet': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Nexus', price: 80, qty: 2, unused: 1, used: 1, deliveredAt: pastDate(90), deliveredBy: 'admin', status: 'delivered' },
    ],
    'client-cloudwatch': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Merlin Cloud Recording', price: 120, qty: 5, unused: 2, used: 3, deliveredAt: pastDate(20), deliveredBy: 'admin', status: 'delivered' },
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'WatchNode', price: 50, qty: 1, unused: 0, used: 1, deliveredAt: pastDate(50), deliveredBy: 'admin', status: 'delivered' },
    ],
    'client-safeguard': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Trailer Platform', price: 95, qty: 2, unused: 2, used: 0, deliveredAt: pastDate(10), deliveredBy: 'admin', status: 'delivered' },
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Call', price: 30, qty: 3, unused: 1, used: 2, deliveredAt: pastDate(40), deliveredBy: 'admin', status: 'delivered' },
    ],
    'client-prosurv': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'WatchNode', price: 50, qty: 4, unused: 3, used: 1, deliveredAt: pastDate(25), deliveredBy: 'admin', status: 'delivered' },
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Nexus', price: 80, qty: 1, unused: 1, used: 0, deliveredAt: pastDate(5), deliveredBy: 'admin', status: 'delivered' },
    ],
    'client-visionlink': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Cannguard', price: 45, qty: 2, unused: 0, used: 2, deliveredAt: pastDate(70), deliveredBy: 'admin', status: 'delivered' },
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'NxMap', price: 60, qty: 2, unused: 1, used: 1, deliveredAt: pastDate(35), deliveredBy: 'admin', status: 'delivered' },
    ],
    'client-smarteye': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Merlin Cloud Recording', price: 120, qty: 1, unused: 1, used: 0, deliveredAt: pastDate(8), deliveredBy: 'admin', status: 'delivered' },
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Trailer Platform', price: 95, qty: 1, unused: 0, used: 1, deliveredAt: pastDate(55), deliveredBy: 'admin', status: 'delivered' },
    ],
  }
}

// LILIN 帳號的初始庫存（從 Admin 已轉移的）
export function buildInitialLilinInventory() {
  const now = new Date()
  const pastDate = (daysAgo) => {
    const d = new Date(now)
    d.setDate(d.getDate() - daysAgo)
    return d.toISOString()
  }

  return [
    { id: generateId(), orderNumber: randomOrderNum(), productName: 'WatchNode', price: 50, qty: 2, unused: 2, used: 0, deliveredAt: pastDate(30), deliveredBy: 'admin', status: 'delivered' },
    { id: generateId(), orderNumber: randomOrderNum(), productName: 'Call', price: 30, qty: 1, unused: 1, used: 0, deliveredAt: pastDate(15), deliveredBy: 'admin', status: 'delivered' },
  ]
}

// LILIN 客戶的 License 庫存
export function buildInitialLilinClientInventory() {
  const now = new Date()
  const pastDate = (daysAgo) => {
    const d = new Date(now)
    d.setDate(d.getDate() - daysAgo)
    return d.toISOString()
  }

  return {
    'lilin-client-alpha': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'WatchNode', price: 50, qty: 3, unused: 1, used: 2, deliveredAt: pastDate(20), deliveredBy: 'lilin', status: 'delivered' },
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Cannguard', price: 45, qty: 2, unused: 1, used: 1, deliveredAt: pastDate(10), deliveredBy: 'lilin', status: 'delivered' },
    ],
    'lilin-client-beta': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'NxMap', price: 60, qty: 1, unused: 0, used: 1, deliveredAt: pastDate(35), deliveredBy: 'lilin', status: 'delivered' },
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Call', price: 30, qty: 2, unused: 1, used: 1, deliveredAt: pastDate(18), deliveredBy: 'lilin', status: 'delivered' },
    ],
    'lilin-client-gamma': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Nexus', price: 80, qty: 1, unused: 1, used: 0, deliveredAt: pastDate(7), deliveredBy: 'lilin', status: 'delivered' },
    ],
  }
}

// Alpha Security 客戶的 License 庫存
export function buildInitialAlphaClientInventory() {
  const now = new Date()
  const pastDate = (daysAgo) => {
    const d = new Date(now)
    d.setDate(d.getDate() - daysAgo)
    return d.toISOString()
  }

  return {
    'alpha-client-userco-a': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'WatchNode', price: 50, qty: 1, unused: 0, used: 1, deliveredAt: pastDate(12), deliveredBy: 'alpha', status: 'delivered' },
    ],
    'alpha-client-userco-b': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Cannguard', price: 45, qty: 1, unused: 1, used: 0, deliveredAt: pastDate(5), deliveredBy: 'alpha', status: 'delivered' },
    ],
  }
}

// Gamma Tech 客戶的 License 庫存
export function buildInitialGammaClientInventory() {
  const now = new Date()
  const pastDate = (daysAgo) => {
    const d = new Date(now)
    d.setDate(d.getDate() - daysAgo)
    return d.toISOString()
  }

  return {
    'gamma-client-delta': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Nexus', price: 80, qty: 1, unused: 0, used: 1, deliveredAt: pastDate(3), deliveredBy: 'gamma', status: 'delivered' },
    ],
  }
}

// SecureNet Solutions 客戶的 License 庫存
export function buildInitialSecurenetClientInventory() {
  const now = new Date()
  const pastDate = (daysAgo) => {
    const d = new Date(now)
    d.setDate(d.getDate() - daysAgo)
    return d.toISOString()
  }

  return {
    'securenet-client-1': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Nexus', price: 80, qty: 1, unused: 0, used: 1, deliveredAt: pastDate(45), deliveredBy: 'securenet', status: 'delivered' },
    ],
  }
}

// SafeGuard Systems 客戶的 License 庫存
export function buildInitialSafeguardClientInventory() {
  const now = new Date()
  const pastDate = (daysAgo) => {
    const d = new Date(now)
    d.setDate(d.getDate() - daysAgo)
    return d.toISOString()
  }

  return {
    'safeguard-client-1': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Trailer Platform', price: 95, qty: 1, unused: 1, used: 0, deliveredAt: pastDate(8), deliveredBy: 'safeguard', status: 'delivered' },
    ],
    'safeguard-client-2': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Call', price: 30, qty: 2, unused: 1, used: 1, deliveredAt: pastDate(20), deliveredBy: 'safeguard', status: 'delivered' },
    ],
  }
}

// VisionLink Asia 客戶的 License 庫存
export function buildInitialVisionlinkClientInventory() {
  const now = new Date()
  const pastDate = (daysAgo) => {
    const d = new Date(now)
    d.setDate(d.getDate() - daysAgo)
    return d.toISOString()
  }

  return {
    'visionlink-client-1': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'NxMap', price: 60, qty: 1, unused: 0, used: 1, deliveredAt: pastDate(15), deliveredBy: 'visionlink', status: 'delivered' },
    ],
  }
}

// SmartEye Security 客戶的 License 庫存
export function buildInitialSmarteyeClientInventory() {
  const now = new Date()
  const pastDate = (daysAgo) => {
    const d = new Date(now)
    d.setDate(d.getDate() - daysAgo)
    return d.toISOString()
  }

  return {
    'smarteye-client-1': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'Merlin Cloud Recording', price: 120, qty: 1, unused: 1, used: 0, deliveredAt: pastDate(6), deliveredBy: 'smarteye', status: 'delivered' },
    ],
    'smarteye-client-2': [
      { id: generateId(), orderNumber: randomOrderNum(), productName: 'WatchNode', price: 50, qty: 2, unused: 1, used: 1, deliveredAt: pastDate(30), deliveredBy: 'smarteye', status: 'delivered' },
    ],
  }
}

/**
 * 組織階層資料結構
 * 定義每個帳號的下層組織列表及其庫存來源
 * 用於 Organization Tab 的樹狀圖和表格
 */
// orgHierarchyMap 需要同時支援：
// 1. 帳號 ID 查詢（登入者直接查詢自己的下層）
// 2. 客戶 ID 查詢（遞迴建立樹狀結構時使用）
export const orgHierarchyMap = {
  // 帳號 ID 對應
  admin: {
    clients: initialClients,
    getInventory: buildInitialClientInventory,
  },
  lilin: {
    clients: initialLilinClients,
    getInventory: buildInitialLilinClientInventory,
  },
  // 客戶 ID 對應（遞迴用）
  'client-lilin': {
    clients: initialLilinClients,
    getInventory: buildInitialLilinClientInventory,
  },
  'lilin-client-alpha': {
    clients: initialAlphaClients,
    getInventory: buildInitialAlphaClientInventory,
  },
  'lilin-client-gamma': {
    clients: initialGammaClients,
    getInventory: buildInitialGammaClientInventory,
  },
  'client-securenet': {
    clients: initialSecurenetClients,
    getInventory: buildInitialSecurenetClientInventory,
  },
  'client-safeguard': {
    clients: initialSafeguardClients,
    getInventory: buildInitialSafeguardClientInventory,
  },
  'client-visionlink': {
    clients: initialVisionlinkClients,
    getInventory: buildInitialVisionlinkClientInventory,
  },
  'client-smarteye': {
    clients: initialSmarteyeClients,
    getInventory: buildInitialSmarteyeClientInventory,
  },
}
