import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

type InputProps = {
  label: string;
  error?: string;
  hint?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, error, hint, className, ...rest }: InputProps) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-xs uppercase tracking-[0.4em] text-muted">{label}</span>
      <input
        className={clsx(
          'rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-ink outline-none transition focus:border-accent focus:bg-white/10 focus:shadow-[0_0_0_2px_rgba(45,212,191,0.2)]',
          error && 'border-red-400/60 text-red-50',
          className
        )}
        {...rest}
      />
      {error ? (
        <span className="text-xs text-red-300">{error}</span>
      ) : hint ? (
        <span className="text-xs text-muted">{hint}</span>
      ) : null}
    </label>
  );
}
