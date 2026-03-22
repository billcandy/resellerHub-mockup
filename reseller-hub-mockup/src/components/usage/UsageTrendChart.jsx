/**
 * UsageTrendChart - 使用量趨勢折線圖
 */
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function UsageTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" />
        <XAxis dataKey="month" stroke="#888" fontSize={12} />
        <YAxis stroke="#888" fontSize={12} />
        <Tooltip
          contentStyle={{ backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a', borderRadius: 8 }}
          labelStyle={{ color: '#fff' }}
          itemStyle={{ color: '#fff' }}
        />
        <Legend />
        <Line type="monotone" dataKey="active" name="Active" stroke="#cc0000" strokeWidth={2} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="total" name="Total" stroke="#4a9eff" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
