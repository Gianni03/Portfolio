# Portfolio Upgrade — Gianni Pasquinelli

**Tipo de iniciativa:** evolución del portfolio existente, no rebranding ni reconstrucción desde cero.  
**Objetivo:** mejorar el posicionamiento profesional, la presentación de proyectos, la conversión de visitantes en contactos y la calidad técnica del sitio.  
**Enfoque:** Product Engineering, UI Engineering, experiencias interactivas y desarrollo asistido por IA.  
**Criterio rector:** preservar la identidad visual y los componentes que funcionan; modificar únicamente aquello que aporte una mejora concreta.

---

## 1. Visión y objetivos

El portfolio debe funcionar como una herramienta profesional que permita a recruiters, hiring managers, clientes y colaboradores entender rápidamente:

- Quién soy y qué tipo de problemas puedo resolver.
- Qué productos y experiencias desarrollé.
- Cuál fue mi contribución en cada proyecto.
- Qué decisiones técnicas y de producto puedo justificar.
- Qué diferencia mi trabajo de una implementación frontend convencional.
- Cómo contactarme o consultar mi CV.

El sitio también debe demostrar calidad de implementación. No alcanza con describir conocimientos de frontend, animaciones, accesibilidad o performance: el propio portfolio debe ser evidencia de esas capacidades.

### Objetivos prioritarios

1. Actualizar el posicionamiento de Frontend/UI Engineer hacia Product Engineer, manteniendo visible la especialización frontend.
2. Mejorar la jerarquía y el contenido de los proyectos destacados y secundarios.
3. Preparar la estructura para incorporar proyectos freelance reales y nuevos productos propios.
4. Mantener la identidad visual, las animaciones del hero y las cards apilables de estudios.
5. Implementar una estrategia técnica de SEO y una estrategia de contenido orientada a GEO.
6. Auditar y mejorar la accesibilidad sin eliminar la propuesta visual.
7. Corregir inconsistencias de contenido, navegación, metadatos y documentación.
8. Establecer criterios verificables para evaluar los resultados del upgrade.

### Fuera de alcance

- Rediseñar completamente la identidad visual.
- Eliminar las animaciones del hero o sustituirlas por una presentación estática.
- Eliminar la sección de estudios o las cards apilables.
- Reconstruir la aplicación con otro framework.
- Reemplazar la base de datos o el sistema de gestión de contenido sin una necesidad comprobada.
- Agregar tecnologías, certificaciones, métricas o resultados que no pueda respaldar.
- Implementar tácticas de SEO/GEO sin una justificación técnica o de contenido.

---

## 2. Fase 0 — Auditoría inicial y línea de base

Antes de modificar código, inspeccionar el repositorio actual y documentar su estado.

### 2.1. Arquitectura y datos

Revisar:

- `src/app/home/Home.jsx`
- `src/app/hero/Hero.jsx`
- `src/app/about/AboutMe.jsx`
- `src/app/projects/PrimaryProjectsSection.jsx`
- `src/app/projects/SecondaryProjectsSection.jsx`
- `src/app/skills/Skills.jsx`
- `src/app/studies/Studies.jsx`
- `src/app/contact/Contact.jsx`
- `src/app/resume/Resume.jsx`
- `src/app/header/Header.jsx`
- `index.html`
- `package.json`
- Configuración de despliegue y archivos de rutas.
- Esquemas, consultas y políticas de acceso de Supabase.
- Registros actuales de perfil, proyectos, experiencia laboral y estudios.

Confirmar cómo se cargan los datos, cómo se determina el orden de los proyectos, qué campos son obligatorios y qué ocurre cuando una consulta falla o no devuelve información.

### 2.2. Línea de base técnica

Ejecutar y documentar:

- Build de producción.
- Linter y pruebas existentes.
- Lighthouse en escritorio y móvil.
- Inspección de metadatos y encabezados HTTP.
- Comprobación de rastreo e indexación.
- Auditoría inicial de accesibilidad.
- Pruebas de navegación, enlaces y rutas.
- Revisión de carga del video, efectos WebGL, imágenes y fuentes.

Guardar los resultados antes de modificar el sitio. Las mediciones posteriores deben utilizar condiciones comparables.

