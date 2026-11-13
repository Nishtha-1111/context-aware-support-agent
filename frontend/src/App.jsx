import { useState } from 'react';
import { Menu } from 'lucide-react';

import Sidebar from './components/Sidebar';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import KnowledgePage from './pages/KnowledgePage';
import TicketsPage from './pages/TicketsPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';

import { tickets as initialTickets } from './data/mockData';

const INITIAL_HISTORY = [
  {
    id: 'chat-hist-1',
    date: '10 Nov, 02:45 PM',
    preview: 'Where is my order ORD12345 (Aura Wireless Headphones)?',
    messages: [
      {
        id: 'hist-m1',
        role: 'user',
        text: 'Where is my order ORD12345?',
        timestamp: '2024-11-10T14:45:00Z',
      },
      {
        id: 'hist-m2',
        role: 'ai',
        text: 'Your order ORD12345 (Aura Wireless Headphones) is Out for Delivery! Estimated delivery is today by 8 PM.',
        timestamp: '2024-11-10T14:45:10Z',
        verification: 'account',
        sources: ['Shipping Details'],
        orderData: {
          id: 'ORD12345',
          product: 'Aura Wireless Headphones',
          price: 8999,
          status: 'Out for Delivery',
          statusColor: 'warning',
          date: '2024-11-10',
          image: '🎧',
          estimatedDelivery: 'Today by 8 PM',
          trackingId: 'TRK9988776655',
        },
      },
    ],
  },
  {
    id: 'chat-hist-2',
    date: '02 Nov, 11:20 AM',
    preview: 'How do I return the ErgoLift Laptop Stand?',
    messages: [
      {
        id: 'hist-m3',
        role: 'user',
        text: 'How do I return the ErgoLift Laptop Stand?',
        timestamp: '2024-11-02T11:20:00Z',
      },
      {
        id: 'hist-m4',
        role: 'ai',
        text: 'You can return eligible items within 10 days of delivery. Your return for ORD12201 has been approved and pickup completed.',
        timestamp: '2024-11-02T11:20:15Z',
        verification: 'account',
        sources: ['Return Policy', 'Refund Process'],
      },
    ],
  },
];

export default function App() {
  const [activePage, setActivePage] = useState('chat');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Shared state across pages
  const [tickets, setTickets] = useState(initialTickets);
  const [chatHistory, setChatHistory] = useState(INITIAL_HISTORY);
  const [pendingChatQuestion, setPendingChatQuestion] = useState(null);
  const [activeHistoryId, setActiveHistoryId] = useState(null);
  const [triggerEscalation, setTriggerEscalation] = useState(false);
  const [targetPolicy, setTargetPolicy] = useState(null);
  const [resetChatTrigger, setResetChatTrigger] = useState(0);

  // Synced notification settings across Profile and Settings
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotif: true,
    smsNotif: true,
    phoneCalls: false,
    pushNotif: true,
  });

  const handleTalkToAgent = () => {
    setActivePage('chat');
    setTriggerEscalation(true);
  };

  const handleNewChat = () => {
    setActivePage('chat');
    setActiveHistoryId(null);
    setResetChatTrigger((prev) => prev + 1);
  };

  const pageProps = {
    activePage,
    setActivePage,
    setCurrentPage: setActivePage,
    mobileOpen,
    setMobileOpen,
    sidebarOpen: mobileOpen,
    setSidebarOpen: setMobileOpen,
    tickets,
    setTickets,
    chatHistory,
    setChatHistory,
    activeHistoryId,
    setActiveHistoryId,
    pendingQuestion: pendingChatQuestion,
    setPendingQuestion: setPendingChatQuestion,
    pendingChatQuestion,
    setPendingChatQuestion,
    triggerEscalation,
    onResetEscalation: () => setTriggerEscalation(false),
    targetPolicy,
    setTargetPolicy,
    resetChatTrigger,
    notificationPreferences,
    setNotificationPreferences,
  };

  const renderPage = () => {
    switch (activePage) {
      case 'chat':      return <ChatPage {...pageProps} />;
      case 'dashboard': return <DashboardPage {...pageProps} />;
      case 'profile':   return <ProfilePage {...pageProps} />;
      case 'knowledge': return <KnowledgePage {...pageProps} />;
      case 'tickets':   return <TicketsPage {...pageProps} />;
      case 'history':   return <HistoryPage {...pageProps} />;
      case 'settings':  return <SettingsPage {...pageProps} />;
      default:          return <ChatPage {...pageProps} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden font-plusJakarta bg-[#F8F9FF]">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onTalkToAgent={handleTalkToAgent}
        onNewChat={handleNewChat}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-lavender">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg text-navy hover:bg-lavender transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <span className="font-bold text-navy text-sm">SupportAI</span>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-600 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
            Online
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-hidden">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
