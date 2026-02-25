"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import clsx from 'clsx';

import { BRAND } from '@/lib/config';

type NavItem = {
  href: Route;
  label: string;
};

const navItems: NavItem[] = [
  { href: '/dashboard' as Route, label: 'Dashboard' },
  { href: '/projects' as Route, label: 'Projects' },
  { href: '/tasks' as Route, label: 'Tasks' },
  { href: '/admin' as Route, label: 'Admin' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col gap-6 border-r border-white/10 bg-surface/70 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-gradient-to-br from-accent to-accent-amber px-3 py-2 font-semibold text-slate-900">
          TM
        </div>
        <div>
          <p className="text-lg font-semibold">{BRAND.name}</p>
          <p className="text-xs uppercase tracking-wide text-muted">Team Ops</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'rounded-xl px-4 py-2 text-sm font-medium text-muted transition-colors',
              pathname?.startsWith(item.href)
                ? 'bg-white/10 text-ink'
                : 'hover:bg-white/5 hover:text-ink'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