**Entregable:** `docs/portfolio-audit.md`, con hallazgos, severidad, evidencia y recomendaciones.

---

## 3. Fase 1 — Posicionamiento profesional y contenido

### 3.1. Título profesional

Usar **Product Engineer** como título principal.

Mantener Frontend/UI como especialidad visible en la presentación, la experiencia, las habilidades y los metadatos.

Posicionamiento propuesto:

> Product Engineer building digital products, thoughtful interfaces and interactive experiences.

El contenido debe comunicar tres dimensiones:

- **Product Engineering:** capacidad de participar en la definición, implementación y evolución de productos.
- **UI Engineering:** interfaces, React, TypeScript, CSS, accesibilidad, performance y animaciones.
- **AI-assisted Development:** uso de IA, agentes y flujos estructurados como herramientas de trabajo, sin presentar la IA como sustituto del criterio técnico.

No utilizar AI Engineer como título principal.

### 3.2. Perfil y descripción

Actualizar el registro del perfil en Supabase.

Corregir el error tipográfico de `Product Egineer - Frontend` y reemplazar la descripción actual de Frontend/UI Engineer por una presentación coherente con el nuevo posicionamiento.

Borrador inicial en inglés:

> I'm a Product Engineer focused on building digital products and thoughtful web experiences. My background in frontend engineering, UI quality and interaction design helps me turn ideas into polished, maintainable software.
>
> I combine product thinking, strong frontend fundamentals and AI-assisted development workflows to build useful products, refine user experiences and make deliberate engineering decisions.

Este texto es una base editorial. Ajustar su extensión y vocabulario después de definir el hero definitivo.

No afirmar experiencia de producto end-to-end en proyectos donde mi contribución haya sido limitada a una parte concreta.

### 3.3. Idioma

Mantener una experiencia coherente en inglés como idioma principal para oportunidades internacionales.

Revisar que los textos de navegación, proyectos, estudios, metadatos, botones y mensajes de error estén correctamente redactados.

No mezclar inglés y español dentro de una misma sección sin un motivo claro.

Si se incorpora una versión en español, debe tener una estrategia de URLs, metadatos y navegación consistente; no implementar una traducción parcial que duplique contenido sin control.

---

## 4. Fase 2 — Hero e identidad visual

### 4.1. Principio de diseño

Conservar el hero actual, incluyendo sus animaciones, efectos visuales, video, tarjeta y composición.

Las animaciones son parte de la propuesta de valor: demuestran capacidad para crear experiencias interactivas y no deben eliminarse por una preferencia genérica por diseños minimalistas.

El objetivo es mejorar la jerarquía del contenido y la utilidad del hero sin perder personalidad visual.

### 4.2. Contenido

Incorporar:

- Nombre profesional.
- Título principal: Product Engineer.
- Una descripción breve de la propuesta de valor.
- CTA principal hacia los proyectos.
- CTA secundario para consultar el CV online o descargar el PDF.
- Enlaces de contacto cuando encajen con la composición actual.

Borrador de titular:

> I build thoughtful interfaces and useful digital products.

Borrador de subtítulo:

> Product Engineer focused on frontend quality, interactive experiences and AI-assisted development.

Revisar la redacción final para evitar redundancias entre titular, subtítulo y badges.

### 4.3. Animaciones y rendimiento

Mantener el sistema de animaciones existente y verificar:

- Que el texto principal siga siendo legible durante todas las fases de la animación.
- Que el movimiento no impida acceder al contenido.
- Que el video no bloquee la carga inicial.
- Que los efectos WebGL tengan una alternativa razonable cuando no estén disponibles.
- Que las animaciones no generen problemas de desplazamiento o cambios de layout.
- Que se respete `prefers-reduced-motion`.
- Que la experiencia siga siendo funcional con teclado y lectores de pantalla.
- Que el hero funcione correctamente en móviles y dispositivos de rendimiento limitado.

No reducir ni eliminar efectos únicamente para mejorar una puntuación sintética. Primero medir el impacto real e identificar optimizaciones específicas.

### 4.4. Criterio de aceptación

El hero debe conservar su identidad, comunicar el nuevo posicionamiento y permitir acceder a proyectos y CV sin ambigüedad.

