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
