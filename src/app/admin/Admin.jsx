import { Link, Outlet, Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useSession } from '../../hooks/useSession';

export default function Admin() {
  const { session, loading } = useSession();

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
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
        <Link to="/admin/resume" className="underline">
          Resume
        </Link>
        <button
          onClick={() => {
            supabase.auth.signOut();
          }}
          className="ml-auto underline"
        >
          Logout
        </button>
      </nav>

      <Outlet />
    </div>
  );
}
