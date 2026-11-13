import React, { useState, useEffect } from 'react';
import { Menu, BookOpen, Package, AlertCircle, RotateCcw } from 'lucide-react';
import { policies, faqs } from '../data/mockData';
import TopicList from '../components/knowledge/TopicList';
import FaqAccordion from '../components/knowledge/FaqAccordion';
import PolicyViewer from '../components/knowledge/PolicyViewer';

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS = ['FAQs', 'Policies', 'Order Help'];

const FAQ_CATEGORIES = [
  'General Questions',
  'Orders & Delivery',
  'Returns & Refunds',
  'Payments',
  'Account & Security',
];

const POLICY_TOPICS = policies.map((p) => p.title);

const ORDER_HELP_CARDS = [
  {
    id: 'track',
    icon: Package,
    iconBg: 'bg-cyan/10',
    iconColor: 'text-cyan-500',
    title: 'Track My Order',
    description: 'Find out where your order is and get real-time updates',
    cta: 'Ask SupportAI',
    question: 'How do I track my order?',
  },
  {
    id: 'problem',
    icon: AlertCircle,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    title: 'Report a Problem',
    description: "Something wrong with your delivery? We'll help resolve it",
    cta: 'Get Help',
    question: 'I have a problem with my delivery, can you help?',
  },
  {
    id: 'return',
    icon: RotateCcw,
    iconBg: 'bg-violet-100',
    iconColor: 'text-accent',
    title: 'Request a Return',
    description: 'Start a return or exchange within 30 days',
    cta: 'Start Return',
    question: 'How do I request a return or exchange?',
  },
];

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function KnowledgeSkeleton() {
  return (
    <div className="flex gap-6 mt-6 animate-pulse">
      {/* Sidebar skeleton */}
      <div className="hidden md:flex flex-col gap-3 w-52 shrink-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 bg-slate-200 rounded-xl" />
        ))}
      </div>
      {/* Content skeleton */}
      <div className="flex-1 space-y-4">
        <div className="h-6 bg-slate-200 rounded-lg w-1/3" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 bg-slate-100 rounded-[1rem]" />
        ))}
      </div>
    </div>
  );
}

// ─── KnowledgePage ────────────────────────────────────────────────────────────

