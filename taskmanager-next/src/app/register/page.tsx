"use client";

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { mutate } from 'swr';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { register } from '@/lib/auth';
import { API_ROUTES, BRAND } from '@/lib/config';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await register(form);
      await mutate(API_ROUTES.me);
      router.replace('/dashboard');
    } catch (err) {
      const message = err as Error & { errors?: Record<string, string> };
      setErrors(message.errors ?? { form: message.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#050910] via-[#0b1220] to-[#090d14] px-6 text-ink">
      <div className="w-full max-w-lg space-y-8 rounded-3xl border border-white/10 bg-white/5 p-10 shadow-glow backdrop-blur-xl">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-muted">{BRAND.slogan}</p>
          <h1 className="mt-3 text-3xl font-semibold">Create workspace</h1>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Full name"
            placeholder="Jane Catalyst"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            error={errors.name}
          />
          <Input
            label="Email"
            type="email"
            placeholder="team@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            error={errors.password}
          />
          <Input
            label="Confirm password"
            type="password"
            placeholder="Repeat password"
            value={form.password_confirmation}
            onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
            required
            error={errors.password_confirmation}
          />
          {errors.form && <p className="text-sm text-red-300">{errors.form}</p>}
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? 'Creating…' : 'Launch workspace'}
          </Button>
        </form>
        <p className="text-center text-sm text-muted">
          Already have an account?{' '}
          <Link href="/login" className="text-accent hover:text-accent-amber">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
