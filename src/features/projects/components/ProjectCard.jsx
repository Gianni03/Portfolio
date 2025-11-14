import Card from "../../../ui/Card";

export default function ProjectCard({ project }) {
  return (
    <Card>
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-neutral-300 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map(tag => (
          <span key={tag} className="bg-neutral-800 px-3 py-1 text-sm rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <a
        href={project.link}
        target="_blank"
        className="text-blue-400 underline hover:text-blue-300"
      >
        Ver proyecto →
      </a>
    </Card>
  );
}
