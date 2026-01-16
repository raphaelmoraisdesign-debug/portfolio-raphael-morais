import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";
import { projectSchema } from "@/lib/validations/project";

export interface ProcessStep {
  title: string;
  description: string;
  image_url?: string;
  image_caption?: string;
  activities?: string[];
  deliverables?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  short_description: string;
  hero_image_url: string | null;
  client: string | null;
  year: string | null;
  duration: string | null;
  role: string | null;
  context: string | null;
  challenge: string | null;
  solution: string | null;
  results: string | null;
  tools: string[];
  gallery_images: string[];
  process_steps: ProcessStep[];
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type ProjectInsert = Omit<Project, "id" | "created_at" | "updated_at">;
export type ProjectUpdate = Partial<ProjectInsert>;

// Helper to transform DB row to Project type
function transformProject(row: any): Project {
  return {
    ...row,
    process_steps: Array.isArray(row.process_steps) 
      ? row.process_steps as ProcessStep[]
      : [],
  };
}

// Helper to prepare data for DB insert/update
function prepareForDb(data: ProjectInsert | ProjectUpdate): Record<string, unknown> {
  return {
    ...data,
    process_steps: data.process_steps as unknown as Json,
  };
}

// Helper to validate project data before insert/update
function validateProject(data: ProjectInsert | ProjectUpdate): { isValid: boolean; errors: string[] } {
  const result = projectSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map(err => {
      const path = err.path.join(".");
      return path ? `${path}: ${err.message}` : err.message;
    });
    return { isValid: false, errors };
  }
  return { isValid: true, errors: [] };
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return (data || []).map(transformProject);
    }
  });
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: ["projects", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_featured", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return (data || []).map(transformProject);
    }
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ["projects", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      
      if (error) throw error;
      return data ? transformProject(data) : null;
    },
    enabled: !!slug
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: ProjectInsert) => {
      // Valider les données avant insertion
      const validation = validateProject(project);
      if (!validation.isValid) {
        throw new Error(`Validation échouée: ${validation.errors.join(", ")}`);
      }

      const { data, error } = await supabase
        .from("projects")
        .insert(prepareForDb(project) as any)
        .select()
        .single();
      
      if (error) throw error;
      return transformProject(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Projet créé avec succès");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Erreur lors de la création du projet";
      toast.error(message);
      console.error(error);
    }
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ProjectUpdate }) => {
      // Valider les données avant mise à jour
      const validation = validateProject(updates);
      if (!validation.isValid) {
        throw new Error(`Validation échouée: ${validation.errors.join(", ")}`);
      }

      const { data, error } = await supabase
        .from("projects")
        .update(prepareForDb(updates) as any)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return transformProject(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Projet mis à jour avec succès");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Erreur lors de la mise à jour du projet";
      toast.error(message);
      console.error(error);
    }
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Projet supprimé avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression du projet");
      console.error(error);
    }
  });
}
