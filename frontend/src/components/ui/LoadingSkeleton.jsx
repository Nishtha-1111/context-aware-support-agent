// Animated pulse skeleton components for loading states

export function SkeletonAvatar({ size = 'md' }) {
  const sizeMap = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14' };
  return (
    <div
      className={`${sizeMap[size]} rounded-full bg-lavenderDark animate-pulse`}
    />
  );
}

export function SkeletonText({ lines = 1, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-3 rounded-pill bg-lavenderDark animate-pulse ${
            i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div
      className={`bg-white rounded-card p-5 shadow-card space-y-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <SkeletonAvatar />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-lavenderDark rounded-pill animate-pulse w-1/2" />
          <div className="h-3 bg-lavenderDark rounded-pill animate-pulse w-1/3" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}
