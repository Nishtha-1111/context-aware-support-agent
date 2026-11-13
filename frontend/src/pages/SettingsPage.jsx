import { useState, useEffect } from 'react';
import { Menu, User, Mail, Lock, MessageSquare, Shield, FileText, Phone, Bell, CheckCircle } from 'lucide-react';

// ── Toggle ────────────────────────────────────────────────────────────────────
function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${value ? 'bg-accent' : 'bg-gray-200'}`}
      role="switch"
      aria-checked={value}
    >
      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-7' : 'translate-x-1'}`} />
    </button>
  );
}

// ── Section Card ─────────────────────────────────────────────────────────────
function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-[1rem] border border-[#EEF2FF] shadow-[0_2px_12px_rgba(79,70,229,0.08)] p-5">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#EEF2FF]">
        <Icon size={16} className="text-accent" />
        <h2 className="text-sm font-bold text-[#17213D]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// ── Toggle Row ────────────────────────────────────────────────────────────────
function ToggleRow({ label, description, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[#EEF2FF] last:border-0">
      <div>
        <p className="text-sm font-medium text-[#17213D]">{label}</p>
        {description && <p className="text-xs text-gray-400">{description}</p>}
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ className }) {
  return <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />;
}

export default function SettingsPage({
  setSidebarOpen,
  setMobileOpen,
  notificationPreferences,
  setNotificationPreferences,
}) {
  const toggleMobile = setSidebarOpen || setMobileOpen;
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

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

  // Chat preferences
  const [showContextPanel, setShowContextPanel] = useState(true);
  const [autoSendSuggested, setAutoSendSuggested] = useState(false);
  const [showTypingIndicators, setShowTypingIndicators] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

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
        <h1 className="text-lg font-bold text-[#17213D] flex-1">Settings</h1>
        <button
          onClick={handleSave}
          className="bg-accent text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
        >
          {saved ? <><CheckCircle size={14} /> Saved!</> : 'Save Changes'}
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-6 space-y-5">
        {loading ? (
          <>
            {[180, 220, 160, 130].map((h, i) => (
              <Skeleton key={i} className={`h-${Math.round(h / 4)} w-full`} style={{ height: h }} />
            ))}
          </>
        ) : (
          <>
            {/* ── Notification Settings ── */}
            <SectionCard title="Notification Settings" icon={Bell}>
              <ToggleRow
                label="Email Notifications"
                description="Receive updates and alerts via email"
                value={!!prefs.emailNotif}
                onChange={(v) => updatePref('emailNotif', v)}
              />
              <ToggleRow
                label="SMS Notifications"
                description="Get text messages for order updates"
                value={!!prefs.smsNotif}
                onChange={(v) => updatePref('smsNotif', v)}
              />
              <ToggleRow
                label="Phone Calls"
                description="Allow support calls to your number"
                value={!!prefs.phoneCalls}
                onChange={(v) => updatePref('phoneCalls', v)}
              />
              <ToggleRow
                label="Push Notifications"
                description="Browser push notifications"
                value={!!prefs.pushNotif}
                onChange={(v) => updatePref('pushNotif', v)}
              />
            </SectionCard>

            {/* ── Account Settings ── */}
            <SectionCard title="Account Settings" icon={User}>
              <div className="flex items-center gap-4 py-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-violet-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  AS
                </div>
                <div>
                  <p className="text-sm font-bold text-[#17213D]">Aarav Sharma</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><Mail size={11} /> aarav.sharma@email.com</p>
                  <span className="inline-block mt-1 text-xs bg-yellow-100 text-yellow-700 font-semibold px-2 py-0.5 rounded-full">⭐ Premium Member</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="text-sm font-semibold px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <User size={14} /> Edit Profile
                </button>
                <button className="text-sm font-semibold px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Lock size={14} /> Change Password
                </button>
              </div>
            </SectionCard>

            {/* ── Chat Preferences ── */}
            <SectionCard title="Chat Preferences" icon={MessageSquare}>
              <ToggleRow label="Show Context Panel by default" description="Display order/ticket context alongside chat" value={showContextPanel} onChange={setShowContextPanel} />
              <ToggleRow label="Auto-send suggested questions" description="Send suggested prompts automatically on click" value={autoSendSuggested} onChange={setAutoSendSuggested} />
              <ToggleRow label="Show typing indicators" description="Show animated dots while AI responds" value={showTypingIndicators} onChange={setShowTypingIndicators} />
            </SectionCard>

            {/* ── Support ── */}
            <SectionCard title="Support & Legal" icon={Shield}>
              <div className="space-y-3 py-1">
                <a
                  href="mailto:support@supportai.in"
                  className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-indigo-700 transition-colors"
                >
                  <Phone size={14} /> Contact Support
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  <Shield size={14} /> Privacy Policy
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  <FileText size={14} /> Terms of Service
                </a>
                <div className="pt-3 border-t border-[#EEF2FF]">
                  <p className="text-xs text-gray-400">SupportAI v1.0.0 · Built with ❤️ for seamless support</p>
                </div>
              </div>
            </SectionCard>
          </>
        )}
      </div>
    </div>
  );
}