---

## 5. Fase 3 — Arquitectura y presentación de proyectos

### 5.1. Modelo de contenido

Mantener Supabase como fuente de datos, salvo que la auditoría revele una limitación real.

Revisar los campos actuales de proyectos y determinar si alcanzan para representar el nuevo portfolio.

Propuesta de campos adicionales, si son necesarios:

- `category`: client-work, product o experiment.
- `featured`: determina si el proyecto forma parte de los destacados.
- `slug`: identificador estable para una página de detalle.
- `role`: responsabilidad real en el proyecto.
- `project_type`: freelance, professional, personal-product o study.
- `status`: live, in-progress, archived o concept.
- `period`: período de trabajo cuando resulte útil.
- `highlights`: contribuciones o resultados verificables.
- `case_study`: contenido de detalle, si no se administra en una entidad separada.
- `accessibility_notes`: opcional, si aporta información sobre decisiones específicas.

No agregar todos estos campos automáticamente. Comparar primero con el esquema actual y reutilizar campos existentes cuando tengan el mismo significado.

Si se agregan campos a Supabase, definir sus tipos, valores permitidos, migraciones y comportamiento cuando sean nulos.

### 5.2. Proyectos destacados

Mantener el tratamiento visual especial de los tres proyectos principales y la sección de proyectos secundarios.

No reemplazar el diseño actual por una grilla genérica.

Revisar la selección según las capacidades que cada proyecto demuestra.

Selección inicial para evaluar:

- **Plataforma1810:** producto propio, decisiones de producto, arquitectura y funcionalidades.
- **JobTracker:** resolución de un problema real, gestión de información y flujos de usuario.
- **Haunted House 3D:** experiencia visual, 3D e interacción.

Esta selección no es definitiva. Evaluar Kli y los próximos proyectos freelance para determinar si representan mejor el nivel actual de trabajo.

No forzar que los tres proyectos destacados sean todos productos propios ni que todos tengan el mismo tipo de valor profesional.

### 5.3. Criterios para seleccionar proyectos

Cada proyecto destacado debe cumplir al menos uno de estos objetivos:

- Demostrar experiencia profesional relevante.
- Mostrar capacidad de desarrollar un producto.
- Resolver un problema concreto.
- Demostrar especialización en UI, animaciones o experiencias interactivas.
- Presentar decisiones técnicas que puedan explicarse con profundidad.

Evaluar también la calidad de la demo, el estado real, las capturas, la claridad de la contribución y la posibilidad de mostrar el trabajo públicamente.

### 5.4. Proyectos secundarios

Mantener los proyectos de estudio, experimentos y trabajos anteriores.

Agruparlos conceptualmente en:

- Client Work.
- Products.
- Experiments & Studies.

La clasificación debe reflejar el propósito y el estado real del proyecto, no inflar su relevancia.

No es obligatorio implementar filtros inmediatamente. Si las secciones existentes permiten navegar bien por el contenido, mantenerlas hasta que el volumen de proyectos justifique otra solución.

Los proyectos de estudio deben seguir siendo visibles como evidencia de aprendizaje y experimentación, pero no deben confundirse con trabajos de clientes.

### 5.5. Tarjetas y presentación

Mantener el diseño distintivo de los proyectos destacados.

Revisar:

- Título.
- Descripción.
- Stack relevante.
- Imagen o video.
- Enlace a demo.
- Enlace a código, cuando sea público.
- Indicador de tipo o estado, cuando ayude a interpretar el proyecto.

Evitar que las tarjetas se conviertan en listas extensas de tecnologías.

Cada descripción debe explicar qué hace el proyecto y qué valor aporta, no limitarse a enumerar su implementación.

### 5.6. Casos de estudio

Evaluar la incorporación de páginas de detalle para los proyectos que lo merezcan.

Estructura propuesta:

1. Resumen y contexto.
2. Problema o necesidad.
3. Rol y contribución.
4. Decisiones de producto y diseño.
5. Arquitectura e implementación.
6. Problemas encontrados y soluciones.
7. Resultado y evidencia.
8. Estado actual y próximos pasos.
9. Enlaces relevantes.

