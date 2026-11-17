/**
 * English copy.
 *
 * Mirrors the shape of `es.js` one-to-one. Same business audience, not
 * recruiters: the site sells work, it does not present a CV.
 */
export const en = {
  locale: 'en',

  meta: {
    title: 'Gianni Pasquinelli | Custom web development in Rosario',
    description:
      'Custom sites and systems for businesses. Your own panel to update prices without depending on a developer. Rosario, Argentina.',
  },

  nav: {
    home: 'Home',
    services: 'Services',
    cases: 'Work',
    process: 'Process',
    faq: 'FAQ',
    about: 'About',
    projects: 'Projects',
    studies: 'Studies',
    skills: 'Skills',
    contact: 'Contact',
    resume: 'Resume Web',
    portfolio: 'Portfolio',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  hero: {
    title: 'Custom digital products',
    line1: 'No templates.',
    line2: 'No middlemen.',
    intro:
      'Sites and systems for businesses that need something built properly. From Rosario, for the whole country.',
    primaryCta: 'See the work',
    secondaryCta: "Let's talk",
  },

  services: {
    title: 'Services',
    intro: 'Pick a card to see what is included.',
    cta: "Let's talk about your project",
    cardHint: 'See what is included',
    items: [
      {
        title: 'Websites',
        summary: 'Your business, complete and well presented.',
        points: [
          'Custom design, no template',
          'Built for phone and tablet',
          'Base SEO and fast loads',
          'Panel to edit text and prices',
          'Domain and hosting in your name',
        ],
      },
      {
        title: 'Landing pages',
        summary: 'One page, one goal.',
        points: [
          'Focused on a single action',
          'Form or WhatsApp',
          'Loads in under two seconds',
          'Copy that leads to the enquiry',
          'Visit tracking',
        ],
      },
      {
        title: 'Web apps and systems',
        summary: 'Tools your team uses every day.',
        points: [
          'Users and permissions',
          'Your own database',
          'Bookings, stock or quotes',
          'Works from the phone',
          'Deploy and backup',
        ],
      },
      {
        title: 'Redesign and migration',
        summary: 'Your current site, without losing what works.',
        points: [
          'Audit of the current site',
          'Redesign without breaking SEO',
          'Content migration',
          'Speed improvements',
          'You stop depending on the developer',
        ],
      },
      {
        title: 'Digital catalogues',
        summary: 'Products and prices, always current.',
        points: [
          'Managed from a panel',
          'Photos, prices and categories',
          'Search and filters',
          'Shareable on WhatsApp',
          'Instant updates',
        ],
      },
      {
        title: 'In-store screens',
        summary: 'Menus and promos on the TVs.',
        points: [
          'Content from the same panel',
          'Automatic rotation',
          'One screen or many',
          'No dedicated PC',
          'Updates itself',
        ],
      },
    ],
  },

  cases: {
    title: 'Work',
    intro: 'Real work, live right now.',
    liveLabel: 'View site',
    viewAll: 'See all projects',
    labels: {
      problem: 'The problem',
      built: 'What I built',
      result: 'Result',
    },
    items: [
      {
        rubro: 'Bakery · Rosario',
        title: 'El Rey del Chajá',
        problem:
          'A template site, no SEO, and every price change depended on the developer.',
        built:
          'A new site, a panel to edit prices, and the three in-store screens, all from the same panel.',
        result: 'They update prices and screens themselves.',
        link: 'https://www.elreydelchaja.com/',
      },
      {
        rubro: 'Own product · SaaS',
        title: 'Plataforma 1810',
        problem:
          'A candidate needed a campaign site without depending on a technical team.',
        built:
          'Full product: five-step signup, panel, themes, plans and premium access.',
        result: 'Live and in production.',
        link: 'https://www.plataforma1810.com.ar/',
      },
      {
        rubro: 'Own product · Platform',
        title: 'Kli',
        problem:
          'Communities live scattered across chats, files and payment links.',
        built:
          'Content, meetings, memory and memberships with built-in payments in one place.',
        result: 'Live and in production.',
        link: 'https://kli.com.ar/',
      },
    ],
  },

  process: {
    title: 'How I work',
    intro: 'Four steps. No surprises.',
    steps: [
      {
        title: 'Call',
        description: 'You tell me what you need. Twenty minutes, no strings.',
      },
      {
        title: 'Proposal',
        description: 'Scope, price and date, in writing.',
      },
      {
        title: 'Build',
        description: 'Weekly progress. You see it moving, not a black box.',
      },
      {
        title: 'Delivery',
        description: 'Live and working. I show you how to run it.',
      },
    ],
  },

  faq: {
    title: 'FAQ',
    items: [
      {
        question: 'How much does it cost?',
        answer:
          'It depends on scope. You get a fixed quote in writing before we start. What moves it most: number of screens, custom design, animation and integrations.',
      },
      {
        question: 'How long does it take?',
        answer:
          'A simple site, two to three weeks. A system, one to three months. The date is in the proposal.',
      },
      {
        question: 'What do I need to have ready?',
        answer:
          'Your business information: what you sell, prices and photos. If you have no photos, we sort it out.',
      },
      {
        question: 'What if I need a change later?',
        answer:
          'If it is a price or a line of text, you change it yourself from the panel. If it is something new, you message me.',
      },
      {
        question: 'Do you work outside Rosario?',
        answer:
          'Yes. I work from Rosario with businesses across the country, fully remote.',
      },
      {
        question: 'Who owns the domain and hosting?',
        answer: 'You do. It is all in your name, always.',
      },
    ],
  },

  about: {
    title: 'About',
    paragraphs: [
      'I am Gianni Pasquinelli, a web developer in Rosario. I come from music and teaching, and it shows in how I work: order, rhythm and attention to detail.',
      'I build sites and systems for businesses: catalogues, bookings, admin panels, in-store screens. I write the code myself, no templates.',
      'I work from Rosario with businesses across the country. When you need something, I am the one on the other side.',
    ],
    tags: 'Sites · Systems · Admin panel · In-store screens',
  },

  projects: {
    title: 'Projects',
    featured: 'Featured',
    other: 'Other Works',
    loading: 'Loading projects…',
    error: 'Error loading projects.',
    demo: 'Live demo',
    code: 'View code',
    previous: 'Previous project',
    next: 'Next project',
    show: 'Show',
  },

  studies: {
    title: 'Studies',
    loading: 'Loading studies…',
    error: 'Error loading studies.',
  },

  skills: {
    title: 'Skills',
  },

  contact: {
    title: 'Contact',
    heading: "Let's talk",
    intro: 'Tell me what you need. You get me.',
    whatsapp: 'Message me on WhatsApp',
    whatsappShort: 'Message me',
    whatsappMessage: 'Hi Gianni, I would like to ask about a project.',
    email: 'Send me an email',
    linkedin: 'LinkedIn',
    divider: 'Or leave me a message',
    form: {
      name: 'Your name',
      email: 'Your email',
      message: 'What you need',
      submit: 'Send',
      sending: 'Sending…',
      success: 'Done. I will reply today or tomorrow.',
      error: 'It did not go through. Try WhatsApp or email.',
      reset: 'Clear',
    },
  },

  footer: {
    role: 'Custom web development · Rosario, Argentina',
  },
};
