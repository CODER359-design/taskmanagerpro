import { BRAND } from '@/lib/config';
import clsx from 'clsx';
import { ReactNode } from 'react';

type HeaderProps = {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
};

export function Header({ title = 'Welcome back', subtitle = BRAND.slogan, actions }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-white/5 px-8 py-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted">{subtitle}</p>
        <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
      </div>
      <div className={clsx('flex items-center gap-3', actions ? '' : 'opacity-0 pointer-events-none')}>{actions}</div>
    </header>
  );
}
