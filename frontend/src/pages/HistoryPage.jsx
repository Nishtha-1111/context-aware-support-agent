import { Menu, Clock, Trash2, MessageCircle, ArrowRight } from 'lucide-react';

export default function HistoryPage({ chatHistory, setChatHistory, setSidebarOpen, setActivePage, setCurrentPage, setActiveHistoryId }) {
  const navigate = setActivePage || setCurrentPage;

  function deleteHistory(id) {
    setChatHistory(prev => prev.filter(item => item.id !== id));
  }

  function continueChat(item) {
    if (setActiveHistoryId) {
      setActiveHistoryId(item.id);
    }
    navigate('chat');
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
        <h1 className="text-lg font-bold text-[#17213D]">Chat History</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-6 space-y-4">
        {!chatHistory || chatHistory.length === 0 ? (
          /* ─── Empty State ─── */
          <div className="text-center py-16">
            <Clock size={56} className="mx-auto mb-4 text-gray-200" />
            <p className="text-gray-500 font-medium mb-1">No conversation history yet</p>
            <p className="text-gray-400 text-sm mb-6">Your past chats with SupportAI will appear here</p>
            <button
              onClick={() => navigate('chat')}
              className="bg-accent text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle size={15} /> Start a chat
            </button>
          </div>
        ) : (
          chatHistory.map(item => {
            const msgCount = item.messages?.length ?? 0;
            const preview = item.preview || item.messages?.find(m => m.role === 'user')?.text || 'Conversation';

            return (
              <div
                key={item.id}
                className="bg-white rounded-[1rem] border border-[#EEF2FF] shadow-[0_2px_12px_rgba(79,70,229,0.08)] p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                      <MessageCircle size={16} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{item.date}</p>
                      <span className="text-xs bg-accent/10 text-accent font-semibold px-2 py-0.5 rounded-full">
                        {msgCount} messages
                      </span>
                    </div>
                  </div>
                  {/* Delete */}
                  <button
                    onClick={() => deleteHistory(item.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                {/* Preview */}
                <p className="text-sm text-gray-700 line-clamp-2 mb-4 pl-11">{preview}</p>

                {/* Continue button */}
                <div className="pl-11">
                  <button
                    onClick={() => continueChat(item)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-indigo-700 transition-colors"
                  >
                    Continue Chat <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
