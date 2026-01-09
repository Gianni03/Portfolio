import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const location = useLocation();
  const isResume = location.pathname === '/resume';

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isResume) return;

    const sections = ['projects', 'skills', 'studies', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isResume]);

  const homeNavItems = [
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'studies', label: 'Studies' },
    { id: 'contact', label: 'Contact' },
    { id: 'resume', label: 'Resume Web', path: '/resume' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">

        {/* Logo */}
        <button
          onClick={() => {
            if (isResume) {
              window.location.href = '/';
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="text-xl font-bold tracking-tight hover:text-neutral-300 transition"
        >
          Gianni.dev
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-neutral-300">
          {!isResume ? (
            homeNavItems.map((item) => {
              if (item.path) {
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className="hover:text-white transition"
                  >
                    {item.label}
                  </NavLink>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToId(item.id)}
                  className={`hover:text-white transition ${
                    activeSection === item.id
                      ? 'text-white font-semibold'
                      : ''
                  }`}
                >
                  {item.label}
                </button>
              );
            })
          ) : (
            <NavLink to="/" className="hover:text-white transition">
              Portfolio
            </NavLink>
          )}
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
          {!isResume ? (
            homeNavItems.map((item) => {
              if (item.path) {
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="py-2 border-b border-neutral-800 hover:text-white"
                  >
                    {item.label}
                  </NavLink>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToId(item.id);
                    setOpen(false);
                  }}
                  className="py-2 border-b border-neutral-800 hover:text-white text-left"
                >
                  {item.label}
                </button>
              );
            })
          ) : (
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="py-2 border-b border-neutral-800 hover:text-white"
            >
              Portfolio
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
}