export default function KnowledgePage(props) {
  const setSidebarOpen = props.setSidebarOpen || props.setMobileOpen;
  const navigate = props.setActivePage || props.setCurrentPage;
  const setPending = props.setPendingChatQuestion || props.setPendingQuestion;

  const [activeTab, setActiveTab] = useState(props.targetPolicy ? 'Policies' : 'FAQs');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState(FAQ_CATEGORIES[0]);
  const [selectedPolicyTitle, setSelectedPolicyTitle] = useState(props.targetPolicy || 'Return Policy');
  const [prevTargetPolicy, setPrevTargetPolicy] = useState(props.targetPolicy);
  const [loading, setLoading] = useState(true);

  if (props.targetPolicy && props.targetPolicy !== prevTargetPolicy) {
    setPrevTargetPolicy(props.targetPolicy);
    setActiveTab('Policies');
    setSelectedPolicyTitle(props.targetPolicy);
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const selectedPolicy = policies.find((p) => p.title === selectedPolicyTitle) ?? policies[0];

  const handleAskInChat = (question) => {
    if (setPending) setPending(question);
    if (navigate) navigate('chat');
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F9FF] min-h-screen">
      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 md:px-8 py-4 flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-lavender transition-colors"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-accent/10 text-accent">
            <BookOpen size={16} />
          </span>
          <h1 className="text-lg font-bold text-navy leading-tight">Knowledge &amp; Policy Assistant</h1>
        </div>
      </header>

      <div className="flex-1 px-4 md:px-8 py-6 overflow-y-auto">
        {/* ── Tabs ──────────────────────────────────────────────────────── */}
        <div className="flex gap-1 p-1 bg-white rounded-[1rem] shadow-card border border-slate-100 w-fit mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                ${activeTab === tab
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-slate-500 hover:text-navy hover:bg-lavender/60'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Loading Skeleton ───────────────────────────────────────────── */}
        {loading ? (
          <KnowledgeSkeleton />
        ) : (
          <>
            {/* ── FAQs Tab ──────────────────────────────────────────────── */}
            {activeTab === 'FAQs' && (
              <div className="flex flex-col md:flex-row gap-6">
                {/* Mobile: horizontal chip strip */}
                <div className="flex md:hidden gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
                  {FAQ_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedFaqCategory(cat)}
                      className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all border
                        ${selectedFaqCategory === cat
                          ? 'bg-accent text-white border-accent'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-accent/40 hover:text-accent'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Desktop: sidebar topic list */}
                <aside className="hidden md:block w-52 shrink-0">
                  <div className="bg-white rounded-[1rem] shadow-card p-3 border border-transparent">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2">Categories</p>
                    <TopicList
                      topics={FAQ_CATEGORIES}
                      selectedTopic={selectedFaqCategory}
                      onSelect={setSelectedFaqCategory}
                    />
                  </div>
                </aside>

                {/* FAQ Accordion */}
                <div className="flex-1">
                  <p className="text-sm text-slate-400 mb-4 font-medium">
                    Showing {faqs.length} frequently asked questions
                  </p>
                  <FaqAccordion
                    faqs={faqs}
                    onAskInChat={handleAskInChat}
                  />
                </div>
              </div>
            )}

            {/* ── Policies Tab ──────────────────────────────────────────── */}
            {activeTab === 'Policies' && (
              <div className="flex flex-col md:flex-row gap-6">
                {/* Mobile: horizontal chip strip */}
                <div className="flex md:hidden gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
                  {POLICY_TOPICS.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setSelectedPolicyTitle(topic)}
                      className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all border
                        ${selectedPolicyTitle === topic
                          ? 'bg-accent text-white border-accent'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-accent/40 hover:text-accent'
                        }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>

                {/* Desktop: sidebar topic list */}
                <aside className="hidden md:block w-56 shrink-0">
                  <div className="bg-white rounded-[1rem] shadow-card p-3 border border-lavenderDark/50">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2">Policy Topics</p>
                    <TopicList
                      topics={POLICY_TOPICS}
                      selectedTopic={selectedPolicyTitle}
                      onSelect={setSelectedPolicyTitle}
                      showBadge
                    />
                  </div>
                </aside>

                {/* Policy content */}
                <div className="flex-1">
                  <PolicyViewer
                    policy={selectedPolicy}
                    onAskQuestion={() => {
                      handleAskInChat(
                        selectedPolicy?.summary
                          ? `Tell me more about the ${selectedPolicy.title} and how it applies to my account`
                          : `What is your ${selectedPolicy?.title || 'policy'}?`
                      );
                    }}
                  />
                </div>
              </div>
            )}

            {/* ── Order Help Tab ─────────────────────────────────────────── */}
            {activeTab === 'Order Help' && (
              <div>
                <p className="text-sm text-slate-500 mb-6">
                  Choose a topic below and SupportAI will help you instantly.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {ORDER_HELP_CARDS.map((card) => {
                    const Icon = card.icon;
                    return (
                      <div
                        key={card.id}
                        className="bg-white rounded-[1rem] shadow-card border border-transparent hover:shadow-hover hover:border-lavender-dark/40 transition-all duration-200 p-6 flex flex-col items-center text-center gap-4"
                      >
                        {/* Icon circle */}
                        <div className={`flex items-center justify-center w-14 h-14 rounded-2xl ${card.iconBg}`}>
                          <Icon size={26} className={card.iconColor} strokeWidth={1.75} />
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-navy mb-1">{card.title}</h3>
                          <p className="text-sm text-slate-500 leading-relaxed">{card.description}</p>
                        </div>

                        <button
                          onClick={() => handleAskInChat(card.question)}
                          className="mt-auto w-full px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold
                            hover:bg-accent/90 active:scale-[0.98] transition-all duration-150 shadow-sm"
                        >
                          {card.cta}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
