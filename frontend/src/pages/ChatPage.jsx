import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Bot,
  RotateCcw,
  Sparkles,
  Menu,
  PanelRightClose,
  PanelRightOpen,
  Headphones,
} from 'lucide-react';
import MessageBubble from '../components/chat/MessageBubble';
import TypingIndicator from '../components/chat/TypingIndicator';
import ContextPanel from '../components/chat/ContextPanel';
import EscalationDialog from '../components/chat/EscalationDialog';
import SuggestedQuestions from '../components/chat/SuggestedQuestions';
import { customer, orders } from '../data/mockData';

const INITIAL_WELCOME = {
  id: 'welcome-msg',
  role: 'ai',
  text: `Hi ${customer.name}! 👋 I'm SupportAI, your context-aware assistant. I can see your account details, your recent orders (including ${orders[0].id} - ${orders[0].product}), and our company policies. How can I help you today?`,
  timestamp: new Date().toISOString(),
  verification: 'account',
  sources: [],
  orderData: null,
  isError: false,
};

export default function ChatPage({
  tickets,
  setTickets,
  chatHistory,
  setChatHistory,
  pendingQuestion,
  setPendingQuestion,
  pendingChatQuestion,
  setPendingChatQuestion,
  setActivePage,
  setCurrentPage,
  setMobileOpen,
  setSidebarOpen,
  triggerEscalation = false,
  onResetEscalation,
  activeHistoryId,
  setActiveHistoryId,
  setTargetPolicy,
  resetChatTrigger,
}) {
  const navigate = setActivePage || setCurrentPage;
  const toggleMobile = setMobileOpen || setSidebarOpen;
  const initialPending = pendingQuestion || pendingChatQuestion;

  const [messages, setMessages] = useState([INITIAL_WELCOME]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showContext, setShowContext] = useState(true);
  const [showEscalation, setShowEscalation] = useState(false);
  const [lastUserText, setLastUserText] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [reactions, setReactions] = useState({});
  const [lastFailedPrompt, setLastFailedPrompt] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Keyword-based response simulation engine
  const generateAIResponse = (userText) => {
    const textLower = userText.toLowerCase().trim();

    // Check for simulated error trigger
    if (textLower === 'error' || textLower.includes('simulate error') || textLower.includes('throw error')) {
      return {
        text: "Couldn't reach the order service. Please check your network and try again.",
        verification: null,
        sources: [],
        orderData: null,
        isError: true,
      };
    }

    // Check for specific Order ID match
    const orderMatch = orders.find(
      (o) =>
        textLower.includes(o.id.toLowerCase()) ||
        textLower.includes(o.id.replace('ord', 'order ').toLowerCase())
    );
    if (orderMatch) {
      let detailMsg = `Here is the current status for order ${orderMatch.id} (${orderMatch.product}):`;
      if (orderMatch.status === 'Out for Delivery') {
        detailMsg = `Great news! Your ${orderMatch.product} (${orderMatch.id}) is **Out for Delivery** today and scheduled to arrive by 8 PM. Our delivery executive will contact you prior to delivery.`;
      } else if (orderMatch.status === 'Delivered') {
        detailMsg = `Your ${orderMatch.product} (${orderMatch.id}) was successfully delivered on ${orderMatch.deliveredOn || 'recent date'}. If you need to initiate a return or claim warranty, I can help you with that!`;
      } else if (orderMatch.status === 'Returned') {
        detailMsg = `Your return for ${orderMatch.product} (${orderMatch.id}) has been completed. The refund of ₹${orderMatch.price?.toLocaleString('en-IN')} has been credited back to your original payment method.`;
      }

      return {
        text: detailMsg,
        verification: 'account',
        sources: ['Shipping Details'],
        orderData: orderMatch,
        isError: false,
      };
    }

    // Keyword: Track / Order status / Where is my order
    if (
      textLower.includes('track') ||
      textLower.includes('where is my order') ||
      textLower.includes('delivery status') ||
      textLower.includes('status of order') ||
      textLower.includes('delivery') ||
      textLower.includes('when will it arrive')
    ) {
      const activeOrder = orders[0]; // Aura Wireless Headphones (Out for delivery)
      return {
        text: `I checked your active orders. Your latest order **${activeOrder.id}** for **${activeOrder.product}** is **Out for Delivery** right now! Estimated delivery is ${activeOrder.estimatedDelivery}. You can track the courier live with tracking number ${activeOrder.trackingId}.`,
        verification: 'account',
        sources: ['Shipping Details'],
        orderData: activeOrder,
        isError: false,
      };
    }

    // Keyword: Return / Returns
    if (textLower.includes('return') || textLower.includes('exchange')) {
      const returnOrder = orders.find((o) => o.status === 'Returned') || orders[2];
      return {
        text: `According to our **Return Policy**, you can return any eligible product within **10 days** of delivery. I noticed your previous return for the **${returnOrder.product} (${returnOrder.id})** was processed successfully on ${returnOrder.returnedOn}. For your active headphones (ORD12345), you can easily initiate a return from My Orders once delivered!`,
        verification: 'account',
        sources: ['Return Policy', 'Refund Process'],
        orderData: null,
        isError: false,
      };
    }

    // Keyword: Refund / Refunds
    if (textLower.includes('refund') || textLower.includes('money back') || textLower.includes('reimbursement')) {
      return {
        text: `Your refund of **₹3,299** for the returned **ErgoLift Laptop Stand (ORD12201)** has already been initiated to your HDFC Bank card ending in 4102. Refunds typically reflect within **5–7 business days**. If you don't see it by Friday, our billing team can trace the ARN for you.`,
        verification: 'account',
        sources: ['Refund Process'],
        orderData: orders[2],
        isError: false,
      };
    }

    // Keyword: Warranty / Guarantee
    if (textLower.includes('warranty') || textLower.includes('guarantee') || textLower.includes('repair')) {
      const watchOrder = orders.find((o) => o.id === 'ORD12290') || orders[1];
      return {
        text: `All electronics purchased on SupportAI include a minimum **1-year manufacturer warranty**. For your **NovaPulse Smart Watch (${watchOrder.id})**, your warranty is active until October 2025! It covers hardware issues and internal component defects.`,
        verification: 'account',
        sources: ['Warranty Info'],
        orderData: watchOrder,
        isError: false,
      };
    }

    // Keyword: Shipping / Courier / Delivery partner
    if (textLower.includes('ship') || textLower.includes('courier') || textLower.includes('charge')) {
      return {
        text: `We provide **Free Standard Delivery** on all orders above ₹499 via Delhivery, BlueDart, and XpressBees (typically 2–4 days for Bengaluru). Express 1-day delivery is available for ₹99. Your orders are always insured during transit.`,
        verification: 'policy',
        sources: ['Shipping Details'],
        orderData: null,
        isError: false,
      };
    }

    // Keyword: Cancellation / Cancel
    if (textLower.includes('cancel')) {
      return {
        text: `Orders can be cancelled free of charge before they are handed over to the courier. Your current order **ORD12345** is already **Out for Delivery**, so direct cancellation is no longer possible. However, you can either decline delivery at your doorstep or initiate a 1-click return upon arrival!`,
        verification: 'account',
        sources: ['Return Policy'],
        orderData: orders[0],
        isError: false,
      };
    }

    // Keyword: Human / Agent / Escalate / Talk to someone
    if (
      textLower.includes('human') ||
      textLower.includes('agent') ||
      textLower.includes('representative') ||
      textLower.includes('escalate') ||
      textLower.includes('person') ||
      textLower.includes('support team')
    ) {
      setShowEscalation(true);
      return {
        text: `I'd be happy to connect you directly with our dedicated human support team. As a **Premium Member**, your inquiries are prioritized with a response time of under 15 minutes. Please complete the quick details in the popup to assign your ticket!`,
        verification: 'account',
        sources: ['Contact Support'],
        orderData: null,
        isError: false,
      };
    }

    // Keyword: Tickets / My tickets
    if (textLower.includes('ticket') || textLower.includes('open issues')) {
      const openCount = (tickets || []).filter((t) => t.status !== 'Resolved').length;
      return {
        text: `You currently have **${openCount} open support ticket(s)** on your account. The highest priority ticket is regarding your recent refund inquiry. You can view full message threads or mark issues resolved in the **My Tickets** tab.`,
        verification: 'account',
        sources: ['Contact Support'],
        orderData: null,
        isError: false,
      };
    }

    // General fallback context-aware response
    return {
      text: `Thanks for reaching out, Aarav! Based on your **Premium Membership** account, I have full context on your orders (ORD12345, ORD12290, ORD12201, ORD12190) and our store policies. Could you let me know if your inquiry is about an existing order, a return/refund, or policy details?`,
      verification: 'account',
      sources: ['Return Policy', 'Shipping Details', 'Contact Support'],
      orderData: null,
      isError: false,
    };
  };

  // Start New Chat: save current chat to history and reset
  const handleNewChat = () => {
    if (messages.length > 1) {
      const firstUserMsg = messages.find((m) => m.role === 'user');
      const previewText = firstUserMsg ? firstUserMsg.text : 'Support discussion';
      const historyItem = {
        id: `chat-${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        }),
        preview: previewText,
        messages: [...messages],
      };
      setChatHistory((prev) => [historyItem, ...(prev || [])]);
    }
    setMessages([
      {
        ...INITIAL_WELCOME,
        id: `welcome-${Date.now()}`,
        timestamp: new Date().toISOString(),
      },
    ]);
    if (setActiveHistoryId) setActiveHistoryId(null);
  };

  // Send message flow
  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    setLastUserText(query);
    setInputValue('');

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate realistic AI thinking/typing delay (1.2s to 1.8s)
    const delay = Math.floor(Math.random() * 600) + 1200;
    setTimeout(() => {
      const responseData = generateAIResponse(query);
      const aiMessage = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        timestamp: new Date().toISOString(),
        ...responseData,
      };

      if (responseData.isError) {
        setLastFailedPrompt(query);
      }

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, delay);
  };

  // Auto-scroll to bottom on message or typing change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle external escalation trigger (e.g., from sidebar "Talk to an agent")
  useEffect(() => {
    if (triggerEscalation) {
      setShowEscalation(true);
      if (onResetEscalation) onResetEscalation();
    }
  }, [triggerEscalation, onResetEscalation]);

  // Handle external new chat trigger
  useEffect(() => {
    if (resetChatTrigger > 0) {
      handleNewChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetChatTrigger]);

  // Handle pending question from Knowledge page or Suggestions
  useEffect(() => {
    if (initialPending) {
      const q = initialPending;
      if (setPendingQuestion) setPendingQuestion(null);
      if (setPendingChatQuestion) setPendingChatQuestion(null);
      handleSendMessage(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPending]);

  // If activeHistoryId changes, load that history
  useEffect(() => {
    if (activeHistoryId && chatHistory) {
      const found = chatHistory.find((item) => item.id === activeHistoryId);
      if (found && found.messages && found.messages.length > 0) {
        setMessages(found.messages);
      }
    }
  }, [activeHistoryId, chatHistory]);

  // Retry failed response
  const handleRetry = (msgId) => {
    // Remove the error message and re-run with lastFailedPrompt
    setMessages((prev) => prev.filter((m) => m.id !== msgId));
    setIsTyping(true);
    setTimeout(() => {
      let resolvedText = `Reconnected successfully! Here is the latest status for your active order ${orders[0].id} (${orders[0].product}): Out for Delivery today by 8 PM.`;
      if (lastFailedPrompt && lastFailedPrompt !== 'error') {
        const recovered = generateAIResponse(lastFailedPrompt);
        resolvedText = `Reconnected successfully! ${recovered.text}`;
      }
      const aiMessage = {
        id: `ai-retry-${Date.now()}`,
        role: 'ai',
        text: resolvedText,
        timestamp: new Date().toISOString(),
        verification: 'account',
        sources: ['Shipping Details'],
        orderData: orders[0],
        isError: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  // Handle reactions: thumbs up / down
  const handleReact = (msgId, type) => {
    setReactions((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === type ? null : type,
    }));
  };

  // Copy message text to clipboard
  const handleCopy = (msgId, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Navigate to policy from source chip
  const handleNavigateSource = (policyTitle) => {
    if (setTargetPolicy) {
      setTargetPolicy(policyTitle);
    }
    if (navigate) {
      navigate('knowledge');
    }
  };

  // Complete escalation ticket creation
  const handleEscalationComplete = (newTicket) => {
    setShowEscalation(false);
    if (newTicket) {
      const confirmMsg = {
        id: `ai-esc-${Date.now()}`,
        role: 'ai',
        text: `✅ Ticket **${newTicket.id}** ("${newTicket.subject}") has been created with **${newTicket.priority}** priority! Our live specialist will review your request and get back to you shortly. You can monitor its status anytime under My Tickets.`,
        timestamp: new Date().toISOString(),
        verification: 'account',
        sources: ['Contact Support'],
        orderData: null,
        isError: false,
      };
      setMessages((prev) => [...prev, confirmMsg]);
    }
  };

  return (
    <div className="flex h-full w-full bg-[#F8F9FF] overflow-hidden">
      {/* ── Main Chat Column ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-[#F8F9FF] relative">
        {/* Top Header */}
        <header className="h-16 border-b border-lavenderDark/60 bg-white/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleMobile && toggleMobile(true)}
              className="md:hidden p-2 rounded-xl text-navy hover:bg-lavender transition-colors"
              title="Open Navigation"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-white shadow-sm">
                <Bot size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-bold text-navy leading-none">
                    SupportAI Assistant
                  </h1>
                  <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5 hidden sm:block">
                  Context-aware support for {customer.name} ({customer.tier})
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* New Chat Button */}
            <button
              onClick={handleNewChat}
              className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accentLight bg-lavender/60 hover:bg-lavender px-3 py-1.5 rounded-xl border border-lavenderDark transition-all active:scale-95"
              title="Save current and start a fresh chat"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">New Chat</span>
            </button>

            {/* Talk to human button */}
            <button
              onClick={() => setShowEscalation(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-accent bg-white hover:bg-lavender/40 px-3 py-1.5 rounded-xl border border-lavenderDark transition-all active:scale-95"
              title="Connect to Human Agent"
            >
              <Headphones size={13} className="text-accent" />
              <span className="hidden md:inline">Talk to Agent</span>
            </button>

            {/* Context Panel Toggle */}
            <button
              onClick={() => setShowContext(!showContext)}
              className={`p-2 rounded-xl border transition-all ${
                showContext
                  ? 'bg-accent/10 border-accent/30 text-accent'
                  : 'bg-white border-lavenderDark text-gray-500 hover:text-navy'
              }`}
              title={showContext ? 'Hide AI Context Panel' : 'Show AI Context Panel'}
            >
              {showContext ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
            </button>
          </div>
        </header>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-4">
          {/* Information banner */}
          <div className="max-w-xl mx-auto bg-gradient-to-r from-accent/5 via-lavender/50 to-cyan/5 border border-lavenderDark rounded-2xl p-3.5 mb-6 text-center text-xs text-navy/80 flex items-center justify-center gap-2 shadow-xs">
            <Sparkles size={15} className="text-accent shrink-0" />
            <span>
              SupportAI is tailored to your account. Feel free to ask about your active orders, returns, warranties, or company policies!
            </span>
          </div>

          {/* Render All Messages */}
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              copiedId={copiedId}
              reactions={reactions}
              onCopy={handleCopy}
              onReact={handleReact}
              onRetry={handleRetry}
              onNavigate={handleNavigateSource}
            />
          ))}

          {/* Typing indicator */}
          {isTyping && <TypingIndicator />}

          <div ref={messagesEndRef} className="h-2" />
        </div>

        {/* Bottom Input Area */}
        <div className="p-4 sm:px-8 pb-5 bg-white/70 backdrop-blur-md border-t border-lavenderDark/50">
          <div className="max-w-4xl mx-auto space-y-2">
            {/* Suggested Questions */}
            <SuggestedQuestions onSelectQuestion={(q) => handleSendMessage(q)} />

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center bg-white border border-lavenderDark rounded-full shadow-card hover:border-accent/40 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all p-1.5 pl-5"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about orders, refunds, returns, or policies... (try 'ORD12345')"
                className="flex-1 bg-transparent border-none text-sm text-navy placeholder-gray-400 focus:outline-none"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="w-10 h-10 rounded-full bg-accent hover:bg-accentLight disabled:bg-gray-200 text-white flex items-center justify-center transition-all disabled:opacity-50 active:scale-95 shrink-0 shadow-sm"
                title="Send message"
              >
                <Send size={16} className="-ml-0.5" />
              </button>
            </form>

            <div className="flex justify-between items-center px-3 text-[11px] text-gray-400">
              <span>Press Enter to send • Type <strong>ORD12290</strong> or <strong>refund</strong> for live context</span>
              <span className="hidden sm:inline">Protected by 256-bit SSL</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Context Side Panel ───────────────────────────────────── */}
      {showContext && (
        <div className="hidden lg:block shrink-0 h-full animate-in slide-in-from-right duration-200">
          <ContextPanel
            tickets={tickets}
            onNavigateOrder={(ordId) => handleSendMessage(`What is the status of ${ordId}?`)}
            onNavigateTickets={() => navigate && navigate('tickets')}
          />
        </div>
      )}

      {/* ── Escalation Dialog ────────────────────────────────────────── */}
      <EscalationDialog
        show={showEscalation}
        onClose={handleEscalationComplete}
        lastUserMessage={lastUserText}
        setTickets={setTickets}
      />
    </div>
  );
}
