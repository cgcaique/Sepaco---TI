import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const navItems = [
  { label: 'Início', to: '/dashboard' },
  { label: 'Cards', to: '/cliente/cards' },
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'Chat', to: '/chat' },
  { label: 'Admin', to: '/admin' }
];

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile, signOut } = useAuth();
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white p-6 md:flex">
          <div className="mb-6">
            <p className="text-lg font-semibold">CuidaJá</p>
            <p className="text-xs text-slate-500">Marketplace Home Care</p>
          </div>
          <nav className="flex flex-1 flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-6 text-xs text-slate-500">
            {profile?.full_name ?? 'Visitante'} · {profile?.role ?? 'guest'}
          </div>
          <button
            onClick={signOut}
            className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
          >
            Sair
          </button>
        </aside>

        <div className="flex-1">
          <main className="px-4 pb-24 pt-6 md:px-10 md:pb-10">{children}</main>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t border-slate-200 bg-white p-2 md:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center text-[11px] ${
                isActive ? 'text-brand-600' : 'text-slate-500'
              }`
            }
          >
            <span className="text-sm">●</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
