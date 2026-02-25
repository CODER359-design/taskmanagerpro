import clsx from 'clsx';
import { ReactNode } from 'react';

type CardProps = {
  className?: string;
  children: ReactNode;
};

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={clsx(
        'glow-panel p-6 shadow-glow transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(3,8,18,0.5)]',
        className
      )}
    >
      {children}
    </div>
  );
}
