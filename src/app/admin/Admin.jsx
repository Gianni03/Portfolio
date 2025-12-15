import { Link, Outlet } from "react-router-dom";

export default function Admin() {
  console.log("ADMIN RENDER");
  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold mb-10">Admin Panel</h1>

      <nav className="flex gap-6 mb-10">
        <Link to="/admin/projects" className="underline">Projects</Link>
        <Link to="/admin/studies" className="underline">Studies</Link>
      </nav>

      <Outlet />
    </div>
  );
}