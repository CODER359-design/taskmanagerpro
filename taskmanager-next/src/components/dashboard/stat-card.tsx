import { Card } from '@/components/ui/card';
import { ReactNode } from 'react';

export function StatCard({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <Card className="relative overflow-hidden">
      <p className="text-xs uppercase tracking-[0.4em] text-muted">{label}</p>
      <h3 className="mt-4 text-3xl font-semibold">{value}</h3>
      {delta && <p className="mt-2 text-sm text-accent">{delta}</p>}
      <span className="pointer-events-none absolute right-6 top-4 text-4xl text-white/5">•</span>
    </Card>
  );
}
