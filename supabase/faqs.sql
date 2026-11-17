-- FAQs editable desde el admin.
--
-- Ejecutá esto en el SQL Editor de Supabase. Es idempotente: podés correrlo
-- sin miedo si lo repetís, salvo el seed final (que inserta filas).

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question_es text not null,
  question_en text not null,
  answer_es text not null,
  answer_en text not null,
  position integer not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists faqs_position_idx on public.faqs (position);

alter table public.faqs enable row level security;

-- Lectura pública: la home se renderiza para cualquiera.
drop policy if exists "faqs public read" on public.faqs;
create policy "faqs public read"
  on public.faqs
  for select
  using (true);

-- Escritura solo para usuarios logueados en el admin.
drop policy if exists "faqs authenticated write" on public.faqs;
create policy "faqs authenticated write"
  on public.faqs
  for all
  to authenticated
  using (true)
  with check (true);

-- Seed con el contenido actual. Correr una sola vez.
insert into public.faqs
  (question_es, question_en, answer_es, answer_en, position)
values
  (
    '¿Cuánto cuesta desarrollar un sitio web?',
    'How much does a website cost?',
    'Cada proyecto tiene un presupuesto según su alcance, diseño y funcionalidades. Después de conocer qué necesitás, preparo una propuesta con precio y plazos definidos.',
    'Every project is priced by its scope, design and features. Once I know what you need, I prepare a proposal with a defined price and timeline.',
    1
  ),
  (
    '¿Tengo que tener el diseño preparado?',
    'Do I need to have the design ready?',
    'No. Puedo encargarme de todo el proceso, desde organizar la estructura y los contenidos hasta diseñar la interfaz y desarrollar el sitio.',
    'No. I can handle the whole process, from organising the structure and the content to designing the interface and building the site.',
    2
  ),
  (
    '¿Cuánto tarda un proyecto?',
    'How long does a project take?',
    'Depende de su complejidad y del alcance acordado. Los plazos quedan establecidos en la propuesta antes de comenzar.',
    'It depends on its complexity and the agreed scope. Timelines are set in the proposal before we start.',
    3
  ),
  (
    '¿Quién se encarga del dominio y el hosting?',
    'Who handles the domain and hosting?',
    'Te ayudo a configurar y publicar el proyecto. Las cuentas y servicios quedan a tu nombre para que tengas el control.',
    'I help you set up and publish the project. The accounts and services stay in your name so you stay in control.',
    4
  ),
  (
    '¿Puedo modificar el contenido después?',
    'Can I change the content later?',
    'Depende del proyecto. Podemos incorporar un panel de administración para que puedas actualizar textos, imágenes, precios u otros datos sin depender de un desarrollador.',
    'It depends on the project. We can add an admin panel so you can update text, images, prices or other data without depending on a developer.',
    5
  ),
  (
    '¿Ofrecés mantenimiento?',
    'Do you offer maintenance?',
    'Sí, de manera opcional. Una vez publicado el proyecto, podemos acordar un servicio de mantenimiento o presupuestar mejoras puntuales.',
    'Yes, optionally. Once the project is live we can agree on a maintenance service or quote individual improvements.',
    6
  ),
  (
    '¿Trabajás con clientes de otras ciudades?',
    'Do you work with clients in other cities?',
    'Sí. Trabajo desde Rosario y desarrollo proyectos para clientes de todo el país de manera remota.',
    'Yes. I work from Rosario and build projects for clients across the country, fully remote.',
    7
  );
