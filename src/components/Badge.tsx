import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'accent' | 'success' | 'warning' | 'verified' | 'french';
  size?: 'sm' | 'md';
  id?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  id
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-md tracking-tight transition-colors';
  
  const sizeClasses = size === 'sm' 
    ? 'text-xs px-2 py-0.5' 
    : 'text-xs px-2.5 py-1';

  const variantClasses = {
    neutral: 'bg-stone-100 text-stone-700 border border-stone-200/80',
    accent: 'bg-blue-50 text-blue-900 border border-blue-200',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-900 border border-amber-200',
    verified: 'bg-blue-50/80 text-blue-900 border border-blue-200/90 font-semibold',
    french: 'bg-indigo-50/90 text-indigo-950 border border-indigo-200/90 font-medium'
  }[variant];

  return (
    <span id={id} className={`${baseClasses} ${sizeClasses} ${variantClasses}`}>
      {children}
    </span>
  );
};

export const PriceIndicator: React.FC<{ type: string; startingAt?: string; id?: string }> = ({ type, startingAt, id }) => {
  const getStyle = () => {
    switch (type) {
      case 'Gratuit':
        return 'text-emerald-700 bg-emerald-50/70 border-emerald-200';
      case 'Freemium':
        return 'text-blue-800 bg-blue-50/70 border-blue-200';
      case 'Payant':
        return 'text-stone-800 bg-stone-100 border-stone-200';
      case 'Open Source':
        return 'text-purple-800 bg-purple-50 border-purple-200';
      default:
        return 'text-stone-700 bg-stone-100 border-stone-200';
    }
  };

  return (
    <span id={id} className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold rounded border ${getStyle()}`}>
      <span>{type}</span>
      {startingAt && (
        <span className="text-[11px] font-normal text-stone-500 font-mono-code opacity-90">
          • {startingAt.split('/')[0]}
        </span>
      )}
    </span>
  );
};
