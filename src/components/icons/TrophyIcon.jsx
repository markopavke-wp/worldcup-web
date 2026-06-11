import { useId } from 'react';

export default function TrophyIcon({ className = '' }) {
  const gradId = useId().replace(/:/g, '');

  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M18 10h28v8c0 9-4 16-14 18v6h8v4H24v-4h8v-6C22 34 18 27 18 18v-8Z"
        fill={`url(#trophy-gold-${gradId})`}
      />
      <path
        d="M10 14h8v4c0 6 3 10 8 11v-4c-4-1-6-5-6-9v-2H10Zm44 0h-8v2c0 4-2 8-6 9v4c5-1 8-5 8-11v-4Z"
        fill={`url(#trophy-gold-${gradId})`}
      />
      <rect x="22" y="48" width="20" height="4" rx="1" fill={`url(#trophy-gold-${gradId})`} />
      <defs>
        <linearGradient id={`trophy-gold-${gradId}`} x1="10" y1="10" x2="54" y2="52">
          <stop stopColor="#ffe08a" />
          <stop offset="0.5" stopColor="#f5c542" />
          <stop offset="1" stopColor="#c9922a" />
        </linearGradient>
      </defs>
    </svg>
  );
}
