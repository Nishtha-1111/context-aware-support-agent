import { useState } from 'react';
import { Menu, Ticket, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

function PriorityBadge({ priority }) {
  const map = { High: 'bg-red-100 text-red-700', Medium: 'bg-orange-100 text-orange-700', Low: 'bg-green-100 text-green-700' };
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[priority] ?? 'bg-gray-100 text-gray-600'}`}>{priority}</span>;
}

function StatusBadge({ status }) {
  const map = { Open: 'bg-red-100 text-red-700', Resolved: 'bg-green-100 text-green-700', 'In Progress': 'bg-yellow-100 text-yellow-700' };
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>{status}</span>;
}

const priorityStripe = { High: 'bg-red-500', Medium: 'bg-orange-400', Low: 'bg-green-500' };

export default function TicketsPage({ tickets, setTickets, setSidebarOpen, setActivePage, setCurrentPage }) {
  const navigate = setActivePage || setCurrentPage;
  const [expandedId, setExpandedId] = useState(null);
  const [resolvedMsg, setResolvedMsg] = useState(null);

  const openCount = tickets.filter(t => t.status === 'Open').length;

  function markResolved(id) {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));
    setResolvedMsg(id);
    setTimeout(() => setResolvedMsg(null), 3000);
  }

  return (
    <div className="h-full overflow-y-auto bg-[#F8F9FF]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#EEF2FF] px-4 md:px-8 py-4 flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded-lg text-[#17213D] hover:bg-[#EEF2FF] transition-colors"
          onClick={() => setSidebarOpen && setSidebarOpen(true)}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-bold text-[#17213D] flex-1">My Tickets</h1>
        <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
          Open: {openCount}
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-6 space-y-4">
        {tickets.length === 0 ? (
          /* ─── Empty State ─── */
          <div className="text-center py-16">
            <Ticket size={56} className="mx-auto mb-4 text-gray-200" />
            <p className="text-gray-500 font-medium mb-1">No support tickets yet</p>
            <p className="text-gray-400 text-sm mb-6">Start a chat to get help with your orders</p>
            <button
              onClick={() => navigate('chat')}
              className="bg-accent text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Start a new chat
            </button>
          </div>
        ) : (
          tickets.map(ticket => {
            const isExpanded = expandedId === ticket.id;
            const stripe = priorityStripe[ticket.priority] ?? 'bg-gray-400';
            const isOpen = ticket.status === 'Open';

            return (
              <div
                key={ticket.id}
                className="bg-white rounded-[1rem] border border-[#EEF2FF] shadow-[0_2px_12px_rgba(79,70,229,0.08)] overflow-hidden"
              >
                {/* Priority stripe */}
                <div className={`h-1 ${stripe}`} />

                <div className="p-5">
                  {/* Top row: ID + badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-mono bg-[#EEF2FF] text-accent px-2 py-0.5 rounded-full">{ticket.id}</span>
                    <PriorityBadge priority={ticket.priority} />
                    <StatusBadge status={ticket.status} />
                    {ticket.orderId && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{ticket.orderId}</span>
                    )}
                  </div>

                  {/* Title */}
                  <p className="text-sm font-bold text-[#17213D] mb-1">{ticket.subject}</p>

                  {/* Date + preview */}
                  <p className="text-xs text-gray-400 mb-3">Created {ticket.createdAt}</p>
                  {ticket.messages?.[0] && (
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4">{ticket.messages[0].text}</p>
                  )}

                  {/* Success toast */}
                  {resolvedMsg === ticket.id && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-xl p-3 text-xs mb-3">
                      <CheckCircle size={14} /> Ticket marked as resolved!
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    {isOpen && (
                      <button
                        onClick={() => markResolved(ticket.id)}
                        className="text-xs font-semibold bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle size={13} /> Mark as Resolved
                      </button>
                    )}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : ticket.id)}
                      className="text-xs font-semibold bg-[#EEF2FF] text-accent px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
                    >
                      {isExpanded ? <><ChevronUp size={13} /> Hide Details</> : <><ChevronDown size={13} /> View Details</>}
                    </button>
                  </div>

                  {/* Expanded message thread */}
                  {isExpanded && ticket.messages && (
                    <div className="mt-4 border-t border-[#EEF2FF] pt-4 space-y-3">
                      {ticket.messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs sm:max-w-sm rounded-2xl px-4 py-2.5 text-xs ${
                            msg.isUser
                              ? 'bg-[#EEF2FF] text-[#17213D] rounded-tr-sm'
                              : 'bg-white border border-[#EEF2FF] text-[#17213D] rounded-tl-sm shadow-sm'
                          }`}>
                            <p className="font-semibold mb-0.5 opacity-60">{msg.sender}</p>
                            <p>{msg.text}</p>
                            <p className="text-gray-400 mt-1 text-right">{msg.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
