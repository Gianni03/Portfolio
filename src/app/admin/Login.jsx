import { supabase } from '../../lib/supabaseClient';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Vuelve al origen desde el que se pidió: localhost en local, el
        // dominio propio en producción. Requiere que esa URL esté autorizada
        // en Supabase → Authentication → URL Configuration.
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    setLoading(false);

    if (signInError) {
      setStatus('idle');
      setError(signInError.message);
      return;
    }

    setStatus('sent');
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl shadow-2xl backdrop-blur-lg">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-light text-white tracking-widest uppercase mb-2">
            Admin Access
          </h2>
          <p className="text-neutral-500 text-sm">
            Enter your email to receive a magic link
          </p>
        </div>

        {status === 'sent' ? (
          <div className="space-y-4 text-center">
            <p className="text-sm text-white">
              Te mandamos el link a <strong>{email}</strong>.
            </p>
            <p className="text-xs text-neutral-500">
              Abrilo desde este mismo dispositivo y este mismo navegador: el
              link vuelve a {window.location.origin}.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white"
            >
              Usar otro email
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider text-neutral-500 ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
                required
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Sending...' : 'Send Magic Link'}
            </button>

            {error && <p className="text-xs text-red-400">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
