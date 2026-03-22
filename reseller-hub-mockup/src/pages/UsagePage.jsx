/**
 * UsagePage - 使用量頁面
 * 顯示 License 使用趨勢與明細
 */
import { useState } from 'react'
import UsageDonutChart from '../components/usage/UsageDonutChart'
import UsageTrendChart from '../components/usage/UsageTrendChart'
import { usageSummary, usageTrend, usageByProduct } from '../data/mockUsage'

export default function UsagePage() {
  const [activeTab, setActiveTab] = useState('trend')

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">Usage</h1>

      {/* 分頁 */}
      <div className="flex gap-6 border-b border-merlin-border mb-6">
        <button
          onClick={() => setActiveTab('trend')}
          className={`pb-2 text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'trend'
              ? 'text-white border-b-2 border-merlin-red'
              : 'text-merlin-text-muted hover:text-white'
          }`}
        >
          Trend
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`pb-2 text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'details'
              ? 'text-white border-b-2 border-merlin-red'
              : 'text-merlin-text-muted hover:text-white'
          }`}
        >
          Usage Details
        </button>
      </div>

      {/* 內容 */}
      {activeTab === 'trend' && (
        <div>
          {/* 摘要卡片 */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-merlin-surface border border-merlin-border rounded-lg p-4">
              <p className="text-merlin-text-muted text-sm">Total Licenses</p>
              <p className="text-3xl font-bold text-white mt-1">{usageSummary.totalLicenses}</p>
            </div>
            <div className="bg-merlin-surface border border-merlin-border rounded-lg p-4">
              <p className="text-merlin-text-muted text-sm">Active</p>
              <p className="text-3xl font-bold text-green-400 mt-1">{usageSummary.activeLicenses}</p>
            </div>
            <div className="bg-merlin-surface border border-merlin-border rounded-lg p-4">
              <p className="text-merlin-text-muted text-sm">Unused</p>
              <p className="text-3xl font-bold text-yellow-400 mt-1">{usageSummary.unusedLicenses}</p>
            </div>
          </div>

          {/* 趨勢圖 */}
          <div className="bg-merlin-surface border border-merlin-border rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-4">License Usage Trend</h2>
            <UsageTrendChart data={usageTrend} />
          </div>
        </div>
      )}

      {activeTab === 'details' && (
        <div className="grid grid-cols-2 gap-6">
          {/* 甜甜圈圖 */}
          <div className="bg-merlin-surface border border-merlin-border rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-4">Overall Usage</h2>
            <UsageDonutChart
              active={usageSummary.activeLicenses}
              unused={usageSummary.unusedLicenses}
            />
          </div>

          {/* 各產品明細 */}
          <div className="bg-merlin-surface border border-merlin-border rounded-lg p-6">
            <h2 className="text-lg font-medium text-white mb-4">By Product</h2>
            <div className="space-y-3">
              {usageByProduct.map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <span className="text-sm text-merlin-text-muted">{p.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-merlin-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-merlin-red rounded-full"
                        style={{ width: `${(p.active / p.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-white w-12 text-right">
                      {p.active}/{p.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
