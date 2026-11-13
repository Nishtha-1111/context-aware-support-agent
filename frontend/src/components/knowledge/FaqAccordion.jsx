import React, { useState } from 'react';
import { ChevronDown, MessageSquarePlus } from 'lucide-react';

export default function FaqAccordion({ faqs, onAskInChat }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => setOpenIndex((prev) => (prev === idx ? null : idx));

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={faq.id ?? idx}
            className={`bg-white rounded-[1rem] shadow-card border transition-all duration-200
              ${isOpen ? 'border-accent/30 shadow-hover' : 'border-transparent hover:border-lavender-dark/60'}`}
          >
            {/* Header */}
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className={`text-sm font-semibold leading-snug transition-colors duration-150 ${isOpen ? 'text-accent' : 'text-navy'}`}>
                {faq.question}
              </span>
              <span
                className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300
                  ${isOpen ? 'bg-accent text-white rotate-180' : 'bg-lavender text-accent rotate-0'}`}
              >
                <ChevronDown size={15} strokeWidth={2.5} />
              </span>
            </button>

            {/* Expandable body */}
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: isOpen ? '400px' : '0px' }}
            >
              <div className="px-5 pb-5">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{faq.answer}</p>
                <button
                  onClick={() => onAskInChat && onAskInChat(faq.question)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
                >
                  <MessageSquarePlus size={13} />
                  Ask in Chat
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
