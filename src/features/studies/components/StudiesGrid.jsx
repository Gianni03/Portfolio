import StudiesCard from "./StudiesCard";

export default function StudiesGrid({ studies }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
    {studies.map(study => (
      <StudiesCard key={study.id} study={study} />
    ))}
  </div>
  );
}

