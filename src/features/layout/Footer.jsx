export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 py-10 border-t border-neutral-800 bg-neutral-950 text-neutral-400">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2">© {year} Gianni Pasquinelli</p>

        <p className="text-sm">
          Desarrollado con React + Vite · Diseñado por mí
        </p>
      </div>
    </footer>
  );
}
