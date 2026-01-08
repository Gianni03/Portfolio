import PrimaryProjectSection from "./PrimaryProjectsSection";

export default function PrimaryProjects({ projects }) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="relative w-full">
      {projects.map((project, index) => (
        <PrimaryProjectSection
          key={project.id}
          project={project}
          index={index}
          total={projects.length}
        />
      ))}
    </div>
  );
}