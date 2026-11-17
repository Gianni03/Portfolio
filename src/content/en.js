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
      'Websites, landing pages and custom systems for businesses. Design and development in-house, from wireframes to launch. Rosario, Argentina.',
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
    resultLabel: 'Result',
    items: [
      {
        key: 'websites',
        title: 'Custom websites',
        tag: 'Core service',
        summary: 'For businesses and professionals who need a digital presence.',
        lead: 'Design and development for businesses, professionals and companies.',
        points: [
          'Custom design from scratch',
          'Wireframes and content structure',
          'Built for phones and computers',
          'Technical SEO and speed optimisation',
          'Forms and contact channels',
          'Domain and hosting configured',
        ],
        result:
          'A professional site, built for your business and ready to grow.',
      },
      {
        key: 'landing',
        title: 'Landing pages',
        tag: 'Core service',
        summary: 'To present a product, service, campaign or launch.',
        lead: 'Pages built to present an offer and generate enquiries.',
        points: [
          'Design aimed at one concrete goal',
          'Strategic structure and content',
          'Custom visual interface',
          'Forms or WhatsApp contact',
          'Adapted to every device',
          'Visit and conversion tracking',
        ],
        result:
          'A page built to turn visits into enquiries and opportunities.',
      },
      {
        key: 'systems',
        title: 'Systems and admin panels',
        tag: 'Complementary development',
        summary:
          'For businesses that need to manage information and resolve processes.',
        lead: 'Custom tools to manage information and resolve processes.',
        points: [
          'Interface and workflow design',
          'Admin panels',
          'Content and data management',
          'Your own databases',
          'Features for each need',
          'Access from computer and phone',
        ],
        result: 'A web tool adapted to the way your business works.',
      },
    ],
    extra: {
      title: 'Additional services',
      name: 'Maintenance and evolution',
      description:
        'Once the project is live, you can hire maintenance and improvements to keep it current, fix issues or add new features.',
    },
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
        points: [
          'What you do and what you want to achieve',
          'What you have today: site, social or nothing',
          'No cost and no commitment',
        ],
      },
      {
        title: 'Proposal',
        description: 'Scope, price and date, in writing.',
        points: [
          'What is included and what is not',
          'Fixed price and payment terms',
          'Estimated delivery date',
        ],
      },
      {
        title: 'Build',
        description: 'Weekly progress. You see it moving, not a black box.',
        points: [
          'Access to a staging environment',
          'Adjustments along the way',
          'No surprises at the end',
        ],
      },
      {
        title: 'Delivery',
        description: 'Live and working. I show you how to run it.',
        points: [
          'Published on your domain',
          'I show you how to update it',
          'Support after delivery',
        ],
      },
    ],
  },

  faq: {
    title: 'FAQ',
    items: [
      {
        question: 'How much does a website cost?',
        answer:
          'Every project is priced by its scope, design and features. Once I know what you need, I prepare a proposal with a defined price and timeline.',
      },
      {
        question: 'Do I need to have the design ready?',
        answer:
          'No. I can handle the whole process, from organising the structure and the content to designing the interface and building the site.',
      },
      {
        question: 'How long does a project take?',
        answer:
          'It depends on its complexity and the agreed scope. Timelines are set in the proposal before we start.',
      },
      {
        question: 'Who handles the domain and hosting?',
        answer:
          'I help you set up and publish the project. The accounts and services stay in your name so you stay in control.',
      },
      {
        question: 'Can I change the content later?',
        answer:
          'It depends on the project. We can add an admin panel so you can update text, images, prices or other data without depending on a developer.',
      },
      {
        question: 'Do you offer maintenance?',
        answer:
          'Yes, optionally. Once the project is live we can agree on a maintenance service or quote individual improvements.',
      },
      {
        question: 'Do you work with clients in other cities?',
        answer:
          'Yes. I work from Rosario and build projects for clients across the country, fully remote.',
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

  closing: {
    title: 'An idea, a design and a build made to measure.',
    body: 'You do not need to arrive with everything figured out. You tell me what you need and we turn it into a concrete web solution together.',
    footer:
      'I design and build every project myself, from the first wireframes to publication.',
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
