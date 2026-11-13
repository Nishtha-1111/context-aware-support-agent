import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KpiCard({ title, value, trend, trendLabel, icon: Icon, iconBg, trendUp }) {
  return (
    <div className="bg-white rounded-card shadow-card border border-lavenderDark/50 p-5 flex items-center gap-4">
      {/* Icon block */}
      <div
        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-navy leading-tight mt-0.5">{value}</p>

        {/* Trend badge */}
        <div
          className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-pill text-xs font-semibold ${
            trendUp
              ? 'bg-green-50 text-green-600'
              : 'bg-cyan-50 text-cyan-600'
          }`}
        >
          {trendUp ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{trend}</span>
          {trendLabel && <span className="font-normal text-gray-500 ml-0.5">{trendLabel}</span>}
        </div>
      </div>
    </div>
  );
}
