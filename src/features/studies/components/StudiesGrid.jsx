// features/studies/components/StudiesGrid.jsx
import { motion } from 'motion/react';
import StudiesCard from './StudiesCard';

export default function StudiesGrid({ studies }) {
  if (!studies || studies.length === 0) return null;

  return (
    <section className="relative py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Stack Container */}
        <div className="relative">
          {studies.map((study, index) => (
            <div
              key={study.id}
              className="sticky top-28"
              style={{
                // La última card tiene mayor zIndex (pasa por adelante)
                zIndex: index + 1,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                className="pb-6"
              >
                <StudiesCard
                  study={study}
                  index={index}
                  total={studies.length}
                />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Spacer para scroll adicional */}
        <div className="h-[20vh]" />
      </div>
    </section>
  );
}
