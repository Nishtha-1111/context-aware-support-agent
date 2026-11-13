import React from 'react';

export default function SourceChip({ label, onNavigate }) {
  return (
    <button
      onClick={() => onNavigate && onNavigate(label)}
      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-accent border border-accent rounded-full hover:bg-accent hover:text-white transition-colors duration-150"
    >
      <span>📄</span>
      {label}
    </button>
  );
}
