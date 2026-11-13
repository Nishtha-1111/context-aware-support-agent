import React, { useState } from 'react';
import { X, Headphones, ChevronDown } from 'lucide-react';

export default function EscalationDialog({ show, onClose, lastUserMessage, setTickets }) {
  const [title, setTitle] = useState(lastUserMessage || '');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      id: `TKT-2024-00${Math.floor(Math.random() * 900 + 100)}`,
      subject: title || 'Support Request',
      status: 'Open',
      priority,
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      orderId: null,
      messages: [
        {
          sender: 'Aarav Sharma',
          text: description || title,
          time: new Date().toLocaleString('en-IN'),
          isUser: true,
        },
      ],
    };
    setTickets((prev) => [newTicket, ...prev]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTitle('');
      setDescription('');
      setPriority('Medium');
      onClose(newTicket);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
        onClick={() => onClose(null)}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-hover w-full max-w-md z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-lavenderDark bg-lavender/30">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
            <Headphones size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-navy text-sm">Connect to Human Agent</h2>
            <p className="text-xs text-gray-500">We'll assign a support agent shortly</p>
          </div>
          <button
            onClick={() => onClose(null)}
            className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          {/* Issue title */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Issue Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Briefly describe your issue"
              className="w-full border border-lavenderDark rounded-xl px-3 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Priority</label>
            <div className="relative">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full appearance-none border border-lavenderDark rounded-xl px-3 py-2.5 text-sm text-navy focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors bg-white pr-8"
              >
                <option value="High">🔴 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Description <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide additional details about your issue..."
              rows={3}
              className="w-full border border-lavenderDark rounded-xl px-3 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => onClose(null)}
              className="flex-1 py-2.5 text-sm font-semibold text-gray-600 border border-lavenderDark rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitted}
              className="flex-1 py-2.5 text-sm font-semibold text-white bg-accent rounded-xl hover:bg-accentLight transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {submitted ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Ticket'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
