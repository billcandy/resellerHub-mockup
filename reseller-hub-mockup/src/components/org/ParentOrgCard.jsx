/**
 * ParentOrgCard - 顯示直屬上層組織資訊
 * 只顯示直屬 Parent，不暴露 Parent 的 Parent（隱私保護）
 * 若為頂層組織則顯示空狀態提示
 */
import { Building2, MapPin, Phone } from 'lucide-react'

export default function ParentOrgCard({ parentOrg }) {
  // 頂層組織，無上層
  if (!parentOrg) {
    return (
      <div className="bg-merlin-surface border border-merlin-border rounded-lg p-4 text-center">
        <p className="text-merlin-text-muted text-sm">
          You are the top-level organization
        </p>
      </div>
    )
  }

  return (
    <div className="bg-merlin-surface border border-merlin-border rounded-lg p-4">
      {/* 組織名稱 */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-merlin-bg border border-merlin-border flex items-center justify-center">
          <Building2 size={18} className="text-merlin-text-muted" />
        </div>
        <div>
          <h3 className="text-white font-medium">{parentOrg.orgName}</h3>
        </div>
      </div>

      {/* 基本資訊 */}
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2 text-merlin-text-muted">
          <MapPin size={14} />
          <span>{parentOrg.address}</span>
        </div>
        <div className="flex items-center gap-2 text-merlin-text-muted">
          <Phone size={14} />
          <span>{parentOrg.phoneNumber}</span>
        </div>
      </div>
    </div>
  )
}
