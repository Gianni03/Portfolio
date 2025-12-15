import { Link, Outlet, Navigate } from 'react-router-dom';
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from 'react';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="text-white p-10">
      <h2 className="text-3xl font-bold mb-10">Admin Panel</h2>

      <nav className="flex gap-6 mb-10">
        <Link to="/admin/projects" className="underline">
          Projects
        </Link>
        <Link to="/admin/studies" className="underline">
          Studies
        </Link>
      </nav>

      <Outlet />
    </div>
  );
}
