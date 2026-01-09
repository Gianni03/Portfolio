import { Mail, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        {/* Left */}
        <div className="text-sm text-white/70 text-center md:text-left">
          <p className="font-medium text-white">Gianni — Frontend Developer</p>
          <p className="text-xs mt-1">© {new Date().getFullYear()}</p>
        </div>

        {/* Right */}
        <div className="flex items-center justify-center gap-5">
          <a
            href="mailto:giannipasquinelli@gmail.com"
            className="text-white/60 hover:text-white transition"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>

          <a
            href="https://github.com/gianni03"
            target="_blank"
            rel="noreferrer"
            className="text-white/60 hover:text-white transition"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>

          <a
            href="https://linkedin.com/in/gianni-pasquinelli"
            target="_blank"
            rel="noreferrer"
            className="text-white/60 hover:text-white transition"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>

      </div>
    </footer>
  );
}
