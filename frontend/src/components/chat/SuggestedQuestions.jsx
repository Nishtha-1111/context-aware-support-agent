import React from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

const DEFAULT_QUESTIONS = [
  { label: 'Where is ORD12345?', query: 'Where is my order ORD12345?' },
  { label: 'Order ORD12290 status', query: 'Can you show me order ORD12290?' },
  { label: 'Return Policy', query: 'What is your return policy?' },
  { label: 'Refund for laptop stand', query: 'When will I receive my refund for the laptop stand?' },
  { label: 'Warranty coverage', query: 'What does the NovaPulse warranty cover?' },
  { label: 'Test Error State', query: 'error', isTest: true },
];

export default function SuggestedQuestions({ onSelectQuestion, questions = DEFAULT_QUESTIONS }) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 px-1 text-xs scrollbar-none">
      <div className="flex items-center gap-1 text-accent font-semibold shrink-0 pl-1">
        <Sparkles size={13} className="text-accent" />
        <span className="hidden sm:inline">Try:</span>
      </div>
      {questions.map((item, idx) => {
        const label = typeof item === 'string' ? item : item.label;
        const query = typeof item === 'string' ? item : item.query;
        const isTest = typeof item === 'object' && item.isTest;

        return (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectQuestion(query)}
            className={`shrink-0 px-3 py-1.5 rounded-full font-medium transition-all duration-150 shadow-xs flex items-center gap-1.5 active:scale-95 ${
              isTest
                ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                : 'bg-white hover:bg-lavender text-navy hover:text-accent border border-lavenderDark/80 hover:border-accent/40'
            }`}
          >
            {isTest && <AlertCircle size={11} className="text-rose-500" />}
            {label}
          </button>
        );
      })}
    </div>
  );
}
