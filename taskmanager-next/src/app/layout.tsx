import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';

const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });

export const metadata: Metadata = {
  title: 'TaskManager Pro',
  description: 'Task orchestration for modern teams',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
