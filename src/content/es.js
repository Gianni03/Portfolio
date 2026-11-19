/**
 * Spanish (es-AR) copy.
 *
 * Primary locale, written for comercios, negocios y PyMEs that need a site
 * built. Short lines: the visitor is deciding, not reading.
 */
export const es = {
  locale: 'es-AR',

  meta: {
    title: 'Gianni Pasquinelli | Desarrollo web a medida en Rosario',
    description:
      'Sitios web, landing pages y sistemas a medida para negocios. Diseño y desarrollo propios, desde los wireframes hasta la publicación. Rosario, Argentina.',
  },

  nav: {
    home: 'Inicio',
    services: 'Servicios',
    cases: 'Casos',
    process: 'Proceso',
    faq: 'Preguntas',
    about: 'Sobre mí',
    projects: 'Proyectos',
    studies: 'Formación',
    skills: 'Herramientas',
    contact: 'Contacto',
    resume: 'CV',
    portfolio: 'Portfolio',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },

  hero: {
    title: 'Desarrollo web a medida',
    line1: 'Sitios y landing pages',
    line2: 'sistemas y paneles a medida',
    intro:
      'Actualizás precios y textos sin llamar a nadie. Diseño y construyo cada proyecto de principio a fin.',
    primaryCta: 'Ver casos',
    secondaryCta: 'Hablemos',
  },

  services: {
    title: 'Servicios',
    intro: 'Elegí una tarjeta para ver qué incluye.',
    cta: 'Hablemos de tu proyecto',
    cardHint: 'Ver qué incluye',
    resultLabel: 'Resultado',
    items: [
      {
        key: 'websites',
        title: 'Sitios web a medida',
        tag: 'Servicio principal',
        summary:
          'Para negocios y profesionales que necesitan presencia digital.',
        lead: 'Diseño y desarrollo para negocios, profesionales y empresas.',
        points: [
          'Diseño personalizado desde cero',
          'Wireframes y estructura de contenidos',
          'Adaptado a celulares y computadoras',
          'SEO técnico y optimización de velocidad',
          'Formularios y canales de contacto',
          'Dominio y hosting configurados',
        ],
        result:
          'Un sitio profesional, pensado para tu negocio y preparado para crecer.',
      },
      {
        key: 'landing',
        title: 'Landing pages',
        tag: 'Servicio principal',
        summary: 'Para presentar un producto, servicio, campaña o lanzamiento.',
        lead: 'Páginas enfocadas en presentar una propuesta y generar consultas.',
        points: [
          'Diseño orientado a un objetivo concreto',
          'Estructura y contenido estratégico',
          'Interfaz visual personalizada',
          'Formularios o contacto por WhatsApp',
          'Adaptación a todos los dispositivos',
          'Medición de visitas y conversiones',
        ],
        result:
          'Una página enfocada en transformar visitas en consultas y oportunidades.',
      },
      {
        key: 'systems',
        title: 'Sistemas y paneles web',
        tag: 'Desarrollo complementario',
        summary:
          'Para negocios que necesitan administrar información y resolver procesos.',
        lead: 'Herramientas personalizadas para administrar información y resolver procesos.',
        points: [
          'Diseño de interfaces y flujos de trabajo',
          'Paneles de administración',
          'Gestión de contenido y datos',
          'Bases de datos propias',
          'Funcionalidades según cada necesidad',
          'Acceso desde computadora y celular',
        ],
        result:
          'Una herramienta web adaptada a la forma en que funciona tu negocio.',
      },
    ],
    extra: {
      title: 'Servicios adicionales',
      name: 'Mantenimiento y evolución',
      description:
        'Una vez publicado el proyecto, podés contratar mantenimiento y mejoras para mantenerlo actualizado, corregir problemas o incorporar nuevas funcionalidades.',
    },
  },

  cases: {
    title: 'Casos',
    intro: 'Trabajo real, online ahora mismo.',
    gotoCases: 'Ir al caso',
    previous: 'Caso anterior',
    next: 'Caso siguiente',
    caseLabel: 'Ver caso',
    liveLabel: 'Ver sitio',
    viewAll: 'Ver todos los proyectos',
    labels: {
      problem: 'El problema',
      built: 'Qué hice',
      result: 'Resultado',
    },
    items: [
      {
        slug: 'el-rey-del-chaja',
        rubro: 'Pastelería · Rosario',
        title: 'El Rey del Chajá',
        problem:
          'Sitio de plantilla, sin SEO, y cada cambio de precio dependía del desarrollador.',
        built:
          'Sitio nuevo, panel para editar precios y las 3 pantallas del local, todo desde el mismo panel.',
        result: 'Actualizan precios y pantallas solos.',
        link: 'https://www.elreydelchaja.com/',
      },
      {
        slug: 'plataforma-1810',
        rubro: 'Producto propio · SaaS',
        title: 'Plataforma 1810',
        problem:
          'Un candidato necesitaba su sitio de campaña sin depender de un equipo técnico.',
        built:
          'Producto completo: alta en 5 pasos, panel, temas, planes y acceso premium.',
        result: 'Online y en producción.',
        link: 'https://www.plataforma1810.com.ar/',
      },
      {
        slug: 'kli',
        rubro: 'Producto propio · Plataforma',
        title: 'Kli',
        problem:
          'Las comunidades viven dispersas entre chats, archivos y links de pago.',
        built:
          'Contenido, encuentros, memoria y membresías con cobro integrado en un solo lugar.',
        result: 'Online y en producción.',
        link: 'https://kli.com.ar/',
      },
    ],
  },

  process: {
    title: 'Cómo trabajo',
    intro: 'Cuatro pasos. Sin sorpresas.',
    steps: [
      {
        title: 'Charla',
        description: 'Me contás qué necesitás. Veinte minutos, sin compromiso.',
        points: [
          'Qué hacés y qué querés lograr',
          'Qué tenés hoy: web, redes o nada',
          'Sin costo y sin compromiso',
        ],
      },
      {
        title: 'Propuesta',
        description: 'Alcance, precio y fecha, por escrito.',
        points: [
          'Qué incluye y qué no',
          'Precio cerrado y forma de pago',
          'Fecha de entrega estimada',
        ],
      },
      {
        title: 'Desarrollo',
        description: 'Avances cada semana. Ves el progreso en vivo.',
        points: [
          'Acceso a un entorno de prueba',
          'Ajustes sobre la marcha',
          'Sin sorpresas al final',
        ],
      },
      {
        title: 'Entrega',
        description: 'Online y funcionando. Te enseño a manejarlo.',
        points: [
          'Publicado en tu dominio',
          'Te muestro cómo actualizarlo',
          'Soporte después de la entrega',
        ],
      },
    ],
  },

  faq: {
    title: 'Preguntas',
    items: [
      {
        question: '¿Cuánto cuesta desarrollar un sitio web?',
        answer:
          'Cada proyecto tiene un presupuesto según su alcance, diseño y funcionalidades. Después de conocer qué necesitás, preparo una propuesta con precio y plazos definidos.',
      },
      {
        question: '¿Tengo que tener el diseño preparado?',
        answer:
          'No. Puedo encargarme de todo el proceso, desde organizar la estructura y los contenidos hasta diseñar la interfaz y desarrollar el sitio.',
      },
      {
        question: '¿Cuánto tarda un proyecto?',
        answer:
          'Depende de su complejidad y del alcance acordado. Los plazos quedan establecidos en la propuesta antes de comenzar.',
      },
      {
        question: '¿Quién se encarga del dominio y el hosting?',
        answer:
          'Te ayudo a configurar y publicar el proyecto. Las cuentas y servicios quedan a tu nombre para que tengas el control.',
      },
      {
        question: '¿Puedo modificar el contenido después?',
        answer:
          'Depende del proyecto. Podemos incorporar un panel de administración para que puedas actualizar textos, imágenes, precios u otros datos sin depender de un desarrollador.',
      },
      {
        question: '¿Ofrecés mantenimiento?',
        answer:
          'Sí, de manera opcional. Una vez publicado el proyecto, podemos acordar un servicio de mantenimiento o presupuestar mejoras puntuales.',
      },
      {
        question: '¿Trabajás con clientes de otras ciudades?',
        answer:
          'Sí. Trabajo desde Rosario y desarrollo proyectos para clientes de todo el país de manera remota.',
      },
    ],
  },

  about: {
    title: 'Sobre mí',
    paragraphs: [
      'Soy Gianni Pasquinelli, desarrollador web en Rosario. Vengo de la música y la docencia, y eso se nota en cómo trabajo: orden, ritmo y atención al detalle.',
      'Construyo sitios y sistemas para negocios: catálogos, paneles de administración y sistemas internos. Escribo el código yo, sin plantillas.',
      'Trabajo desde Rosario con negocios de todo el país. Cuando necesitás algo, del otro lado estoy yo.',
    ],
    tags: 'Sitios · Sistemas · Panel de administración',
  },

  showreel: {
    title: 'TRABAJEMOS JUNTOS',
    hint: 'Seguí bajando',
  },

  logos: {
    title: 'Empresas que confiaron',
  },

  closing: {
    title: 'Una idea, un diseño y un desarrollo hecho a medida.',
    body: 'No necesitás llegar con todo resuelto. Me contás qué necesitás y trabajamos juntos para convertirlo en una solución web concreta.',
    footer:
      'Diseño y desarrollo personalmente cada proyecto, desde los primeros wireframes hasta su publicación.',
  },

  projects: {
    title: 'Proyectos',
    goto: 'Ir al proyecto',
    featured: 'Destacados',
    other: 'Otros trabajos',
    loading: 'Cargando proyectos…',
    error: 'No pudimos cargar los proyectos.',
    demo: 'Ver demo',
    code: 'Ver código',
    previous: 'Proyecto anterior',
    next: 'Proyecto siguiente',
    show: 'Mostrar',
  },

  studies: {
    title: 'Formación',
    loading: 'Cargando formación…',
    error: 'No pudimos cargar la formación.',
  },

  skills: {
    title: 'Herramientas',
  },

  contact: {
    title: 'Contacto',
    heading: 'Hablemos',
    intro: 'Contame qué necesitás. Respondo yo.',
    whatsapp: 'Escribime por WhatsApp',
    whatsappShort: 'Escribime',
    whatsappMessage: 'Hola Gianni, quiero consultarte por un proyecto.',
    email: 'Escribime',
    linkedin: 'LinkedIn',
    divider: 'O dejame tu mensaje',
    alsoReach: 'O también podés contactarme por',
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    form: {
      name: 'Tu nombre',
      email: 'Tu email',
      message: 'Qué necesitás',
      submit: 'Enviar',
      sending: 'Enviando…',
      success: 'Listo. Te respondo hoy o mañana.',
      error: 'No salió. Probá por WhatsApp o email.',
      reset: 'Limpiar',
    },
  },

  footer: {
    serviciosWeb: 'Desarrollo web',
    serviciosSistemas: 'Sistemas a medida',
    rubroGastronomia: 'Gastronomía',
    rubroProfesionales: 'Profesionales',
    guias: 'Guías',
    terminos: 'Términos y condiciones',
    privacidad: 'Privacidad',
    rosario: 'Desarrollo web en Rosario',
    role: 'Desarrollo web a medida · Rosario, Argentina',
  },
};
