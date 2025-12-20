import { Outlet, Link } from 'react-router-dom';

export default function ResumeAdmin() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Resume Admin</h2>

      <nav className="flex gap-4 mb-6">
        <Link to="profile">Profile</Link>
        <Link to="work-experience">Work Experience</Link>
        <Link to="studies">Studies</Link>
      </nav>

      <Outlet />
    </div>
  );
}
