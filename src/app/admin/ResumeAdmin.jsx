import { Outlet, Link } from 'react-router-dom';

export default function ResumeAdmin() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8 border-b border-neutral-800 pb-4">
        <h2 className="text-xl font-medium text-white">Resume Management</h2>
        <div className="h-4 w-px bg-neutral-800"></div>
        <nav className="flex gap-4">
          <Link
            to="profile"
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Profile
          </Link>
          <Link
            to="work-experience"
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Experience
          </Link>
          <Link
            to="studies"
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Studies
          </Link>
        </nav>
      </div>

      <Outlet />
    </div>
  );
}
