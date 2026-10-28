export default function SkillCard({ name, logo, zoom = 1 }) {
  return (
    <div
      className="
        group relative
        flex flex-col items-center justify-center
        rounded-xl border border-white/10
        bg-neutral-900/60
        px-4 py-8
        transition-all duration-300
        hover:-translate-y-1
        hover:border-violet-500/40
        hover:shadow-[0_0_30px_-10px_rgba(122,67,193,0.6)]
      "
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-stone-200 ring-1 ring-black/5 mb-4">
        <img
          src={logo}
          alt=""
          style={zoom !== 1 ? { transform: `scale(${zoom})` } : undefined}
          className="h-10 w-10 object-contain"
        />
      </div>
      <span className="flex min-h-10 items-center justify-center text-center text-sm text-neutral-300 group-hover:text-white transition">
        {name}
      </span>
    </div>
  );
}
