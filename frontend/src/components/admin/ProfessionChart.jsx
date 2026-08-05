import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import EmptyState from '../ui/EmptyState';
import { PieChart as PieIcon } from 'lucide-react';

const COLORS = ['#7C5CFC', '#EC6FBB', '#5B8DEF', '#34D399', '#F59E0B'];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card !bg-white dark:!bg-surface-dark px-3 py-2 text-xs font-medium">
      {payload[0].payload._id || 'Unknown'}: {payload[0].value}
    </div>
  );
}

export function ProfessionBarChart({ data }) {
  if (!data?.length) {
    return <EmptyState icon={PieIcon} title="No profession data yet" description="Once visitors onboard, their professions will show up here." />;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="rgba(124,92,252,0.12)" vertical={false} />
        <XAxis dataKey="_id" tick={{ fontSize: 12, fill: '#6B6478' }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#6B6478' }} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124,92,252,0.06)' }} />
        <Bar dataKey="count" radius={[8, 8, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ProfessionPieChart({ data }) {
  if (!data?.length) {
    return <EmptyState icon={PieIcon} title="No profession data yet" description="Breakdown will appear once you have visitors." />;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="_id"
          innerRadius={60}
          outerRadius={95}
          paddingAngle={3}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: 12, color: '#6B6478' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
