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
    <div className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-neutral-700 selection:text-white">
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-neutral-800 pb-6">
          <h2 className="text-3xl font-light text-white tracking-widest uppercase">
            Admin <span className="text-neutral-500">Panel</span>
          </h2>
          
          <button
            onClick={() => {
              supabase.auth.signOut();
            }}
            className="text-sm text-neutral-500 hover:text-red-400 transition-colors mt-4 md:mt-0 tracking-wider uppercase"
          >
            Logout
          </button>
        </header>

        <nav className="flex flex-wrap gap-2 mb-12">
          <NavLink to="/admin/projects">Projects</NavLink>
          <NavLink to="/admin/studies">Studies</NavLink>
          <NavLink to="/admin/resume">Resume</NavLink>
        </nav>

        <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-neutral-800 hover:text-white text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-700"
    >
      {children}
    </Link>
  );
}
