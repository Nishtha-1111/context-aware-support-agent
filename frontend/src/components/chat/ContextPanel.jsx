import React from 'react';
import { Eye, ChevronRight, Ticket, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { customer, orders, tickets } from '../../data/mockData';

const statusDotColors = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
  default: 'bg-gray-400',
};

export default function ContextPanel({ tickets: liveTickets, onNavigateOrder, onNavigateTickets }) {
  const currentTickets = liveTickets || tickets;
  const openTickets = currentTickets.filter((t) => t.status !== 'Resolved');
  const recentOrders = orders;

  return (
    <div className="w-80 flex-shrink-0 bg-white border-l border-lavenderDark flex flex-col h-full overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-lavenderDark/80 flex items-center justify-between bg-lavender/30">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
            <Eye size={15} />
          </div>
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-navy">Live Context</h3>
            <p className="text-[10px] text-gray-500">Visible to SupportAI</p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
          <Sparkles size={10} /> Active
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 p-4 text-xs">
        {/* Customer section */}
        <section className="bg-gradient-to-br from-lavender/40 to-white rounded-2xl p-3.5 border border-lavenderDark/70 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Customer Identity</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck size={11} /> Verified
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 text-white font-extrabold text-sm shadow-sm">
              {customer.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm text-navy truncate">{customer.name}</p>
              <p className="text-[11px] text-gray-500 truncate">{customer.email}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                  ⭐ {customer.tier}
                </span>
                <span className="text-[10px] text-gray-400">Since Jan '24</span>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Orders section */}
        <section className="bg-white rounded-2xl p-3.5 border border-lavenderDark/70 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Orders History ({recentOrders.length})
            </span>
            <span className="text-[10px] text-gray-400">Click to ask</span>
          </div>

          <div className="space-y-2">
            {recentOrders.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => onNavigateOrder && onNavigateOrder(order.id)}
                className="w-full text-left flex items-center gap-2.5 p-2 rounded-xl bg-lavender/30 hover:bg-lavender border border-transparent hover:border-lavenderDark transition-all group cursor-pointer"
                title={`Ask SupportAI about ${order.id}`}
              >
                <span className="text-xl flex-shrink-0 p-1 bg-white rounded-lg border border-lavenderDark/60">
                  {order.image}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-navy truncate group-hover:text-accent transition-colors">
                    {order.product}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                    <span className="font-mono font-medium">{order.id}</span>
                    <span>•</span>
                    <span className="font-semibold text-navy">₹{order.price?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      statusDotColors[order.statusColor] || statusDotColors.default
                    }`}
                    title={order.status}
                  />
                  <ChevronRight size={13} className="text-gray-300 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Open Tickets section */}
        <section className="bg-white rounded-2xl p-3.5 border border-lavenderDark/70 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Support Tickets</span>
            {onNavigateTickets && (
              <button
                type="button"
                onClick={onNavigateTickets}
                className="text-[10px] font-semibold text-accent hover:underline flex items-center gap-0.5"
              >
                View all <ExternalLink size={10} />
              </button>
            )}
          </div>

          <div
            onClick={onNavigateTickets}
            className="p-3 bg-gradient-to-r from-lavender/60 to-purple-50/50 rounded-xl border border-lavenderDark/60 flex items-center gap-3 cursor-pointer hover:border-accent/40 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent flex-shrink-0">
              <Ticket size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-navy text-xs">
                {openTickets.length} Active / {currentTickets.length} Total
              </p>
              <p className="text-[10px] text-gray-500 truncate">
                {openTickets[0]?.subject || 'No open issues'}
              </p>
            </div>
            <span className="bg-accent text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {openTickets.length}
            </span>
          </div>
        </section>

        {/* Account & Policies summary */}
        <section className="bg-gradient-to-br from-amber-50/80 to-amber-100/40 rounded-2xl p-3.5 border border-amber-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/70">Membership Perks</span>
            <span className="text-[10px] font-bold text-amber-800">Gold Priority</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-600">Loyalty Balance</span>
            <span className="font-bold text-amber-900">{customer.loyaltyPoints?.toLocaleString()} pts</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-600">Policy Coverage</span>
            <span className="font-medium text-navy">10-Day Returns • 1-Yr Warranty</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-600">SLA Response</span>
            <span className="font-medium text-emerald-700">&lt; 15 mins</span>
          </div>
        </section>
      </div>
    </div>
  );
}
