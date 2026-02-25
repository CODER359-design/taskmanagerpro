"use client";

import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

type AppShellProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
};

export function AppShell({ children, title, subtitle, actions }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-bg text-ink">
      <Sidebar />
      <div className="flex flex-1 flex-col bg-transparent">
        <Header title={title} subtitle={subtitle} actions={actions} />
        <main className="flex-1 space-y-8 px-8 py-10">{children}</main>
      </div>
    </div>
  );
}
