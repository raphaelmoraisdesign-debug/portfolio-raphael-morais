import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getProjectById as getStaticProjectById, getAllProjectsForCards as getStaticProjectsForCards, getFeaturedProjects as getStaticFeaturedProjects, ProjectData } from "@/data/projectsData";

export interface DBProcessStep {
  title: string;
  description: string;
  image_url?: string;
  image_caption?: string;
  activities?: string[];
  deliverables?: string;
}

export interface DBProject {
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
  process_steps: DBProcessStep[];
  is_featured: boolean;
  display_order: number;
}

// Merge DB project data with static fallback
function mergeProjectData(dbProject: DBProject | null, staticProject: ProjectData | undefined): ProjectData | null {
  if (!staticProject && !dbProject) return null;
  
  // If no DB project, return static as-is
  if (!dbProject) return staticProject || null;
  
  // If no static project, create a minimal project from DB
  if (!staticProject) {
    return {
      id: dbProject.slug,
      title: dbProject.title,
      subtitle: dbProject.short_description,
      description: dbProject.short_description,
      client: dbProject.client || "",
      sector: dbProject.category,
      roles: [dbProject.role || "Designer"],
      role: dbProject.role || "",
      year: dbProject.year || "",
      duration: dbProject.duration || "",
      heroImage: dbProject.hero_image_url || "",
      context: dbProject.context || "",
      challengeBusiness: dbProject.challenge || "",
      audienceCible: "",
      statCle: "",
      objectives: [],
      collaboration: "",
      team: [],
      mcar: {
        mission: dbProject.context || "",
        constat: dbProject.challenge || "",
        action: dbProject.solution || "",
        resultat: dbProject.results || "",
      },
      process: (dbProject.process_steps || []).map((step, i) => ({
        step: String(i + 1),
        title: step.title,
        summary: step.description,
        activities: step.activities || [],
        deliverables: step.deliverables || "",
        image: step.image_url,
        imageCaption: step.image_caption,
      })),
      tools: (dbProject.tools || []).map(t => ({ name: t, logo: "" })),
      gallery: dbProject.gallery_images || [],
      results: {
        quantitative: [],
        qualitative: [],
        learnings: [],
      },
      summary: [],
    };
  }

  // Merge: DB values override static values when present
  return {
    ...staticProject,
    // Override with DB values if they exist
    title: dbProject.title || staticProject.title,
    subtitle: dbProject.short_description || staticProject.subtitle,
    client: dbProject.client || staticProject.client,
    sector: dbProject.category || staticProject.sector,
    role: dbProject.role || staticProject.role,
    year: dbProject.year || staticProject.year,
    duration: dbProject.duration || staticProject.duration,
    heroImage: dbProject.hero_image_url || staticProject.heroImage,
    context: dbProject.context || staticProject.context,
    // Process steps: use DB if they have content, else static
    process: (dbProject.process_steps && dbProject.process_steps.length > 0)
      ? dbProject.process_steps.map((step, i) => ({
          step: String(i + 1),
          title: step.title || staticProject.process[i]?.title || "",
          summary: step.description || staticProject.process[i]?.summary || "",
          activities: (step.activities && step.activities.length > 0) 
            ? step.activities 
            : (staticProject.process[i]?.activities || []),
          deliverables: step.deliverables || staticProject.process[i]?.deliverables || "",
          image: step.image_url || staticProject.process[i]?.image,
          imageCaption: step.image_caption || staticProject.process[i]?.imageCaption,
        }))
      : staticProject.process,
    // Gallery: use DB if present, else static
    gallery: (dbProject.gallery_images && dbProject.gallery_images.length > 0)
      ? dbProject.gallery_images
      : staticProject.gallery,
  };
}

// Transform DB row to DBProject
function transformDBProject(row: any): DBProject {
  return {
    ...row,
    process_steps: Array.isArray(row.process_steps) ? row.process_steps : [],
    tools: row.tools || [],
    gallery_images: row.gallery_images || [],
    is_featured: row.is_featured || false,
    display_order: row.display_order || 0,
  };
}

// Hook to get a single project by slug, merged with static data
export function useProjectWithFallback(slug: string) {
  return useQuery({
    queryKey: ["projects", "merged", slug],
    queryFn: async () => {
      // Fetch from DB
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      
      if (error) throw error;
      
      const dbProject = data ? transformDBProject(data) : null;
      const staticProject = getStaticProjectById(slug);
      
      return mergeProjectData(dbProject, staticProject);
    },
    enabled: !!slug,
  });
}

// Hook to get all projects for cards, preferring DB data
export function useAllProjectsForCards() {
  return useQuery({
    queryKey: ["projects", "cards"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      
      // Get static projects as fallback
      const staticProjects = getStaticProjectsForCards();
      
      if (!data || data.length === 0) {
        return staticProjects;
      }
      
      // Map DB projects to card format
      return data.map(row => {
        const db = transformDBProject(row);
        // Find matching static project for roles
        const staticMatch = staticProjects.find(p => p.id === db.slug);
        
        return {
          id: db.slug,
          title: db.title,
          client: db.client || "",
          sector: db.category,
          description: db.short_description,
          roles: staticMatch?.roles || [db.role || "Designer"],
          image: db.hero_image_url || staticMatch?.image || "",
        };
      });
    },
  });
}

// Hook to get featured projects, preferring DB data
export function useFeaturedProjectsWithFallback() {
  return useQuery({
    queryKey: ["projects", "featured", "merged"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_featured", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      
      // Get static featured projects as fallback
      const staticFeatured = getStaticFeaturedProjects();
      
      if (!data || data.length === 0) {
        return staticFeatured;
      }
      
      // Map DB projects to card format
      return data.map(row => {
        const db = transformDBProject(row);
        const staticMatch = staticFeatured.find(p => p.id === db.slug);
        
        return {
          id: db.slug,
          title: db.title,
          client: db.client || "",
          sector: db.category,
          description: db.short_description,
          roles: staticMatch?.roles || [db.role || "Designer"],
          image: db.hero_image_url || staticMatch?.image || "",
        };
      });
    },
  });
}

// Hook to get all sectors from DB + static
export function useAllSectors() {
  return useQuery({
    queryKey: ["projects", "sectors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("category");
      
      if (error) throw error;
      
      const dbSectors = data?.map(p => p.category) || [];
      const staticProjects = getStaticProjectsForCards();
      const staticSectors = staticProjects.map(p => p.sector);
      
      const allSectors = [...new Set([...dbSectors, ...staticSectors])];
      return ["Tous", ...allSectors.sort()];
    },
  });
}

// Hook to get projects by sector
export function useProjectsBySector(sector: string) {
  return useQuery({
    queryKey: ["projects", "sector", sector],
    queryFn: async () => {
      let query = supabase.from("projects").select("*").order("display_order", { ascending: true });
      
      if (sector !== "Tous") {
        query = query.eq("category", sector);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      const staticProjects = getStaticProjectsForCards();
      
      if (!data || data.length === 0) {
        // Fallback to static
        if (sector === "Tous") return staticProjects;
        return staticProjects.filter(p => p.sector === sector);
      }
      
      return data.map(row => {
        const db = transformDBProject(row);
        const staticMatch = staticProjects.find(p => p.id === db.slug);
        
        return {
          id: db.slug,
          title: db.title,
          client: db.client || "",
          sector: db.category,
          description: db.short_description,
          roles: staticMatch?.roles || [db.role || "Designer"],
          image: db.hero_image_url || staticMatch?.image || "",
        };
      });
    },
  });
}
