import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function PrimaryProjectSection({ project, index }) {
  const containerRef = useRef(null);
  

  // Medimos el scroll dentro de esta sección específica que mide 200vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Animaciones basadas en el progreso del scroll de esta sección
  // El texto y la imagen aparecen rápido (0 a 0.2) y se quedan fijos hasta el final (0.8 a 1)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.7, 0.9],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 1.1]
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [50, 0, 0, -50]
  );

  return (
    <div ref={containerRef} className="relative h-[180vh] w-full">
      {/* El contenido real se queda pegado (sticky) mientras el usuario scrollea los 200vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="relative w-full h-full flex items-center justify-center p-6 md:p-12"
        >
          {/* Fondo de imagen Full Width real */}
          <div className="absolute inset-0 z-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-30 blur-[2px]"
            />
            <div className="absolute inset-0 bg-linear-to-b from-[#001514] via-transparent to-[#001514]" />
          </div>

          {/* Contenedor de Contenido: Ahora mucho más ancho */}
          <div className="relative z-10 w-full max-w-[90%] xl:max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto con margen y retardo visual */}
            <motion.div style={{ y: textY }} className="space-y-8">
              <h2 className="mt-14 text-7xl md:text-7xl font-black text-white leading-[0.8] tracking-tighter uppercase">
                {project.title}
              </h2>

              <p className="text-xl md:text-xl text-neutral-300 max-w-xl leading-relaxed font-light">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {project.stack?.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-1 border border-white/20 rounded-full text-sm uppercase tracking-widest text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-8 pt-4">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    className="text-white text-lg font-bold border-b-2 border-purple-600 pb-1 hover:text-purple-400 transition-colors"
                  >
                    LIVE DEMO
                  </a>
                )}
                {project.repo_url && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    className="text-neutral-400 text-lg font-bold border-b-2 border-neutral-800 pb-1 hover:text-white transition-colors"
                  >
                    VIEW CODE
                  </a>
                )}
              </div>
            </motion.div>

            {/* Imagen principal: Más grande y con presencia */}
            <div className="hidden lg:block relative group">
              <motion.div className="relative rounded-lg overflow-hidden border border-white/10 aspect-video shadow-2xl shadow-purple-500/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
