export type NewsStatus = "borrador" | "publicado";
export type TenderStatus = "en_plazo" | "adjudicada" | "cerrada";
export type UserRole = "admin" | "editor";

export interface NewsItem {
  id: string;
  titulo: string;
  slug: string;
  resumen: string;
  cuerpo: string;
  imagen_url: string | null;
  etiqueta: string | null;
  fecha_publicacion: string;
  estado: NewsStatus;
  created_at: string;
}

export interface Service {
  id: string;
  icono: string;
  titulo: string;
  descripcion: string;
  cta: string | null;
  orden: number;
  activo: boolean;
}

export interface Project {
  id: string;
  titulo: string;
  resumen: string;
  cuerpo: string | null;
  imagen_url: string | null;
  etiqueta: string | null;
  estado: string;
  orden: number;
}

export interface Job {
  id: string;
  titulo: string;
  empresa: string | null;
  ubicacion: string | null;
  descripcion: string;
  deadline: string | null;
  activo: boolean;
}

export interface Course {
  id: string;
  titulo: string;
  descripcion: string;
  horas: number | null;
  modalidad: string | null;
  fecha_inicio: string | null;
  activo: boolean;
}

export interface Tender {
  id: string;
  titulo: string;
  deadline: string | null;
  estado: TenderStatus;
  url_documento: string | null;
}
