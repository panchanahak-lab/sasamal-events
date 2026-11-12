import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useSupabase';
import { isSupabaseConfigured } from '@/lib/supabase';

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      // Demo bypass when Supabase is not connected yet
      localStorage.setItem('sasamal_demo_admin', 'true');
      setLoading(false);
      navigate('/admin');
      return;
    }

    const res = await signIn(email, password);
    setLoading(false);

    if (res.error) {
      setError(res.error.message || 'Invalid credentials');
    } else {
      navigate('/admin');
    }
  };

  const handleDemoAccess = () => {
    localStorage.setItem('sasamal_demo_admin', 'true');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-warm-gray-light/20 p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#C5A46D]/15 text-[#B08F56] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#292725]">
            Sasamal Admin Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#77716B] mt-1">
            Authorised Management & Booking Console
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 text-red-600 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#77716B] absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="admin@sasamalevents.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#77716B] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-gray-light/40 focus:border-[#C5A46D] outline-none text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#292725] hover:bg-black text-white font-medium text-sm transition-all shadow-md disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            <ArrowRight className="w-4 h-4 text-[#C5A46D]" />
          </button>
        </form>

        {/* Demo Mode Notice */}
        {!isSupabaseConfigured() && (
          <div className="mt-8 pt-6 border-t border-warm-gray-light/20 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#77716B] mb-3">
              <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
              <span>Supabase credentials not yet configured</span>
            </div>
            <button
              type="button"
              onClick={handleDemoAccess}
              className="text-xs font-bold text-[#C5A46D] hover:underline"
            >
              Click here to Enter Demo Admin Dashboard →
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <a href="/" className="text-xs text-[#77716B] hover:text-[#292725]">
            ← Return to Sasamal Events Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
