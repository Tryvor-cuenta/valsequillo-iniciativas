-- ============================================================
-- Valsequillo Iniciativas — Schema Supabase
-- ============================================================

-- Extensión necesaria para UUIDs
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLAS PÚBLICAS
-- ============================================================

-- Noticias
create table if not exists public.news (
  id               uuid primary key default uuid_generate_v4(),
  titulo           text not null,
  slug             text not null unique,
  resumen          text not null,
  cuerpo           text not null default '',
  imagen_url       text,
  etiqueta         text,
  fecha_publicacion date not null default current_date,
  estado           text not null default 'borrador' check (estado in ('borrador','publicado')),
  created_at       timestamptz not null default now()
);

-- Servicios
create table if not exists public.services (
  id          uuid primary key default uuid_generate_v4(),
  icono       text not null default 'Briefcase',
  titulo      text not null,
  descripcion text not null,
  cta         text,
  orden       integer not null default 0,
  activo      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Proyectos
create table if not exists public.projects (
  id          uuid primary key default uuid_generate_v4(),
  titulo      text not null,
  resumen     text not null,
  cuerpo      text,
  imagen_url  text,
  etiqueta    text,
  estado      text not null default 'en_curso',
  orden       integer not null default 0,
  created_at  timestamptz not null default now()
);

-- Empleos
create table if not exists public.jobs (
  id          uuid primary key default uuid_generate_v4(),
  titulo      text not null,
  empresa     text,
  ubicacion   text,
  descripcion text not null,
  deadline    date,
  activo      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Formación / cursos
create table if not exists public.courses (
  id          uuid primary key default uuid_generate_v4(),
  titulo      text not null,
  descripcion text not null,
  horas       integer,
  modalidad   text,
  fecha_inicio date,
  activo      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Licitaciones (Perfil del Contratante)
create table if not exists public.tenders (
  id           uuid primary key default uuid_generate_v4(),
  titulo       text not null,
  deadline     date,
  estado       text not null default 'en_plazo' check (estado in ('en_plazo','adjudicada','cerrada')),
  url_documento text,
  created_at   timestamptz not null default now()
);

-- ============================================================
-- ROLES DE USUARIO
-- ============================================================

create table if not exists public.user_roles (
  id      uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role    text not null default 'editor' check (role in ('admin','editor')),
  unique(user_id)
);

-- Función para verificar si el usuario autenticado tiene un rol concreto
create or replace function public.has_role(role text)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and user_roles.role = has_role.role
  );
$$;

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

-- Activar RLS en todas las tablas
alter table public.news enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.jobs enable row level security;
alter table public.courses enable row level security;
alter table public.tenders enable row level security;
alter table public.user_roles enable row level security;

-- Políticas de lectura pública (anon puede leer)
create policy "Lectura pública noticias publicadas"
  on public.news for select using (estado = 'publicado');

create policy "Lectura pública servicios activos"
  on public.services for select using (activo = true);

create policy "Lectura pública proyectos"
  on public.projects for select using (true);

create policy "Lectura pública empleos activos"
  on public.jobs for select using (activo = true);

create policy "Lectura pública cursos activos"
  on public.courses for select using (activo = true);

create policy "Lectura pública licitaciones"
  on public.tenders for select using (true);

-- Políticas de escritura (solo admin autenticado)
create policy "Admin gestiona noticias"
  on public.news for all
  using (has_role('admin'))
  with check (has_role('admin'));

create policy "Admin gestiona servicios"
  on public.services for all
  using (has_role('admin'))
  with check (has_role('admin'));

create policy "Admin gestiona proyectos"
  on public.projects for all
  using (has_role('admin'))
  with check (has_role('admin'));

create policy "Admin gestiona empleos"
  on public.jobs for all
  using (has_role('admin'))
  with check (has_role('admin'));

create policy "Admin gestiona cursos"
  on public.courses for all
  using (has_role('admin'))
  with check (has_role('admin'));

create policy "Admin gestiona licitaciones"
  on public.tenders for all
  using (has_role('admin'))
  with check (has_role('admin'));

create policy "Admin ve y gestiona roles"
  on public.user_roles for all
  using (has_role('admin'))
  with check (has_role('admin'));

-- ============================================================
-- DATOS INICIALES DE EJEMPLO
-- ============================================================

insert into public.services (icono, titulo, descripcion, cta, orden) values
  ('TrendingUp', 'Emprendimiento', 'Asesoramiento y acompañamiento a personas emprendedoras en las fases de ideación, creación y consolidación de su negocio.', 'Más información', 1),
  ('Users', 'Empleo', 'Orientación laboral, intermediación y apoyo en la búsqueda de empleo para personas desempleadas del municipio.', 'Ver ofertas', 2),
  ('BookOpen', 'Formación', 'Cursos, talleres y programas de formación profesional para mejorar la empleabilidad y las competencias de la ciudadanía.', 'Ver cursos', 3),
  ('ShoppingBag', 'Dinamización comercial', 'Acciones para revitalizar el comercio local y apoyar a los comerciantes del municipio de Valsequillo.', 'Saber más', 4),
  ('Briefcase', 'Apoyo a empresas', 'Servicios de consultoría, financiación, tramitación de subvenciones y acceso a programas de apoyo empresarial.', 'Consultar', 5),
  ('Heart', 'Proyectos comunitarios', 'Iniciativas de desarrollo comunitario cofinanciadas con fondos europeos, estatales y canarios.', 'Ver proyectos', 6)
on conflict do nothing;

-- ============================================================
-- MIGRACIONES v2 (ejecutar sobre schema existente)
-- ============================================================

-- Columnas de documentos en proyectos
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS document_url text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS document_file_url text;

-- Tabla de solicitudes de empleo
CREATE TABLE IF NOT EXISTS public.job_applications (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  email      text NOT NULL,
  phone      text,
  position   text,
  message    text,
  cv_url     text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Insert público job_applications"
  ON public.job_applications FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin lee solicitudes"
  ON public.job_applications FOR SELECT
  USING (has_role('admin'));

-- ============================================================
-- SUPABASE STORAGE — Buckets necesarios
-- ============================================================
-- Ejecutar en el Dashboard de Supabase > Storage > New Bucket:
--
-- 1. actualidad-images   → público   (acceso público de lectura)
-- 2. curriculums         → privado   (solo admin puede leer vía signed URL)
-- 3. proyectos-docs      → público   (acceso público de lectura)
--
-- O ejecutar este SQL en el SQL Editor de Supabase:

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('actualidad-images', 'actualidad-images', true),
  ('curriculums',       'curriculums',       false),
  ('proyectos-docs',    'proyectos-docs',    true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de Storage para actualidad-images (público)
CREATE POLICY "Public read actualidad-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'actualidad-images');

CREATE POLICY "Auth upload actualidad-images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'actualidad-images' AND auth.role() = 'authenticated');

-- Políticas de Storage para curriculums (privado)
CREATE POLICY "Public insert curriculums"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'curriculums');

CREATE POLICY "Admin read curriculums"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'curriculums' AND has_role('admin'));

-- Políticas de Storage para proyectos-docs (público)
CREATE POLICY "Public read proyectos-docs"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'proyectos-docs');

CREATE POLICY "Auth upload proyectos-docs"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'proyectos-docs' AND auth.role() = 'authenticated');

-- Nuevos servicios: Música y Limpieza
INSERT INTO public.services (icono, titulo, descripcion, cta, orden, activo)
VALUES
  ('Music2',   'Música',   'Próximamente', NULL, 90, true),
  ('Sparkles', 'Limpieza', 'Próximamente', NULL, 91, true)
ON CONFLICT DO NOTHING;
