-- Logos de empresas, editables desde el admin.
--
-- Ejecutá esto en el SQL Editor de Supabase. Idempotente salvo el seed.

create table if not exists public.logos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image text not null,
  href text,
  position integer not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists logos_position_idx on public.logos (position);

alter table public.logos enable row level security;

drop policy if exists "logos public read" on public.logos;
create policy "logos public read"
  on public.logos
  for select
  using (true);

drop policy if exists "logos authenticated write" on public.logos;
create policy "logos authenticated write"
  on public.logos
  for all
  to authenticated
  using (true)
  with check (true);

insert into public.logos (name, image, href, position)
values
  ('El Rey del Chajá', '/img/logos/chaja.png', 'https://www.elreydelchaja.com/', 1),
  ('Plataforma 1810', '/img/logos/1810.png', 'https://www.plataforma1810.com.ar/', 2),
  ('Kli', '/img/logos/kli.png', 'https://kli.com.ar/', 3),
  ('Holocruxe', '/img/logos/holocruxe.png', 'https://www.holocruxe.com/', 4),
  ('Vibado', '/img/logos/vibado.webp', null, 5);
