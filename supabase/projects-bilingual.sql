-- Proyectos bilingües.
--
-- Agrega la descripción en los dos idiomas. La columna `description` vieja se
-- conserva como respaldo: el sitio la usa si alguna de las nuevas está vacía.

alter table public.projects
  add column if not exists description_es text,
  add column if not exists description_en text;

-- Lo que ya está cargado en inglés pasa a description_en.
update public.projects
set description_en = coalesce(description_en, description)
where description_en is null and description is not null;

-- Revisá y completá las descripciones en español desde /admin/projects.
