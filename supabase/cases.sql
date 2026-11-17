-- Casos editables desde el admin.
--
-- Ejecutá esto en el SQL Editor de Supabase. Es idempotente salvo el seed.
-- Las imágenes se suben al bucket `projects`, que ya es público.

create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  rubro_es text not null default '',
  rubro_en text not null default '',
  problem_es text not null default '',
  problem_en text not null default '',
  built_es text not null default '',
  built_en text not null default '',
  result_es text not null default '',
  result_en text not null default '',
  link text,
  image text,
  position integer not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists cases_position_idx on public.cases (position);

alter table public.cases enable row level security;

drop policy if exists "cases public read" on public.cases;
create policy "cases public read"
  on public.cases
  for select
  using (true);

drop policy if exists "cases authenticated write" on public.cases;
create policy "cases authenticated write"
  on public.cases
  for all
  to authenticated
  using (true)
  with check (true);

-- Seed con los tres casos actuales.
insert into public.cases
  (slug, title, rubro_es, rubro_en, problem_es, problem_en, built_es, built_en,
   result_es, result_en, link, image, position)
values
  (
    'el-rey-del-chaja',
    'El Rey del Chajá',
    'Pastelería · Rosario',
    'Bakery · Rosario',
    'Sitio de plantilla, sin SEO, y cada cambio de precio dependía del desarrollador.',
    'A template site, no SEO, and every price change depended on the developer.',
    'Sitio nuevo, panel para editar precios y las 3 pantallas del local, todo desde el mismo panel.',
    'A new site, a panel to edit prices, and the three in-store screens, all from the same panel.',
    'Actualizan precios y pantallas solos.',
    'They update prices and screens themselves.',
    'https://www.elreydelchaja.com/',
    'https://lgmjqwoncylkjxbmclju.supabase.co/storage/v1/object/public/projects/project-1793116745381.webp',
    1
  ),
  (
    'plataforma-1810',
    'Plataforma 1810',
    'Producto propio · SaaS',
    'Own product · SaaS',
    'Un candidato necesitaba su sitio de campaña sin depender de un equipo técnico.',
    'A candidate needed a campaign site without depending on a technical team.',
    'Producto completo: alta en 5 pasos, panel, temas, planes y acceso premium.',
    'Full product: five-step signup, panel, themes, plans and premium access.',
    'Online y en producción.',
    'Live and in production.',
    'https://www.plataforma1810.com.ar/',
    'https://lgmjqwoncylkjxbmclju.supabase.co/storage/v1/object/public/projects/project-1792972804466.webp',
    2
  ),
  (
    'kli',
    'Kli',
    'Producto propio · Plataforma',
    'Own product · Platform',
    'Las comunidades viven dispersas entre chats, archivos y links de pago.',
    'Communities live scattered across chats, files and payment links.',
    'Contenido, encuentros, memoria y membresías con cobro integrado en un solo lugar.',
    'Content, meetings, memory and memberships with built-in payments in one place.',
    'Online y en producción.',
    'Live and in production.',
    'https://kli.com.ar/',
    'https://lgmjqwoncylkjxbmclju.supabase.co/storage/v1/object/public/projects/project-1793116978380.webp',
    3
  );
