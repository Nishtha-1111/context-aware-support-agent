import React from 'react';
import { Bot, ThumbsUp, ThumbsDown, Copy, Check, AlertTriangle, RefreshCw } from 'lucide-react';
import OrderCard from './OrderCard';
import SourceChip from './SourceChip';

export default function MessageBubble({
  message,
  copiedId,
  reactions,
  onCopy,
  onReact,
  onRetry,
  onNavigate,
}) {
  const isUser = message.role === 'user';

  const formatTime = (ts) => {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[75%] md:max-w-[60%]">
          <div
            className="bg-lavender text-navy px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed"
            style={{ wordBreak: 'break-word' }}
          >
            {message.text}
          </div>
          <p className="text-right text-[10px] text-gray-400 mt-1 pr-1">{formatTime(message.timestamp)}</p>
        </div>
      </div>
    );
  }

  // AI message
  return (
    <div className="flex items-start gap-3 mb-4">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
        <Bot size={15} className="text-white" />
      </div>

      {/* Bubble */}
      <div className="max-w-[80%] md:max-w-[70%]">
        <div className="bg-white border border-lavenderDark shadow-card rounded-2xl rounded-tl-sm px-4 py-3">
          {/* Error state */}
          {message.isError ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-red-500 text-sm font-medium">
                <AlertTriangle size={16} />
                <span>{message.text}</span>
              </div>
              {onRetry && (
                <button
                  onClick={() => onRetry(message.id)}
                  className="self-start flex items-center gap-1.5 text-xs text-accent font-semibold border border-accent rounded-full px-3 py-1 hover:bg-accent hover:text-white transition-colors"
                >
                  <RefreshCw size={12} />
                  Try again
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Verification badge */}
              {message.verification === 'account' && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full mb-2">
                  ✓ Verified from your account
                </span>
              )}
              {message.verification === 'policy' && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full mb-2">
                  📋 Policy sourced
                </span>
              )}

              {/* Text */}
              <p className="text-sm text-gray-800 leading-relaxed" style={{ wordBreak: 'break-word' }}>
                {message.text}
              </p>

              {/* Order card */}
              {message.orderData && <OrderCard order={message.orderData} />}

              {/* Source chips */}
              {message.sources && message.sources.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {message.sources.map((src) => (
                    <SourceChip key={src} label={src} onNavigate={onNavigate} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Action row (not for error messages) */}
        {!message.isError && (
          <div className="flex items-center gap-2 mt-1.5 pl-1">
            <p className="text-[10px] text-gray-400">{formatTime(message.timestamp)}</p>
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => onReact(message.id, 'up')}
                className={`p-1 rounded-full transition-colors ${
                  reactions[message.id] === 'up'
                    ? 'text-accent'
                    : 'text-gray-400 hover:text-accent'
                }`}
                title="Helpful"
              >
                <ThumbsUp size={13} />
              </button>
              <button
                onClick={() => onReact(message.id, 'down')}
                className={`p-1 rounded-full transition-colors ${
                  reactions[message.id] === 'down'
                    ? 'text-accent'
                    : 'text-gray-400 hover:text-accent'
                }`}
                title="Not helpful"
              >
                <ThumbsDown size={13} />
              </button>
              <button
                onClick={() => onCopy(message.id, message.text)}
                className={`p-1 rounded-full transition-colors ${
                  copiedId === message.id ? 'text-green-500' : 'text-gray-400 hover:text-accent'
                }`}
                title="Copy"
              >
                {copiedId === message.id ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
