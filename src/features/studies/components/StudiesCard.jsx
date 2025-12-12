import Card from "../../../ui/Card";

export default function StudiesCard({ study }) {
  return (
    <Card>
      <div className="grid gap-6 md:grid-cols-2">
        <div key={study.id} className="p-4 bg-neutral-800 rounded-xl">
          <img src={study.image} className="h-12 mb-3" />
          <h3 className="text-xl font-bold">{study.title}</h3>
          <p className="opacity-70">{study.institution}</p>
          <span className="text-sm opacity-50">{study.year}</span>
        </div>
      
    </div>
    </Card>
  );
}
