import { useState, useEffect } from 'react';
import { Menu, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { SkeletonCard } from '../components/ui/LoadingSkeleton';
import KpiCard from '../components/dashboard/KpiCard';
import QueryChart from '../components/dashboard/QueryChart';
import DonutChart from '../components/dashboard/DonutChart';

// KPI config
const KPI_CARDS = [
  {
    title: 'Total Queries',
    value: '1,284',
    trend: '+12%',
    trendLabel: 'from last month',
    icon: TrendingUp,
    iconBg: '#4F46E5',
    trendUp: true,
  },
  {
    title: 'Resolution Rate',
    value: '94.2%',
    trend: '+3.1%',
    trendLabel: 'improvement',
    icon: CheckCircle,
    iconBg: '#10B981',
    trendUp: true,
  },
  {
    title: 'Avg Response Time',
    value: '1.8 min',
    trend: '-0.4 min',
    trendLabel: 'faster',
    icon: Clock,
    iconBg: '#06B6D4',
    trendUp: false,
  },
];

export default function DashboardPage({ setSidebarOpen }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F8F9FF]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-lavenderDark/60 px-4 sm:px-6 py-4 flex items-center gap-3 shadow-sm">
        {/* Hamburger (mobile) */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-lavender transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5 text-navy" />
        </button>

        {/* Title */}
        <div className="flex-1">
          <h1 className="text-lg font-bold text-navy leading-tight">SupportAI Dashboard</h1>
        </div>

        {/* Online status */}
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-xs text-green-600 font-medium hidden sm:inline">Online</span>
        </div>

        {/* Profile avatar */}
        <div
          className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold flex-shrink-0 cursor-pointer select-none"
          title="Aarav Sharma"
        >
          AS
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        {loading ? (
          <>
            {/* Skeleton KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>

            {/* Skeleton charts */}
            <div className="bg-white rounded-card shadow-card p-6 animate-pulse">
              <div className="h-4 bg-lavenderDark rounded-pill w-1/3 mb-3" />
              <div className="h-3 bg-lavenderDark rounded-pill w-1/4 mb-6" />
              <div className="h-64 bg-lavenderDark/50 rounded-xl" />
            </div>

            <div className="bg-white rounded-card shadow-card p-6 animate-pulse">
              <div className="h-4 bg-lavenderDark rounded-pill w-1/3 mb-3" />
              <div className="h-3 bg-lavenderDark rounded-pill w-1/4 mb-6" />
              <div className="h-56 bg-lavenderDark/50 rounded-xl" />
            </div>
          </>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {KPI_CARDS.map((card) => (
                <KpiCard key={card.title} {...card} />
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Line chart — takes 2/3 on desktop */}
              <div className="xl:col-span-2">
                <QueryChart />
              </div>

              {/* Donut chart — takes 1/3 on desktop */}
              <div className="xl:col-span-1">
                <DonutChart />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
