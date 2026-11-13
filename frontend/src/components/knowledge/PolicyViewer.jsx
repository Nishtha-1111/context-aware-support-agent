import React from 'react';
import { CheckCircle2, Calendar, ArrowRight } from 'lucide-react';

function parseContent(content) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let ulItems = [];
  let olItems = [];
  let key = 0;

  const flushUl = () => {
    if (ulItems.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 my-2 pl-1">
          {ulItems.map((item, i) => (
            <li key={i} className="text-sm text-slate-600 leading-relaxed">{item}</li>
          ))}
        </ul>
      );
      ulItems = [];
    }
  };

  const flushOl = () => {
    if (olItems.length > 0) {
      elements.push(
        <ol key={key++} className="list-decimal list-inside space-y-1 my-2 pl-1">
          {olItems.map((item, i) => (
            <li key={i} className="text-sm text-slate-600 leading-relaxed">{item}</li>
          ))}
        </ol>
      );
      olItems = [];
    }
  };

  const renderInline = (text) => {
    // Parse **bold** markers
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-navy">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '') {
      flushUl();
      flushOl();
      elements.push(<div key={key++} className="h-2" />);
      continue;
    }

    // Bullet list
    if (trimmed.startsWith('- ')) {
      flushOl();
      ulItems.push(renderInline(trimmed.slice(2)));
      continue;
    }

    // Ordered list (1. 2. etc.)
    if (/^\d+\.\s/.test(trimmed)) {
      flushUl();
      olItems.push(renderInline(trimmed.replace(/^\d+\.\s/, '')));
      continue;
    }

    // Regular paragraph
    flushUl();
    flushOl();
    elements.push(
      <p key={key++} className="text-sm text-slate-600 leading-relaxed">
        {renderInline(trimmed)}
      </p>
    );
  }

  flushUl();
  flushOl();
  return elements;
}

export default function PolicyViewer({ policy, onAskQuestion }) {
  if (!policy) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
        Select a policy to view details
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[1rem] shadow-card border border-transparent p-6 flex flex-col gap-5">
      {/* Title row */}
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-bold text-navy leading-tight">{policy.title}</h2>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
          <CheckCircle2 size={12} />
          Verified
        </span>
      </div>

      {/* Last updated chip */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Calendar size={12} />
        <span>Last updated: November 2024</span>
      </div>

      {/* Summary */}
      <p className="text-sm font-medium text-accent/80 bg-lavender rounded-lg px-4 py-2.5 leading-relaxed">
        {policy.summary}
      </p>

      {/* Content */}
      <div className="space-y-1">
        {parseContent(policy.content)}
      </div>

      {/* CTA */}
      <button
        onClick={onAskQuestion}
        className="mt-2 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-white text-sm font-semibold
          hover:bg-accent/90 active:scale-[0.98] transition-all duration-150 shadow-sm"
      >
        Ask a related question
        <ArrowRight size={15} />
      </button>
    </div>
  );
}
