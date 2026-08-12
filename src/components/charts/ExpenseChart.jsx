import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/mockData'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl bg-surface-card border border-surface-border px-3 py-2 text-sm shadow-card">
      <p className="text-gray-400">{payload[0].payload.day || payload[0].name}</p>
      <p className="font-semibold text-white">₴{payload[0].value}</p>
    </div>
  )
}

export function WeeklyBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} barCategoryGap="20%">
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6b7280', fontSize: 12 }}
        />
        <YAxis hide />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124, 92, 252, 0.1)' }} />
        <Bar dataKey="amount" fill="#7c5cfc" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function CategoryPieChart() {
  const { categoryTotals } = useApp()

  const data = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        name: c.label,
        value: categoryTotals[c.id] || 0,
        color: c.color,
      })).filter((d) => d.value > 0),
    [categoryTotals]
  )

  if (data.length === 0) {
    return (
      <div className="h-[160px] flex items-center justify-center text-gray-500 text-sm">
        Немає даних
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={160}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={45}
          outerRadius={70}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  )
}