No inventar métricas de usuarios, ingresos, rendimiento o adopción.

Distinguir los resultados medidos de las estimaciones y de los objetivos todavía no validados.

Los casos de estudio deben ser breves y escaneables, con capturas reales y decisiones técnicas concretas.

### 5.7. Preparación para crecer

La estructura debe admitir al menos dos proyectos freelance y entre tres y cuatro productos propios adicionales sin necesidad de rediseñar toda la página.

No asumir que todos deben entrar en la sección destacada. Mantener una jerarquía editorial clara y actualizarla a medida que se incorporen proyectos de mayor relevancia.

---

## 6. Fase 4 — Experiencia profesional

Mantener la sección de experiencia y mejorar la consistencia de sus registros.

Revisar:

- Nombre oficial de cada empresa.
- Puesto.
- Fechas.
- Estado actual.
- Descripción.
- Métricas.
- Coherencia con CV y LinkedIn.

Corregir posibles inconsistencias entre Holocruxe y Holoruxe, verificando las denominaciones correctas antes de modificar datos.

Revisar la fecha de finalización de Avature para que coincida con el CV y LinkedIn.

### Contenido

Dar prioridad a:

- Responsabilidad y alcance.
- Tipo de producto o entorno.
- Decisiones o contribuciones personales.
- Resultados verificables.
- Tecnologías relevantes para el posicionamiento actual.

Conservar las métricas únicamente cuando se pueda explicar su origen y alcance.

No atribuirse resultados colectivos como si fueran individuales.

---

## 7. Fase 5 — Estudios y formación

Mantener la sección Studies y las cards apilables actuales.

La presentación visual de esta sección forma parte de la identidad del portfolio y no se eliminará como parte del upgrade.

Revisar el contenido de cada registro:

- Nombre del curso o programa.
- Institución o plataforma.
- Año.
- Estado: completed o in progress, cuando corresponda.
- Descripción.
- Imagen o identidad visual.

Distinguir entre cursos completados y cursos actualmente en curso.

Verificar especialmente Full Stack Open, FreeCodeCamp, los cursos de Josh Comeau y Three.js Journey.

No presentar una formación como una certificación completada si únicamente se cursó una parte del programa.

Mantener las descripciones concisas y evitar que cada tarjeta se convierta en un temario completo.

---

## 8. Fase 6 — Skills y herramientas

Mantener la sección, revisando su selección y jerarquía.

Organizar las competencias por categorías:

- Frontend & UI.
- UI Quality & Interaction.
- Product Development.
- Tools & AI-assisted Workflows.

Priorizar las competencias que respaldan el posicionamiento profesional.

No eliminar tecnologías solo porque no sean centrales, pero evitar presentar todo el stack con idéntico peso.

Verificar que cada tecnología o competencia mencionada pueda respaldarse con experiencia o proyectos.

No utilizar barras de porcentaje o niveles de dominio subjetivos si no aportan información verificable.

---

## 9. Fase 7 — CV online y descarga

**Resume Web no es un botón de descarga:** lleva a una versión web del CV y debe conservar esa función.

Mantener la página `/resume` y su propósito actual.

Evaluar por separado la incorporación de un enlace para descargar el CV en PDF.

### Cambios

- Conservar el acceso al CV online.
- Añadir un CTA diferenciado para descargar el PDF.
- Revisar que el CV online y el PDF contengan información consistente.
- Verificar que las fechas, roles y descripciones coincidan con el portfolio.
- Comprobar que la página del CV tenga título, descripción y estructura semántica adecuados.
- Confirmar que el PDF esté disponible, actualizado y sea legible.

No sustituir el CV online por un archivo PDF ni cambiar el comportamiento del enlace existente sin una razón concreta.

---

## 10. Fase 8 — Navegación y contacto

Mantener una navegación sencilla y consistente con el diseño actual.

Revisar los enlaces principales:

- Projects.
- Skills.
- Studies.
- Contact.
- Resume Web.
- Descarga del CV, cuando se incorpore.

Evaluar la inclusión de Experience o About en la navegación según el espacio disponible.

No es obligatorio agregar más elementos al menú si la estructura actual permite encontrar el contenido con facilidad.

### Correcciones técnicas

