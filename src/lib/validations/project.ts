import { z } from "zod";

// Schéma de validation pour les étapes du processus
const processStepSchema = z.object({
  title: z.string().trim().min(1, "Le titre est requis").max(200, "Le titre est trop long (max 200 caractères)"),
  description: z.string().trim().max(2000, "La description est trop longue (max 2000 caractères)").optional().default(""),
  image_url: z.string().url("URL d'image invalide").max(500, "URL trop longue").optional().or(z.literal("")),
  image_caption: z.string().trim().max(300, "Légende trop longue (max 300 caractères)").optional(),
  activities: z.array(z.string().trim().max(200)).max(20).optional(),
  deliverables: z.string().trim().max(500, "Les livrables sont trop longs (max 500 caractères)").optional(),
});

// Schéma de validation principal pour les projets
export const projectSchema = z.object({
  title: z.string().trim()
    .min(1, "Le titre est requis")
    .max(200, "Le titre est trop long (max 200 caractères)"),
  
  slug: z.string().trim()
    .min(1, "Le slug est requis")
    .max(100, "Le slug est trop long (max 100 caractères)")
    .regex(/^[a-z0-9-]+$/, "Le slug ne peut contenir que des lettres minuscules, chiffres et tirets"),
  
  category: z.string().trim()
    .min(1, "La catégorie est requise")
    .max(100, "La catégorie est trop longue (max 100 caractères)"),
  
  short_description: z.string().trim()
    .min(1, "La description courte est requise")
    .max(500, "La description courte est trop longue (max 500 caractères)"),
  
  hero_image_url: z.string().url("URL d'image hero invalide").max(500, "URL trop longue").nullable().optional(),
  
  client: z.string().trim().max(200, "Le nom du client est trop long (max 200 caractères)").nullable().optional(),
  
  year: z.string().trim().max(20, "L'année est trop longue (max 20 caractères)").nullable().optional(),
  
  duration: z.string().trim().max(100, "La durée est trop longue (max 100 caractères)").nullable().optional(),
  
  role: z.string().trim().max(200, "Le rôle est trop long (max 200 caractères)").nullable().optional(),
  
  context: z.string().trim().max(5000, "Le contexte est trop long (max 5000 caractères)").nullable().optional(),
  
  challenge: z.string().trim().max(5000, "Le challenge est trop long (max 5000 caractères)").nullable().optional(),
  
  solution: z.string().trim().max(5000, "La solution est trop longue (max 5000 caractères)").nullable().optional(),
  
  results: z.string().trim().max(5000, "Les résultats sont trop longs (max 5000 caractères)").nullable().optional(),
  
  tools: z.array(z.string().trim().max(100)).max(50, "Maximum 50 outils autorisés").optional().default([]),
  
  gallery_images: z.array(z.string().url("URL d'image invalide").max(500)).max(50, "Maximum 50 images autorisées").optional().default([]),
  
  process_steps: z.array(processStepSchema).max(20, "Maximum 20 étapes de processus autorisées").optional().default([]),
  
  sectors: z.array(z.string().trim().max(100)).max(20, "Maximum 20 secteurs autorisés").optional().default([]),
  
  is_featured: z.boolean().optional().default(false),
  
  display_order: z.number().int().min(0).max(1000, "L'ordre d'affichage doit être entre 0 et 1000").optional().default(0),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

// Fonction pour valider et formater les données du projet
export function validateProjectData(data: unknown): { success: true; data: ProjectFormData } | { success: false; errors: string[] } {
  const result = projectSchema.safeParse(data);
  
  if (!result.success) {
    const errors = result.error.errors.map(err => {
      const path = err.path.join(".");
      return path ? `${path}: ${err.message}` : err.message;
    });
    return { success: false, errors };
  }
  
  return { success: true, data: result.data };
}

// Fonction pour normaliser le slug
export function normalizeSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .replace(/[^a-z0-9]+/g, "-") // Remplacer les caractères spéciaux par des tirets
    .replace(/(^-|-$)/g, "") // Supprimer les tirets en début/fin
    .slice(0, 100); // Limiter la longueur
}
