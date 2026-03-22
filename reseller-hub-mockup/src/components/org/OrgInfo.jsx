/**
 * OrgInfo - 組織資訊顯示元件
 */
import { User } from 'lucide-react'

export default function OrgInfo({ account }) {
  const fields = [
    { label: 'Org Name', value: account.orgName },
    { label: 'Address', value: account.address },
    { label: 'Phone Number', value: account.phoneNumber },
    { label: 'VAT Number', value: account.vatNumber },
    { label: 'Billing Cycle', value: account.billingCycle },
    { label: 'Description', value: account.description },
  ]

  return (
    <div>
      {/* 頭像 */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-merlin-surface border border-merlin-border flex items-center justify-center">
          <User size={36} className="text-merlin-text-muted" />
        </div>
      </div>

      {/* 資訊欄位 */}
      <div className="grid grid-cols-6 gap-4 mb-4">
        {fields.map((f) => (
          <div key={f.label}>
            <p className="text-xs text-merlin-text-muted mb-1">{f.label}</p>
            <p className="text-sm text-white">{f.value || '-'}</p>
          </div>
        ))}
      </div>

      {/* Pricing Structure */}
      <div className="mt-2">
        <p className="text-xs text-merlin-text-muted mb-1">Pricing Structure</p>
        <span className="inline-block px-3 py-1 bg-merlin-surface border border-merlin-border rounded text-sm text-white">
          {account.pricingStructure}
        </span>
      </div>
    </div>
  )
}
