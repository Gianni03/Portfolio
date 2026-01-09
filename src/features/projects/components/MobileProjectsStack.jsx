import { motion } from 'motion/react';
import MobileProjectCard from './MobileProjectCard';

export default function MobileProjectsStack({ projects }) {
  if (!projects?.length) return null;

  return (
    <section className="relative py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="relative">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="sticky top-24"
              style={{ zIndex: index + 1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                className="pb-6"
              >
                <MobileProjectCard
                  project={project}
                  index={index}
                  total={projects.length}
                />
              </motion.div>
            </div>
          ))}
        </div>

        <div className="h-[20vh]" />
      </div>
    </section>
  );
}
