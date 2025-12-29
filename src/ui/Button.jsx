export default function Button({ children, variant = 'primary', ...props }) {
  const base =
    'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition';

  const variants = {
    primary: 'bg-[hsl(var(--accent))] text-white hover:opacity-90',
    ghost: 'text-neutral-300 hover:text-white',
  };

  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}
