import React, { useState } from 'react';
import { Package, Truck, CheckCircle2, Clock, RotateCcw, Copy, Check } from 'lucide-react';

export default function OrderCard({ order }) {
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const statusConfig = {
    'Out for Delivery': {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      stepIndex: 3,
      icon: Truck,
    },
    'Delivered': {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      stepIndex: 4,
      icon: CheckCircle2,
    },
    'Returned': {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      stepIndex: 4,
      icon: RotateCcw,
    },
    'In Transit': {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      stepIndex: 2,
      icon: Package,
    },
    'Processing': {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
      stepIndex: 1,
      icon: Clock,
    },
  };

  const currentConfig = statusConfig[order.status] || {
    bg: 'bg-slate-50',
    text: 'text-slate-700',
    border: 'border-slate-200',
    stepIndex: 1,
    icon: Package,
  };

  const StatusIcon = currentConfig.icon;

  const handleCopyTracking = () => {
    if (order.trackingId) {
      navigator.clipboard?.writeText(order.trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const steps = ['Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

  return (
    <div className="mt-3.5 bg-gradient-to-b from-[#F8F9FF] to-white border border-lavenderDark/80 rounded-2xl p-4 shadow-xs">
      {/* Top Header: Order ID & Status */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-lavenderDark/50">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold bg-accent/10 text-accent px-2.5 py-1 rounded-lg border border-accent/20">
            {order.id}
          </span>
          <span className="text-[11px] text-gray-500">Order Context</span>
        </div>
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${currentConfig.bg} ${currentConfig.text} ${currentConfig.border}`}
        >
          <StatusIcon size={13} />
          {order.status}
        </span>
      </div>

      {/* Product Details */}
      <div className="flex items-center gap-3.5 py-3">
        <div className="w-12 h-12 rounded-xl bg-white border border-lavenderDark flex items-center justify-center text-2xl shadow-xs shrink-0">
          {order.image || '📦'}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-navy truncate">{order.product}</h4>
          <p className="text-xs font-semibold text-accent mt-0.5">
            ₹{order.price?.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Progress Steps (if not returned) */}
      {order.status !== 'Returned' && (
        <div className="py-2.5 px-2 bg-white/80 rounded-xl border border-lavenderDark/40 my-1">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-2 left-3 right-3 h-0.5 bg-gray-200 -z-0" />
            <div
              className="absolute top-2 left-3 h-0.5 bg-accent transition-all duration-500 -z-0"
              style={{
                width: `${(currentConfig.stepIndex / (steps.length - 1)) * 90}%`,
              }}
            />
            {steps.map((step, idx) => {
              const isPassed = idx <= currentConfig.stepIndex;
              const isCurrent = idx === currentConfig.stepIndex;
              return (
                <div key={step} className="flex flex-col items-center z-10">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-all ${
                      isPassed
                        ? 'bg-accent text-white ring-2 ring-accent/20'
                        : 'bg-white border-2 border-gray-300 text-gray-400'
                    }`}
                  >
                    {isPassed ? '✓' : idx + 1}
                  </div>
                  <span
                    className={`text-[9px] mt-1 whitespace-nowrap ${
                      isCurrent
                        ? 'font-bold text-navy'
                        : isPassed
                        ? 'text-gray-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Delivery / Returned Meta */}
      <div className="pt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        {order.estimatedDelivery && order.status === 'Out for Delivery' && (
          <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded-lg border border-amber-200/60">
            <Truck size={13} className="text-amber-600 shrink-0" />
            <span>Est. Delivery: <strong>{order.estimatedDelivery}</strong></span>
          </div>
        )}

        {order.deliveredOn && (
          <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded-lg border border-emerald-200/60">
            <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
            <span>Delivered on: <strong>{order.deliveredOn}</strong></span>
          </div>
        )}

        {order.returnedOn && (
          <div className="flex items-center gap-1.5 text-rose-800 bg-rose-50/80 px-2.5 py-1 rounded-lg border border-rose-200/60">
            <RotateCcw size={13} className="text-rose-600 shrink-0" />
            <span>Returned & Refunded on: <strong>{order.returnedOn}</strong></span>
          </div>
        )}

        {order.trackingId && (
          <button
            onClick={handleCopyTracking}
            className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-accent font-mono bg-white hover:bg-lavender/50 px-2 py-1 rounded-lg border border-lavenderDark/80 transition-colors ml-auto"
            title="Click to copy tracking number"
          >
            <span>Track: {order.trackingId}</span>
            {copied ? <Check size={11} className="text-green-600" /> : <Copy size={11} />}
          </button>
        )}
      </div>
    </div>
  );
}