- Corregir IDs duplicados, incluido el identificador `projects` si se confirma en el código actual.
- Comprobar el destino de todos los enlaces.
- Verificar que los enlaces externos que abren otra pestaña utilicen atributos de seguridad apropiados.
- Asegurar que las anclas funcionen con el scroll y las animaciones existentes.
- Revisar los estados hover, focus, active y disabled.
- Mantener los enlaces de email, LinkedIn y GitHub actualizados.

No implementar un formulario de contacto si los enlaces existentes ya resuelven la necesidad. Si se decide incorporar uno, debe tener validación accesible, estados de envío y error, protección contra abuso y una integración funcional.

---

## 11. Fase 9 — SEO técnico

### 11.1. Metadatos

Revisar `index.html` y la configuración de metadatos.

Definir:

- Título específico.
- Meta description.
- Canonical.
- Open Graph.
- Twitter Cards, si corresponde.
- Favicon.
- Idioma del documento.
- Theme color.

Propuesta inicial de título:

`Gianni Pasquinelli | Product Engineer & Frontend`

Propuesta de descripción:

`Product Engineer focused on frontend engineering, UI quality, interactive experiences and building digital products.`

Ajustar la descripción según la propuesta de valor definitiva y la longitud recomendada por los buscadores.

### 11.2. Rastreo e indexación

Verificar:

- `robots.txt`.
- Sitemap XML.
- Estado HTTP de la página principal.
- URLs canónicas.
- Redirecciones.
- Páginas de error.
- Enlaces internos.
- Recursos necesarios para renderizar el contenido.

Confirmar que los proyectos importantes puedan ser descubiertos por los buscadores.

Si se crean páginas individuales de proyectos, definir URLs estables y metadatos específicos para cada una.

### 11.3. Renderizado

Determinar cómo recibe Google el contenido de React y cómo lo procesan los principales crawlers.

No asumir que todo el contenido de Supabase es indexable solo porque se muestra correctamente en el navegador.

Si el contenido principal depende de JavaScript y las pruebas muestran problemas de descubrimiento o indexación, evaluar prerenderizado o generación estática para las páginas que lo necesiten.

No migrar de framework automáticamente.

### 11.4. Datos estructurados

Evaluar JSON-LD con los tipos apropiados:

- `Person` para la identidad profesional.
- `WebSite` para el sitio.
- `CreativeWork` o un tipo más específico para proyectos individuales cuando corresponda.

Utilizar únicamente datos visibles y verificables.

Validar los datos estructurados y evitar propiedades inventadas, ratings ficticios o información duplicada e inconsistente.

### 11.5. Imágenes y enlaces

- Usar nombres de archivo descriptivos cuando sea posible.
- Definir textos alternativos útiles.
- Optimizar formatos y dimensiones.
- Verificar imágenes rotas.
- Revisar enlaces a demos y repositorios.
- Definir Open Graph con una imagen representativa del portfolio.

---

## 12. Fase 10 — GEO y descubribilidad en sistemas de IA

GEO debe entenderse como una estrategia complementaria de claridad semántica, contenido verificable y presencia externa.

No hay garantías de aparecer en respuestas generadas por IA.

### Implementación

1. Definir una presentación profesional clara y consistente.
2. Utilizar encabezados semánticos y descripciones específicas.
3. Explicar el propósito, la contribución y el estado de cada proyecto.
4. Mantener consistentes nombre, especialidad, perfiles y enlaces.
5. Asegurar que las páginas públicas sean accesibles para los crawlers que se decida permitir.
6. Verificar que las políticas de rastreo no bloqueen accidentalmente recursos o contenido necesario.
7. Obtener referencias externas legítimas cuando existan: proyectos publicados, colaboraciones, menciones profesionales y perfiles verificables.
8. Revisar la consistencia entre portfolio, CV, GitHub y LinkedIn.

No crear contenido artificial para repetir palabras clave.

No implementar `llms.txt` como prioridad sin una necesidad demostrada. Puede evaluarse posteriormente, pero no reemplaza la calidad del contenido, la accesibilidad ni la indexabilidad.

No bloquear crawlers de IA de manera indiscriminada: definir la política según los objetivos de visibilidad y las necesidades de privacidad.

