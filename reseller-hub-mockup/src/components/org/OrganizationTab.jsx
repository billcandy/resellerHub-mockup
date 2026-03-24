/**
 * OrganizationTab - 組織階層 Tab 主元件
 * 組合 ParentOrgCard + OrgTreeView + SubOrgTable
 * 顯示當前組織在階層中的位置
 */
import { useApp } from '../../context/AppContext'
import ParentOrgCard from './ParentOrgCard'
import OrgTreeView from './OrgTreeView'
import SubOrgTable from './SubOrgTable'

export default function OrganizationTab() {
  const {
    currentUser,
    currentAccount,
    getParentOrg,
    getSubOrgs,
    getOrgTree,
    allInventories,
  } = useApp()

  // 取得 Parent Org 資訊（只有直屬上層）
  const parentOrg = getParentOrg(currentUser)

  // 取得直屬 Sub Org 列表
  const subOrgs = getSubOrgs(currentUser)

  // 取得完整組織樹（managed 展開，independent 不展開）
  const orgTree = getOrgTree(currentUser)

  return (
    <div className="space-y-8">
      {/* 區塊一：Parent Organization */}
      <section>
        <h2 className="text-sm font-medium text-merlin-text-muted uppercase tracking-wider mb-3">
          Parent Organization
        </h2>
        <ParentOrgCard parentOrg={parentOrg} />
      </section>

      {/* 區塊二：Organization Tree */}
      <section>
        <h2 className="text-sm font-medium text-merlin-text-muted uppercase tracking-wider mb-3">
          Organization Tree
        </h2>
        <OrgTreeView orgName={currentAccount.orgName} tree={orgTree} />
      </section>

      {/* 區塊三：Sub Organizations 表格 */}
      <section>
        <h2 className="text-sm font-medium text-merlin-text-muted uppercase tracking-wider mb-3">
          Sub Organizations ({subOrgs.length})
        </h2>
        <div className="bg-merlin-surface border border-merlin-border rounded-lg overflow-hidden">
          <SubOrgTable
            subOrgs={subOrgs}
            allInventories={allInventories}
            orgTree={orgTree}
          />
        </div>
      </section>
    </div>
  )
}
