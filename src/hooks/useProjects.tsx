import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type ProjectInsert = Omit<Project, "id" | "created_at" | "updated_at">;
export type ProjectUpdate = Partial<ProjectInsert>;

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as Project[];
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
      return data as Project[];
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
      return data as Project | null;
    },
    enabled: !!slug
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: ProjectInsert) => {
      const { data, error } = await supabase
        .from("projects")
        .insert(project)
        .select()
        .single();
      
      if (error) throw error;
      return data as Project;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Projet créé avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de la création du projet");
      console.error(error);
    }
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ProjectUpdate }) => {
      const { data, error } = await supabase
        .from("projects")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Project;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Projet mis à jour avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour du projet");
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
