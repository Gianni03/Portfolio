// features/projects/components/ProjectsGrid.jsx
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProjectsGrid({ projects }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="relative z-20 py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase">
              Other Works
            </h3>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <SecondaryProjectCard key={project.id || index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SecondaryProjectCard({ project }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-[#0c0c0c] border border-white/5 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-500"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        
        <div className="absolute top-4 right-4 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {project.repo_url && (
            <a href={project.repo_url} target="_blank" className="p-2 bg-black/60 backdrop-blur-md text-white rounded-full hover:bg-purple-600 transition-colors">
              <Github size={18} />
            </a>
          )}
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" className="p-2 bg-black/60 backdrop-blur-md text-white rounded-full hover:bg-purple-600 transition-colors">
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
            {project.title}
          </h4>
        </div>
        
        <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-2">
          {project.stack?.map(tech => (
            <span key={tech} className="text-[10px] font-mono px-2 py-0.5 bg-white/5 text-neutral-500 rounded border border-white/5 uppercase">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/50 transition-all duration-700" />
    </motion.div>
  );
}