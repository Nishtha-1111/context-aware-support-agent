import { useState, useEffect } from 'react';
import {
  Menu, Mail, Phone, Package, RotateCcw, Ticket,
  CheckCircle, MessageSquare, RefreshCcw
} from 'lucide-react';
import { customer, orders, tickets as mockTickets, recentActivity } from '../data/mockData';

// ── Toggle ────────────────────────────────────────────────────────────────────
function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${value ? 'bg-accent' : 'bg-gray-200'}`}
      aria-checked={value}
      role="switch"
    >
      <span
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-7' : 'translate-x-1'}`}
      />
    </button>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ className }) {
  return <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />;
}

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    'Out for Delivery': 'bg-cyan-100 text-cyan-700',
    Delivered: 'bg-green-100 text-green-700',
    Returned: 'bg-red-100 text-red-700',
    Open: 'bg-red-100 text-red-700',
    Resolved: 'bg-green-100 text-green-700',
    'In Progress': 'bg-yellow-100 text-yellow-700',
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const map = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-orange-100 text-orange-700',
    Low: 'bg-green-100 text-green-700',
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[priority] ?? 'bg-gray-100 text-gray-600'}`}>
      {priority}
    </span>
  );
}

// ── Activity icon helper ───────────────────────────────────────────────────────
const iconMap = { Package, MessageSquare, RefreshCcw, CheckCircle };
const colorMap = {
  warning: 'border-yellow-400 bg-yellow-50',
  accent: 'border-accent bg-indigo-50',
  success: 'border-green-400 bg-green-50',
  danger: 'border-red-400 bg-red-50',
};
const iconColorMap = {
  warning: 'text-yellow-500',
  accent: 'text-accent',
  success: 'text-green-500',
  danger: 'text-red-500',
};

export default function ProfilePage({
  setSidebarOpen,
  setMobileOpen,
  tickets: liveTickets,
  setTickets,
  notificationPreferences,
  setNotificationPreferences,
}) {
  const toggleMobile = setSidebarOpen || setMobileOpen;
  const ticketsList = liveTickets || mockTickets;

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [resolvedToast, setResolvedToast] = useState(null);

  // Synced notification settings or local fallback
  const [localPrefs, setLocalPrefs] = useState({
    emailNotif: true,
    smsNotif: true,
    phoneCalls: false,
    pushNotif: true,
  });

  const prefs = notificationPreferences || localPrefs;
  const updatePref = (key, val) => {
    if (setNotificationPreferences) {
      setNotificationPreferences((prev) => ({ ...prev, [key]: val }));
    } else {
      setLocalPrefs((prev) => ({ ...prev, [key]: val }));
    }
  };

  const [prefSaved, setPrefSaved] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const tabs = ['Overview', 'Orders', 'Tickets', 'Preferences'];

  function savePreferences() {
    setPrefSaved(true);
    setTimeout(() => setPrefSaved(false), 2500);
  }

  function handleMarkResolved(ticketId) {
    if (setTickets) {
      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? { ...t, status: 'Resolved' } : t))
      );
    }
    setResolvedToast(ticketId);
    setTimeout(() => setResolvedToast(null), 3000);
  }

  const pendingTicketsCount = ticketsList.filter((t) => t.status !== 'Resolved').length;
  const returnsCount = orders.filter((o) => o.status === 'Returned').length;

  return (
    <div className="h-full overflow-y-auto bg-[#F8F9FF]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#EEF2FF] px-4 md:px-8 py-4 flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded-lg text-[#17213D] hover:bg-[#EEF2FF] transition-colors"
          onClick={() => toggleMobile && toggleMobile(true)}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-bold text-[#17213D]">Customer Profile</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {loading ? (
          /* ─── Skeleton ─── */
          <>
            <div className="bg-white rounded-[1rem] shadow-[0_2px_12px_rgba(79,70,229,0.08)] p-6 flex gap-5 items-center">
              <Skeleton className="w-20 h-20 rounded-full" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-56" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1,2,3].map(i => <Skeleton key={i} className="h-24" />)}
            </div>
            <Skeleton className="h-48" />
          </>
        ) : (
          <>
            {/* ─── Profile Hero Card ─── */}
            <div className="bg-white rounded-[1rem] shadow-[0_2px_12px_rgba(79,70,229,0.08)] p-6">
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-violet-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {customer.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-[#17213D]">{customer.name}</h2>
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      ⭐ Premium Member
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-3">Member since {customer.memberSince}</p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5"><Mail size={14} className="text-accent" />{customer.email}</span>
                    <span className="flex items-center gap-1.5"><Phone size={14} className="text-accent" />{customer.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Tabs ─── */}
            <div className="bg-white rounded-[1rem] shadow-[0_2px_12px_rgba(79,70,229,0.08)] overflow-hidden">
              <div className="flex border-b border-[#EEF2FF] overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                      activeTab === tab.toLowerCase()
                        ? 'text-accent border-b-2 border-accent'
                        : 'text-gray-500 hover:text-[#17213D]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {/* ── Overview ── */}
                {activeTab === 'overview' && (
                  <div className="space-y-5">
                    {/* Summary cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-[#EEF2FF] rounded-xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                          <Package size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-[#17213D]">{orders.length}</p>
                          <p className="text-xs text-gray-500">Total Orders</p>
                        </div>
                      </div>
                      <div className="bg-cyan-50 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#06B6D4] flex items-center justify-center">
                          <RotateCcw size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-[#17213D]">{returnsCount}</p>
                          <p className="text-xs text-gray-500">Total Returns</p>
                        </div>
                      </div>
                      <div className="bg-orange-50 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-400 flex items-center justify-center">
                          <Ticket size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-[#17213D]">{pendingTicketsCount}</p>
                          <p className="text-xs text-gray-500">Pending Tickets</p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h3 className="text-sm font-semibold text-[#17213D] mb-3">Recent Activity</h3>
                      <div className="space-y-2">
                        {recentActivity.map(item => {
                          const Icon = iconMap[item.icon] ?? Package;
                          return (
                            <div
                              key={item.id}
                              className={`flex items-start gap-3 p-3 rounded-xl border-l-4 ${colorMap[item.color] ?? 'border-gray-200 bg-gray-50'}`}
                            >
                              <Icon size={16} className={`mt-0.5 flex-shrink-0 ${iconColorMap[item.color] ?? 'text-gray-400'}`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#17213D]">{item.title}</p>
                                <p className="text-xs text-gray-500 truncate">{item.description}</p>
                              </div>
                              <span className="text-xs text-gray-400 flex-shrink-0">{item.time}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Preferred Contact */}
                    <div className="flex items-center gap-3 p-4 bg-[#EEF2FF] rounded-xl">
                      <Mail size={18} className="text-accent" />
                      <div>
                        <p className="text-xs text-gray-500">Preferred Contact</p>
                        <p className="text-sm font-semibold text-[#17213D]">Email</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Orders ── */}
                {activeTab === 'orders' && (
                  <div className="space-y-3">
                    {orders.map(order => (
                      <div key={order.id} className="border border-[#EEF2FF] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                        <span className="text-3xl">{order.image}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-semibold text-[#17213D] text-sm">{order.product}</span>
                            <span className="text-xs bg-[#EEF2FF] text-accent font-mono px-2 py-0.5 rounded-full">{order.id}</span>
                            <StatusBadge status={order.status} />
                          </div>
                          <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
                        <span className="font-bold text-[#17213D] text-sm">₹{order.price.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Tickets ── */}
                {activeTab === 'tickets' && (
                  <div className="space-y-3">
                    {resolvedToast && (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-xl p-3 text-xs mb-3 border border-green-200">
                        <CheckCircle size={14} /> Ticket marked as resolved!
                      </div>
                    )}
                    {ticketsList.length === 0 ? (
                      <div className="text-center py-10 text-gray-400">
                        <Ticket size={40} className="mx-auto mb-2 opacity-30" />
                        <p className="text-sm">No tickets yet</p>
                      </div>
                    ) : (
                      ticketsList.map(t => (
                        <div key={t.id} className="border border-[#EEF2FF] rounded-xl p-4 hover:border-lavenderDark/80 transition-all bg-white shadow-xs">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono bg-[#EEF2FF] text-accent px-2 py-0.5 rounded-full">{t.id}</span>
                              <PriorityBadge priority={t.priority} />
                              <StatusBadge status={t.status} />
                            </div>
                            {t.status === 'Open' && (
                              <button
                                onClick={() => handleMarkResolved(t.id)}
                                className="text-xs font-semibold bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1 rounded-lg border border-green-200 transition-colors flex items-center gap-1"
                              >
                                <CheckCircle size={12} /> Mark resolved
                              </button>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-[#17213D] mb-1">{t.subject}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <span>Created {t.createdAt}</span>
                            {t.orderId && <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t.orderId}</span>}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* ── Preferences ── */}
                {activeTab === 'preferences' && (
                  <div className="space-y-5">
                    <h3 className="text-sm font-semibold text-[#17213D]">Notification Settings</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'emailNotif', label: 'Email Notifications', desc: 'Updates & transcript via email' },
                        { key: 'smsNotif', label: 'SMS Notifications', desc: 'Real-time order delivery alerts' },
                        { key: 'phoneCalls', label: 'Phone Calls', desc: 'Support rep direct callback' },
                        { key: 'pushNotif', label: 'Push Notifications', desc: 'Desktop/mobile browser alerts' },
                      ].map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between py-2 border-b border-[#EEF2FF] last:border-0">
                          <div>
                            <span className="text-sm font-medium text-[#17213D] block">{label}</span>
                            <span className="text-[11px] text-gray-400">{desc}</span>
                          </div>
                          <Toggle value={!!prefs[key]} onChange={(val) => updatePref(key, val)} />
                        </div>
                      ))}
                    </div>

                    {prefSaved && (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-xl p-3 text-sm">
                        <CheckCircle size={16} /> Preferences saved!
                      </div>
                    )}

                    <button
                      onClick={savePreferences}
                      className="w-full sm:w-auto bg-accent text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer shadow-sm active:scale-95"
                    >
                      Save Preferences
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
