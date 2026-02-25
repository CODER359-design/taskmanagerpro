"use client";

import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonProps = {
  as?: 'button' | 'link';
  href?: string;
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const sizeMap = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
};

export function Button({
  as = 'button',
  href = '#',
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  const base = clsx(
    'inline-flex items-center gap-2 rounded-full font-semibold transition-transform duration-200 hover:-translate-y-0.5',
    sizeMap[size],
    variant === 'primary'
      ? 'bg-gradient-to-r from-accent to-accent-amber text-slate-900 shadow-[0_15px_40px_rgba(45,212,191,0.35)]'
      : 'border border-white/15 text-ink/80 hover:text-ink'
  );

  if (as === 'link') {
    return (
      <Link href={href} className={clsx(base, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={clsx(base, className)} {...rest}>
      {children}
    </button>
  );
}
