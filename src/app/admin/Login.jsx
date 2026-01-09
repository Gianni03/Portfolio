import { supabase } from '../../lib/supabaseClient';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) {
      alert('Error sending login link: ' + error.message);
    } else {
      alert('Magic link sent! Check your email.');
      navigate('/admin');
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl shadow-2xl backdrop-blur-lg">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-light text-white tracking-widest uppercase mb-2">
            Admin Access
          </h2>
          <p className="text-neutral-500 text-sm">
            Enter you email to receive a magic link
          </p>
        </div>

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
        </form>
      </div>
    </div>
  );
}
