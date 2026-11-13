import {
  Headset,
  MessageSquarePlus,
  Ticket,
  Clock,
  Settings,
  PhoneCall,
  LayoutDashboard,
  BookOpen,
  User,
} from 'lucide-react';

const primaryNav = [
  { id: 'chat', label: 'New Chat', icon: MessageSquarePlus },
  { id: 'tickets', label: 'My Tickets', icon: Ticket },
  { id: 'history', label: 'History', icon: Clock },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const secondaryNav = [
  { id: 'dashboard', label: 'SupportAI Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'Customer Profile', icon: User },
  { id: 'knowledge', label: 'Knowledge & Policy', icon: BookOpen },
];

/**
 * @param {{
 *   activePage: string,
 *   setActivePage: (page: string) => void,
 *   mobileOpen: boolean,
 *   setMobileOpen: (open: boolean) => void,
 *   onTalkToAgent?: () => void,
 *   onNewChat?: () => void,
 * }} props
 */
export default function Sidebar({
  activePage,
  setActivePage,
  mobileOpen,
  setMobileOpen,
  onTalkToAgent,
  onNewChat,
}) {
  const handleNav = (id) => {
    if (id === 'chat') {
      if (onNewChat) {
        onNewChat();
      } else {
        setActivePage('chat');
      }
    } else {
      setActivePage(id);
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-30 md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40 flex flex-col
          bg-[#17213D] text-white border-r border-white/10
          transition-transform duration-300 ease-in-out
          w-[270px] shrink-0
          md:translate-x-0 md:static md:z-auto
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#4F46E5] to-[#6366F1] flex items-center justify-center flex-shrink-0 shadow-md">
            <Headset size={22} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-white">SupportAI</span>
            </div>
            <p className="text-[11px] text-white/50 mt-0.5">Context-aware support</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
          {/* Main workspace section */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 px-3 mb-1.5">
              Support
            </p>
            <div className="space-y-1">
              {primaryNav.map(({ id, label, icon: Icon }) => {
                const isActive = activePage === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleNav(id)}
                    className={`
                      w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl
                      text-sm font-medium transition-all duration-150 text-left
                      relative cursor-pointer select-none
                      ${isActive
                        ? 'bg-white/12 text-white font-semibold shadow-xs'
                        : 'text-white/65 hover:bg-white/6 hover:text-white'}
                    `}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#4F46E5] rounded-r-full shadow-sm" />
                    )}
                    <Icon
                      size={18}
                      className={isActive ? 'text-[#818CF8]' : 'text-white/50'}
                    />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Portal & Knowledge section */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 px-3 mb-1.5">
              Workspace & Insights
            </p>
            <div className="space-y-1">
              {secondaryNav.map(({ id, label, icon: Icon }) => {
                const isActive = activePage === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleNav(id)}
                    className={`
                      w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl
                      text-sm font-medium transition-all duration-150 text-left
                      relative cursor-pointer select-none
                      ${isActive
                        ? 'bg-white/12 text-white font-semibold shadow-xs'
                        : 'text-white/65 hover:bg-white/6 hover:text-white'}
                    `}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#4F46E5] rounded-r-full shadow-sm" />
                    )}
                    <Icon
                      size={18}
                      className={isActive ? 'text-[#818CF8]' : 'text-white/50'}
                    />
                    <span className="truncate">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Human Help Card at the bottom */}
        <div className="p-4 border-t border-white/10">
          <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-2xl p-4 border border-white/10 space-y-3 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#4F46E5] flex items-center justify-center shrink-0 shadow-xs">
                <PhoneCall size={16} className="text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-none">Need human help?</h4>
                <p className="text-[10px] text-white/50 mt-0.5">Average wait &lt; 2 mins</p>
              </div>
            </div>
            <p className="text-[11px] text-white/60 leading-relaxed">
              Connect with a dedicated live support agent for specialized claims or escalation.
            </p>
            <button
              onClick={() => {
                if (onTalkToAgent) {
                  onTalkToAgent();
                } else {
                  setActivePage('chat');
                }
                setMobileOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#6366F1] active:scale-95 transition-all text-white text-xs font-bold cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
            >
              <PhoneCall size={13} />
              Talk to an agent
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
