import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { donutData } from '../../data/mockData';

const COLORS = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B'];

function CenterLabel() {
  return (
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
      <tspan x="50%" dy="-0.5em" fontSize="22" fontWeight="700" fill="#17213D">
        1,284
      </tspan>
      <tspan x="50%" dy="1.4em" fontSize="12" fill="#6B7280">
        Total
      </tspan>
    </text>
  );
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-navy text-white px-3 py-2 rounded-lg shadow-lg text-sm">
        <p className="font-semibold">{payload[0].name}</p>
        <p>{payload[0].value}%</p>
      </div>
    );
  }
  return null;
}

export default function DonutChart() {
  return (
    <div className="bg-white rounded-card shadow-card border border-lavenderDark/50 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-navy">Query Categories</h3>
        <p className="text-sm text-gray-500 mt-0.5">Breakdown by issue type</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={donutData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            nameKey="name"
            startAngle={90}
            endAngle={-270}
            strokeWidth={0}
          >
            {donutData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <CenterLabel />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        {donutData.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm text-gray-600 truncate">{entry.name}</span>
            <span className="text-sm font-semibold text-navy ml-auto">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
