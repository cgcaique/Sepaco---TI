import React from 'react';

export const PageHeader: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode }> = ({
  title,
  subtitle,
  action
}) => (
  <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">{children}</div>
);

export const Badge: React.FC<{ label: string; tone?: 'brand' | 'success' | 'warning' | 'danger' }> = ({
  label,
  tone = 'brand'
}) => {
  const tones: Record<string, string> = {
    brand: 'bg-brand-50 text-brand-700',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    danger: 'bg-rose-50 text-rose-700'
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{label}</span>;
};

export const SectionTitle: React.FC<{ label: string }> = ({ label }) => (
  <h2 className="mb-3 text-base font-semibold text-slate-800">{label}</h2>
);
