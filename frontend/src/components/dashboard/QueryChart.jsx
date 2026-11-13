import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { chartData } from '../../data/mockData';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-navy text-white px-4 py-3 rounded-xl shadow-lg text-sm">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function QueryChart() {
  return (
    <div className="bg-white rounded-card shadow-card border border-lavenderDark/50 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-navy">Query Trends — Last 6 Months</h3>
        <p className="text-sm text-gray-500 mt-0.5">Customer Queries vs Resolved Queries</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EEF2FF" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={{ stroke: '#C7D2FE' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '16px', fontSize: '13px' }}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey="queries"
            name="Queries"
            stroke="#4F46E5"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#4F46E5', strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="resolved"
            name="Resolved"
            stroke="#10B981"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#10B981', strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
