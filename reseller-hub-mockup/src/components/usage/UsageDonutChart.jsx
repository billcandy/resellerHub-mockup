/**
 * UsageDonutChart - 使用量甜甜圈圖
 */
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#cc0000', '#3a3a3a']

export default function UsageDonutChart({ active, unused }) {
  const data = [
    { name: 'Active', value: active },
    { name: 'Unused', value: unused },
  ]

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a', borderRadius: 8 }}
            itemStyle={{ color: '#fff' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-merlin-red" />
          <span className="text-sm text-merlin-text-muted">Active ({active})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-merlin-border" />
          <span className="text-sm text-merlin-text-muted">Unused ({unused})</span>
        </div>
      </div>
    </div>
  )
}