---

## 13. Fase 11 — Accesibilidad

Objetivo: utilizar WCAG 2.2 nivel AA como referencia para la auditoría y las correcciones.

### 13.1. Semántica

- Verificar la jerarquía de encabezados.
- Usar landmarks semánticos.
- Asegurar que los botones sean botones y los enlaces sean enlaces.
- Proporcionar etiquetas accesibles a los controles.
- Evitar elementos interactivos sin nombre accesible.

### 13.2. Teclado y foco

- Comprobar navegación completa con Tab y Shift+Tab.
- Confirmar que los elementos interactivos reciban foco visible.
- Evitar trampas de teclado.
- Asegurar que las animaciones y tarjetas no impidan llegar a los enlaces.
- Revisar orden del foco y comportamiento de scroll.

### 13.3. Contraste y lectura

- Comprobar contraste de texto, controles y estados interactivos.
- Revisar texto sobre video, imágenes y fondos animados.
- No depender exclusivamente del color para transmitir información.
- Verificar ampliación de texto y reflow en pantallas pequeñas.

### 13.4. Movimiento y animaciones

- Respetar `prefers-reduced-motion`.
- Reducir o desactivar movimiento no esencial cuando corresponda.
- Mantener la información disponible aunque no se reproduzcan animaciones.
- Evitar flashes que puedan generar riesgos.
- Comprobar que los elementos animados no interfieran con la lectura ni con el control de la interfaz.

No eliminar el sistema visual de animaciones. Adaptar su comportamiento y ofrecer alternativas accesibles.

### 13.5. Video y WebGL

- Definir comportamiento de reproducción y controles cuando sean necesarios.
- Evitar que el contenido esencial exista únicamente dentro de un canvas.
- Proporcionar alternativas textuales cuando el efecto visual comunique información relevante.
- Verificar rendimiento, foco y funcionamiento en dispositivos sin soporte adecuado.

### 13.6. Pruebas

Combinar herramientas automatizadas con revisión manual.

Utilizar axe o herramientas equivalentes, Lighthouse y pruebas con teclado.

Las puntuaciones automatizadas no sustituyen una auditoría real.

---

## 14. Fase 12 — Performance y estabilidad

Optimizar el sitio sin sacrificar sus recursos visuales distintivos.

### Revisiones

- Carga del video del hero.
- Inicialización de WebGL.
- Animaciones y listeners.
- Tamaño del JavaScript.
- Lazy loading de recursos no críticos.
- Imágenes y fuentes.
- Layout shifts.
- Carga de datos desde Supabase.
- Errores de consola.
- Estados vacíos y errores de red.

### Core Web Vitals

Medir:

- LCP.
- INP.
- CLS.

Usar datos de laboratorio para diagnosticar y datos de campo cuando estén disponibles.

No presentar resultados de Lighthouse como si fueran mediciones reales de todos los usuarios.

Establecer objetivos razonables después de obtener la línea de base.

---

## 15. Fase 13 — Analítica y evaluación

Revisar Google Analytics y las herramientas de medición existentes.

Confirmar que la configuración sea consistente y que no existan eventos duplicados.

Evaluar eventos para:

- Clic en proyectos destacados.
- Apertura de casos de estudio.
- Clic en demo.
- Clic en repositorio.
- Visita a Resume Web.
- Descarga del PDF.
- Clic en email.
- Clic en LinkedIn.

Definir convenciones de nombres y documentar los eventos.

No medir interacciones irrelevantes únicamente para aumentar el volumen de datos.

Si se utilizan herramientas que establecen cookies o recogen datos personales, revisar las obligaciones de privacidad y los mecanismos de consentimiento aplicables.

---

## 16. Fase 14 — Calidad del código y mantenimiento

El upgrade debe mejorar el producto sin generar complejidad innecesaria.

Revisar:

- Componentes duplicados.
- Lógica de presentación mezclada con consultas.
- Tipos y validación de datos.
- Manejo de errores.
- Estados de carga.
- Reutilización de componentes.
- Accesibilidad de componentes compartidos.
- Configuración de build y lint.
- Variables de entorno.
- Dependencias sin uso.

