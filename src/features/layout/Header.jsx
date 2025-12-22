import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const location = useLocation();
  const isResume = location.pathname === '/resume';

  // Smooth Scroll handler
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    const sections = ['projects', 'skills', 'studies', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6, // 60% visible = activa la sección
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Dynamic menu
  const navItems = [
    { id: 'home-main', label: 'Home', path: '/' },
    { id: 'projects', label: 'Proyectos', path: '#projects' },
    { id: 'skills', label: 'Habilidades', path: '#skills' },
    { id: 'studies', label: 'Estudios', path: '#studies' },
    { id: 'contact', label: 'Contact', path: '#contact' },
    isResume
      ? { id: 'home-resume', label: 'Home', path: '/' }
      : { id: 'resume-web', label: 'Resume Web', path: '/resume' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-xl font-bold tracking-tight hover:text-neutral-300 transition"
        >
          Gianni.dev
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-neutral-300">
          {navItems.map(({ id, label, path }) => {
            // HASH LINKS (smooth scroll)
            if (path.startsWith('#')) {
              const id = path.replace('#', '');
              return (
                <button
                  key={path}
                  onClick={() => scrollToId(id)}
                  className={`hover:text-white transition ${
                    activeSection === id ? 'text-white font-semibold' : ''
                  }`}
                >
                  {label}
                </button>
              );
            }

            // NORMAL ROUTES
            return (
              <NavLink
                key={id}
                to={path}
                className={({ isActive }) =>
                  `hover:text-white transition ${
                    isActive ? 'text-white font-semibold' : ''
                  }`
                }
              >
                {label}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-neutral-300"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-4 text-neutral-300">
          {navItems.map(({ id, label, path }) => {
            // HASH LINKS (smooth scroll)
            if (path.startsWith('#')) {
              const id = path.replace('#', '');
              return (
                <button
                  key={id}
                  onClick={() => {
                    scrollToId(id);
                    setOpen(false);
                  }}
                  className="py-2 border-b border-neutral-800 hover:text-white"
                >
                  {label}
                </button>
              );
            }

            // NORMAL ROUTES
            return (
              <NavLink
                key={id}
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-2 border-b border-neutral-800 ${
                    isActive ? 'text-white font-semibold' : 'hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            );
          })}
        </nav>
      )}
    </header>
  );
}
