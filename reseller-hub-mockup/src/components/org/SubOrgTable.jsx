/**
 * SubOrgTable - 直屬下層組織摘要表格
 * 顯示直屬 Sub Org 的名稱、管理類型、下層數量、License 數量
 * Independent org 的 Sub Orgs 欄位顯示 "—"（無權查看）
 */
import { Lock, Unlock, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function SubOrgTable({ subOrgs, allInventories, orgTree }) {
  const [expandedId, setExpandedId] = useState(null)

  if (!subOrgs || subOrgs.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-merlin-text-muted text-sm">No sub-organizations yet</p>
      </div>
    )
  }

  // 從 orgTree 中取得某 org 的子節點數量
  const getSubOrgCount = (orgId) => {
    const node = orgTree.find((n) => n.id === orgId)
    if (!node) return 0
    return node.children ? node.children.length : 0
  }

  // 計算某 org 的 license 總數量
  const getLicenseCount = (orgId) => {
    const inventory = allInventories[orgId] || []
    return inventory.reduce((sum, lic) => sum + lic.qty, 0)
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-merlin-surface text-merlin-text-muted text-left">
            <th className="px-4 py-3 font-medium w-8" />
            <th className="px-4 py-3 font-medium">Organization</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Sub Orgs</th>
            <th className="px-4 py-3 font-medium">Licenses</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-merlin-border">
          {subOrgs.map((org) => {
            const isManaged = org.managementType === 'managed'
            const isExpanded = expandedId === org.id
            const subCount = isManaged ? getSubOrgCount(org.id) : null
            const licenseCount = getLicenseCount(org.id)

            return (
              <tr key={org.id}>
                <td colSpan={5} className="p-0">
                  {/* 主行 */}
                  <div
                    className="flex items-center cursor-pointer hover:bg-merlin-row-hover transition-colors"
                    onClick={() => toggleExpand(org.id)}
                  >
                    {/* 展開箭頭 */}
                    <div className="px-4 py-3 w-8">
                      {isExpanded ? (
                        <ChevronDown size={14} className="text-merlin-text-muted" />
                      ) : (
                        <ChevronRight size={14} className="text-merlin-text-muted" />
                      )}
                    </div>

                    {/* 組織名稱 */}
                    <div className="px-4 py-3 flex-1">
                      <span className="text-white">{org.clientName}</span>
                    </div>

                    {/* 管理類型 */}
                    <div className="px-4 py-3 w-36">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded ${
                          isManaged
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {isManaged ? <Unlock size={12} /> : <Lock size={12} />}
                        {isManaged ? 'Managed' : 'Independent'}
                      </span>
                    </div>

                    {/* Sub Orgs 數量 */}
                    <div className="px-4 py-3 w-28">
                      {isManaged ? (
                        <span className="text-white">{subCount}</span>
                      ) : (
                        <span className="text-merlin-text-muted">—</span>
                      )}
                    </div>

                    {/* License 數量 */}
                    <div className="px-4 py-3 w-28">
                      <span className="text-white">{licenseCount}</span>
                    </div>
                  </div>

                  {/* 展開詳情 */}
                  {isExpanded && (
                    <div className="bg-merlin-bg border-t border-merlin-border px-8 py-4">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-merlin-text-muted mb-1">Address</p>
                          <p className="text-white">{org.address}</p>
                        </div>
                        <div>
                          <p className="text-xs text-merlin-text-muted mb-1">Phone</p>
                          <p className="text-white">{org.phoneNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-merlin-text-muted mb-1">Billing Cycle</p>
                          <p className="text-white">{org.billingCycle}</p>
                        </div>
                        <div>
                          <p className="text-xs text-merlin-text-muted mb-1">Description</p>
                          <p className="text-white">{org.description}</p>
                        </div>
                        <div>
                          <p className="text-xs text-merlin-text-muted mb-1">VAT Number</p>
                          <p className="text-white">{org.vatNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-merlin-text-muted mb-1">Pricing Structure</p>
                          <p className="text-white">{org.pricingStructure}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
