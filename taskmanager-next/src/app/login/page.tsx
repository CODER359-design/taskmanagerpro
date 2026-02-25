"use client";

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { mutate } from 'swr';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login } from '@/lib/auth';
import { API_ROUTES, BRAND } from '@/lib/config';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(form);
      await mutate(API_ROUTES.me);
      router.replace('/dashboard');
    } catch (err) {
      setError((err as Error).message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#050910] via-[#0b1220] to-[#090d14] px-6 text-ink">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-white/5 p-10 shadow-glow backdrop-blur-xl">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-muted">{BRAND.slogan}</p>
          <h1 className="mt-3 text-3xl font-semibold">Sign in</h1>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="team@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          {error && <p className="text-sm text-red-300">{error}</p>}
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? 'Signing in…' : 'Access workspace'}
          </Button>
        </form>
        <p className="text-center text-sm text-muted">
          Need an account?{' '}
          <Link href="/register" className="text-accent hover:text-accent-amber">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