No refactorizar archivos completos si el cambio requerido es pequeño.

No agregar dependencias para resolver problemas que pueden solucionarse de forma sencilla con las herramientas existentes.

Actualizar la documentación cuando cambien el contenido, la arquitectura o los procedimientos de despliegue.

Mantener credenciales y secretos fuera del repositorio y de los bundles públicos.

---

## 17. Fase 15 — Validación y despliegue

Antes de publicar cada grupo de cambios:

1. Ejecutar lint y build.
2. Ejecutar las pruebas existentes.
3. Revisar rutas y enlaces.
4. Probar escritorio y móvil.
5. Verificar el contenido cargado desde Supabase.
6. Comprobar que las animaciones sigan funcionando.
7. Probar navegación por teclado.
8. Revisar consola y solicitudes de red.
9. Validar metadatos y rutas de indexación.
10. Comparar performance con la línea de base.

Publicar primero en un entorno de staging.

No cambiar la configuración de producción, los datos de Supabase ni las políticas de acceso sin revisar las consecuencias.

Después del despliegue, comprobar la versión publicada y verificar que no haya errores de carga, enlaces rotos o contenido desactualizado.

---

## 18. Orden de ejecución

### Etapa A — Definición y contenido

- Confirmar posicionamiento.
- Corregir el perfil en Supabase.
- Definir el contenido del hero.
- Revisar experiencia laboral y estudios.
- Clasificar los proyectos.
- Identificar contenido faltante.

### Etapa B — Presentación

- Actualizar el hero conservando las animaciones.
- Revisar la jerarquía de la página.
- Mejorar proyectos destacados y secundarios.
- Preparar la futura incorporación de trabajos freelance.
- Mantener estudios y cards apilables.
- Incorporar el acceso al PDF sin modificar Resume Web.

### Etapa C — SEO y GEO

- Metadatos.
- Rastreo e indexación.
- Sitemap y canonical.
- Datos estructurados.
- Calidad semántica.
- Descripciones de proyectos.
- Consistencia de identidad externa.

### Etapa D — Accesibilidad y performance

- Auditoría WCAG.
- Teclado y foco.
- Contraste.
- Movimiento reducido.
- Video y WebGL.
- Core Web Vitals.
- Optimización de recursos.

### Etapa E — Validación

- Pruebas.
- Revisión visual.
- Staging.
- Despliegue.
- Medición posterior.

---

## 19. Criterios de finalización

El upgrade se considera completado cuando:

- El posicionamiento de Product Engineer está actualizado y es consistente.
- Frontend/UI continúa siendo una especialidad claramente visible.
- El hero conserva su identidad visual y dispone de CTAs claros.
- Resume Web continúa llevando al CV online.
- El PDF puede descargarse desde un enlace independiente.
- Los proyectos destacados y secundarios están correctamente clasificados.
- Los nuevos proyectos pueden incorporarse sin rediseñar toda la estructura.
- Los datos de experiencia y estudios son consistentes y verificables.
- SEO técnico y metadatos están validados.
- El contenido es comprensible y rastreable.
- Se han implementado las mejoras GEO que aportan valor real.
- Las animaciones y componentes se han auditado con criterios de accesibilidad.
- Se han medido los principales indicadores de rendimiento.
- La navegación y los enlaces funcionan.
- El build y las pruebas pasan.
- Existe una verificación posterior al despliegue.

## 20. Forma de trabajo recomendada

Implementar el upgrade por etapas pequeñas y revisables.

Antes de cada cambio:

1. Inspeccionar el código y los datos afectados.
2. Explicar el problema que se quiere resolver.
3. Proponer la solución mínima adecuada.
4. Identificar los riesgos y los criterios de aceptación.
5. Implementar.
6. Validar.
7. Documentar los cambios.

No realizar un refactor global ni modificar varias áreas no relacionadas en una misma iteración.

La prioridad es conseguir mejoras reales, mantener la identidad visual y dejar una base preparada para incorporar nuevos proyectos.

**Resultado esperado:** un portfolio que no solo muestre que puedo desarrollar interfaces atractivas, sino que también pueda definir, construir y evolucionar productos digitales con criterio técnico, atención al detalle y una metodología de trabajo sólida.