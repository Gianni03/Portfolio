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
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-6">Admin Login</h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded text-black"
          required
        />

        <button
          disabled={loading}
          className="bg-amber-600 p-2 rounded font-bold"
        >
          {loading ? 'Sending...' : 'Send magic link'}
        </button>
      </form>
    </div>
  );
}
