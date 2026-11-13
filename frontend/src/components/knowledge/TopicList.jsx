import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function TopicList({ topics, selectedTopic, onSelect, showBadge = false }) {
  return (
    <ul className="space-y-1">
      {topics.map((topic) => {
        const isSelected = selectedTopic === topic;
        return (
          <li key={topic}>
            <button
              onClick={() => onSelect(topic)}
              className={`group w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150
                ${isSelected
                  ? 'bg-lavender border-l-4 border-accent text-navy font-semibold'
                  : 'text-slate-600 hover:bg-lavender/70 border-l-4 border-transparent'
                }`}
            >
              <span className="truncate">{topic}</span>
              <span className="flex items-center gap-1 shrink-0">
                {showBadge && !isSelected && (
                  <span className="hidden group-hover:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent/10 text-accent border border-accent/20">
                    Official Policy
                  </span>
                )}
                <ChevronRight
                  size={14}
                  className={`transition-transform duration-150 ${isSelected ? 'text-accent translate-x-0.5' : 'text-slate-400 group-hover:text-accent'}`}
                />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
