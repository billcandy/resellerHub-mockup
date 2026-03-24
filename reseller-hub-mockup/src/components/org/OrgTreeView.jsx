/**
 * OrgTreeView - 組織階層樹狀圖元件
 * 以當前組織為根節點，遞迴渲染下層組織
 * Managed org：展開顯示其下層子節點
 * Independent org：不展開（葉節點），表示無權查看其下層
 */
import { useState } from 'react'
import { ChevronDown, ChevronRight, Star, Lock, Unlock } from 'lucide-react'

/**
 * 單一樹節點元件（遞迴使用）
 */
function TreeNode({ node, isLast, depth = 0 }) {
  const [expanded, setExpanded] = useState(true)
  const hasChildren = node.children && node.children.length > 0
  const isManaged = node.managementType === 'managed'

  return (
    <div className="relative">
      {/* 節點本體 */}
      <div className="flex items-center gap-2 py-1.5">
        {/* 連接線與縮排 */}
        {depth > 0 && (
          <div className="flex items-center" style={{ width: depth * 24 }}>
            {/* 水平連接線 */}
            <div className="ml-auto w-4 h-px bg-merlin-border" />
          </div>
        )}

        {/* 展開/收合按鈕（只有 managed 且有子節點才顯示） */}
        {hasChildren && isManaged ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-5 h-5 flex items-center justify-center text-merlin-text-muted hover:text-white transition-colors cursor-pointer"
          >
            {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        ) : (
          <div className="w-5 h-5" />
        )}

        {/* 管理狀態圖示 */}
        {isManaged ? (
          <Unlock size={14} className="text-emerald-400 shrink-0" />
        ) : (
          <Lock size={14} className="text-amber-400 shrink-0" />
        )}

        {/* 組織名稱 */}
        <span className="text-sm text-white">{node.name}</span>

        {/* 管理類型 badge */}
        <span
          className={`text-xs px-1.5 py-0.5 rounded ${
            isManaged
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-amber-500/20 text-amber-400'
          }`}
        >
          {isManaged ? 'Managed' : 'Independent'}
        </span>

        {/* License 數量 */}
        {node.totalLicenses > 0 && (
          <span className="text-xs text-merlin-text-muted ml-1">
            {node.totalLicenses} licenses
          </span>
        )}
      </div>

      {/* 子節點（遞迴渲染） */}
      {hasChildren && expanded && isManaged && (
        <div className="relative">
          {/* 垂直連接線 */}
          <div
            className="absolute bg-merlin-border"
            style={{
              left: depth * 24 + 22,
              top: 0,
              bottom: 12,
              width: 1,
            }}
          />
          {node.children.map((child, idx) => (
            <TreeNode
              key={child.id}
              node={child}
              isLast={idx === node.children.length - 1}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * OrgTreeView 主元件
 * @param {string} orgName - 當前組織名稱（根節點顯示 ★）
 * @param {Array} tree - 組織樹狀資料（從 getOrgTree 取得）
 */
export default function OrgTreeView({ orgName, tree }) {
  if (!tree || tree.length === 0) {
    return (
      <div className="bg-merlin-surface border border-merlin-border rounded-lg p-6 text-center">
        <p className="text-merlin-text-muted text-sm">No sub-organizations yet</p>
      </div>
    )
  }

  return (
    <div className="bg-merlin-surface border border-merlin-border rounded-lg p-4">
      {/* 根節點（自己） */}
      <div className="flex items-center gap-2 py-1.5 mb-1">
        <div className="w-5 h-5 flex items-center justify-center">
          <Star size={14} className="text-merlin-red fill-merlin-red" />
        </div>
        <span className="text-sm text-white font-medium">{orgName}</span>
        <span className="text-xs text-merlin-text-muted">(You)</span>
      </div>

      {/* 子節點 */}
      <div className="relative">
        {/* 根節點的垂直連接線 */}
        <div
          className="absolute bg-merlin-border"
          style={{
            left: 22,
            top: 0,
            bottom: 12,
            width: 1,
          }}
        />
        {tree.map((node, idx) => (
          <TreeNode
            key={node.id}
            node={node}
            isLast={idx === tree.length - 1}
            depth={1}
          />
        ))}
      </div>
    </div>
  )
}
