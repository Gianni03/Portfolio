export default function SkillCard({ name, logo }) {
  return (
    <div
      className="
        group relative
        flex flex-col items-center justify-center
        rounded-xl border border-white/10
        bg-neutral-900/60
        px-6 py-8
        transition-all duration-300
        hover:-translate-y-1
        hover:border-violet-500/40
        hover:shadow-[0_0_30px_-10px_rgba(122,67,193,0.6)]
      "
    >
      <img
        src={logo}
        alt={name}
        className="h-10 w-10 mb-4 opacity-80 group-hover:opacity-100 transition"
      />
      <span className="text-sm text-neutral-300 group-hover:text-white transition">
        {name}
      </span>
    </div>
  );
}
