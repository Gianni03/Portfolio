import Card from '../../../ui/Card';

export default function ProjectCard({ project }) {
  return (
    <Card>
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      {project.image && <img src={project.image} alt={project.title} />}
      <p className="text-neutral-300 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {(project.stack || []).map((stack) => (
          <span
            key={stack}
            className="bg-neutral-800 px-3 py-1 text-sm rounded-full"
          >
            {stack}
          </span>
        ))}
      </div>

      {project.demo_url && (
        <a
          href={project.demo_url}
          target="_blank"
          className="text-blue-400 underline hover:text-blue-300"
        >
          Demo →
        </a>
      )}
      {project.repo_url && (
        <a
          href={project.repo_url}
          target="_blank"
          className="text-blue-400 underline hover:text-blue-300"
        >
          Repo →
        </a>
      )}
    </Card>
  );
}
