// Colored badge component

const colorMap = {
  success: 'bg-emerald-50 text-success border-emerald-200',
  warning: 'bg-amber-50 text-warning border-amber-200',
  danger: 'bg-red-50 text-danger border-red-200',
  accent: 'bg-lavender text-accent border-lavenderDark',
  navy: 'bg-navy/10 text-navy border-navy/20',
  cyan: 'bg-cyan/10 text-cyan border-cyan/20',
  neutral: 'bg-gray-100 text-gray-600 border-gray-200',
};

/**
 * @param {{ color?: keyof colorMap, children: React.ReactNode, className?: string }} props
 */
export default function Badge({ color = 'neutral', children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-pill text-xs font-semibold border ${
        colorMap[color] ?? colorMap.neutral
      } ${className}`}
    >
      {children}
    </span>
  );
}
