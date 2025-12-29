export default function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-xl bg-[hsl(var(--surface))] p-6 border border-white/5 ${className}`}
    >
      {children}
    </div>
  );
}
