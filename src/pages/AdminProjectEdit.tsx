import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, Loader2, Upload, X, Check } from "lucide-react";
import { useProject, useCreateProject, useUpdateProject, ProjectInsert, ProcessStep } from "@/hooks/useProjects";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ProcessStepsEditor } from "@/components/admin/ProcessStepsEditor";
import { GalleryEditor } from "@/components/admin/GalleryEditor";
import { ToolsEditor } from "@/components/admin/ToolsEditor";
import { SectorsSelector } from "@/components/admin/SectorsSelector";
import { cn } from "@/lib/utils";
import { normalizeSlug } from "@/lib/validations/project";

type TabId = "general" | "content" | "process" | "gallery" | "options";

interface Tab {
  id: TabId;
  label: string;
}

const tabs: Tab[] = [
  { id: "general", label: "Général" },
  { id: "content", label: "Contenu" },
  { id: "process", label: "Processus" },
  { id: "gallery", label: "Galerie" },
  { id: "options", label: "Options" },
];

export default function AdminProjectEdit() {
  const { slug } = useParams();
  const isNew = slug === "nouveau";
  const navigate = useNavigate();
  
  const { data: existingProject, isLoading: projectLoading } = useProject(isNew ? "" : slug || "");
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();

  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [formData, setFormData] = useState<Partial<ProjectInsert> & { sectors?: string[] }>({
    title: "",
    slug: "",
    category: "",
    short_description: "",
    client: "",
    year: "",
    
    role: "",
    context: "",
    challenge: "",
    solution: "",
    results: "",
    tools: [],
    gallery_images: [],
    process_steps: [],
    is_featured: false,
    display_order: 0,
    sectors: [],
  });
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (existingProject) {
      setFormData({
        title: existingProject.title,
        slug: existingProject.slug,
        category: existingProject.category,
        short_description: existingProject.short_description,
        client: existingProject.client || "",
        year: existingProject.year || "",
        
        role: existingProject.role || "",
        context: existingProject.context || "",
        challenge: existingProject.challenge || "",
        solution: existingProject.solution || "",
        results: existingProject.results || "",
        tools: existingProject.tools || [],
        gallery_images: existingProject.gallery_images || [],
        process_steps: existingProject.process_steps || [],
        is_featured: existingProject.is_featured,
        display_order: existingProject.display_order,
        sectors: (existingProject as any).sectors || [],
      });
      if (existingProject.hero_image_url) {
        setHeroPreview(existingProject.hero_image_url);
      }
    }
  }, [existingProject]);

  const handleChange = (field: keyof ProjectInsert | 'sectors', value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === "title" && isNew) {
      setFormData(prev => ({ ...prev, slug: normalizeSlug(value) }));
    }
    setSaved(false);
  };

  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const validateImageFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Type de fichier non autorisé. Utilisez JPG, PNG, WebP ou GIF.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'Fichier trop volumineux. Maximum 5MB.';
    }
    return null;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validationError = validateImageFile(file);
      if (validationError) {
        toast.error(validationError);
        e.target.value = '';
        return;
      }
      setHeroImage(file);
      setHeroPreview(URL.createObjectURL(file));
      setSaved(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const validationError = validateImageFile(file);
    if (validationError) {
      throw new Error(validationError);
    }

    const mimeToExt: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif',
    };
    const ext = mimeToExt[file.type] || 'jpg';
    const fileName = `${formData.slug}-${Date.now()}.${ext}`;
    const filePath = `heroes/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.category || !formData.short_description) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      setActiveTab("general");
      return;
    }

    setUploading(true);

    try {
      let heroImageUrl = existingProject?.hero_image_url || null;
      
      if (heroImage) {
        heroImageUrl = await uploadImage(heroImage);
      }

      const projectData: ProjectInsert = {
        ...formData as ProjectInsert,
        hero_image_url: heroImageUrl,
      };

      if (isNew) {
        await createProject.mutateAsync(projectData);
        toast.success("Projet créé avec succès");
      } else if (existingProject) {
        await updateProject.mutateAsync({ id: existingProject.id, updates: projectData });
        toast.success("Projet mis à jour");
        setSaved(true);
      }

      if (isNew) {
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setUploading(false);
    }
  };

  if (!isNew && projectLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AdminLayout
      title={isNew ? "Nouveau projet" : formData.title || "Modifier le projet"}
      subtitle={isNew ? "Créer un nouveau projet" : `/${formData.slug}`}
      showBackButton
      backTo="/admin"
      actions={
        <Button 
          onClick={() => handleSubmit()} 
          disabled={uploading}
          className="gap-2"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saved ? "Enregistré" : "Enregistrer"}
        </Button>
      }
    >
      <div className="max-w-4xl">
        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-muted/50 rounded-lg mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-text-secondary hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="space-y-6">
              {/* Hero Image */}
              <FormSection title="Image Hero">
                {heroPreview ? (
                  <div className="relative group">
                    <img 
                      src={heroPreview} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setHeroImage(null);
                          setHeroPreview(null);
                          setSaved(false);
                        }}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all">
                    <Upload className="w-8 h-8 text-text-tertiary mb-3" />
                    <span className="text-sm font-medium text-foreground">Cliquez pour uploader</span>
                    <span className="text-xs text-text-tertiary mt-1">JPG, PNG, WebP ou GIF • Max 5MB</span>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,.gif"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </FormSection>

              {/* Basic Info */}
              <FormSection title="Informations de base">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Titre" required>
                    <Input
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder="Ex: BNP Omnicanalité"
                    />
                  </FormField>
                  <FormField label="Slug URL" required>
                    <Input
                      value={formData.slug}
                      onChange={(e) => handleChange("slug", e.target.value)}
                      placeholder="bnp-omnicanalite"
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Catégorie" required>
                    <Input
                      value={formData.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      placeholder="Ex: Banque, Éducation"
                    />
                  </FormField>
                  <FormField label="Client">
                    <Input
                      value={formData.client}
                      onChange={(e) => handleChange("client", e.target.value)}
                      placeholder="Ex: BNP Paribas"
                    />
                  </FormField>
                </div>

                <FormField label="Description courte" required>
                  <Textarea
                    value={formData.short_description}
                    onChange={(e) => handleChange("short_description", e.target.value)}
                    placeholder="Une phrase résumant le projet..."
                    rows={2}
                  />
                </FormField>

                <FormField label="Année">
                  <Input
                    value={formData.year}
                    onChange={(e) => handleChange("year", e.target.value)}
                    placeholder="2024"
                  />
                </FormField>

                <FormField label="Secteurs d'activité">
                  <SectorsSelector
                    selected={formData.sectors || []}
                    onChange={(sectors) => handleChange("sectors", sectors)}
                  />
                </FormField>
              </FormSection>

              {/* Tools */}
              <FormSection title="Outils">
                <ToolsEditor
                  tools={formData.tools || []}
                  onChange={(tools) => handleChange("tools", tools)}
                />
              </FormSection>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === "content" && (
            <div className="space-y-6">
              <FormSection title="Contexte & Challenge">
                <FormField label="Contexte">
                  <Textarea
                    value={formData.context}
                    onChange={(e) => handleChange("context", e.target.value)}
                    placeholder="Décrivez le contexte du projet..."
                    rows={5}
                  />
                </FormField>

                <FormField label="Challenge">
                  <Textarea
                    value={formData.challenge}
                    onChange={(e) => handleChange("challenge", e.target.value)}
                    placeholder="Quel était le défi à relever ?"
                    rows={5}
                  />
                </FormField>
              </FormSection>

              <FormSection title="Solution & Résultats">
                <FormField label="Solution">
                  <Textarea
                    value={formData.solution}
                    onChange={(e) => handleChange("solution", e.target.value)}
                    placeholder="Quelle solution avez-vous apportée ?"
                    rows={5}
                  />
                </FormField>

                <FormField label="Résultats">
                  <Textarea
                    value={formData.results}
                    onChange={(e) => handleChange("results", e.target.value)}
                    placeholder="Quels ont été les résultats obtenus ?"
                    rows={5}
                  />
                </FormField>
              </FormSection>
            </div>
          )}

          {/* Process Tab */}
          {activeTab === "process" && (
            <FormSection title="Étapes du processus">
              <ProcessStepsEditor
                steps={formData.process_steps || []}
                onChange={(steps) => handleChange("process_steps", steps)}
                projectSlug={formData.slug || "project"}
              />
            </FormSection>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <FormSection title="Galerie d'images">
              <GalleryEditor
                images={formData.gallery_images || []}
                onChange={(images) => handleChange("gallery_images", images)}
                projectSlug={formData.slug || "project"}
                processSteps={formData.process_steps as ProcessStep[] || []}
                onMoveToStep={(imageUrl, stepIndex) => {
                  const steps = [...(formData.process_steps || [])] as ProcessStep[];
                  if (steps[stepIndex]) {
                    steps[stepIndex] = { ...steps[stepIndex], image_url: imageUrl };
                    handleChange("process_steps", steps);
                  }
                }}
              />
            </FormSection>
          )}

          {/* Options Tab */}
          {activeTab === "options" && (
            <FormSection title="Options d'affichage">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div>
                  <Label className="text-base font-medium">Projet mis en avant</Label>
                  <p className="text-sm text-text-secondary mt-0.5">
                    Afficher ce projet sur la page d'accueil
                  </p>
                </div>
                <Switch
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => handleChange("is_featured", checked)}
                />
              </div>

              <FormField label="Ordre d'affichage">
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => handleChange("display_order", parseInt(e.target.value) || 0)}
                  className="max-w-32"
                />
                <p className="text-xs text-text-tertiary mt-1.5">
                  Les projets sont triés par ordre croissant
                </p>
              </FormField>
            </FormSection>
          )}
        </form>
      </div>
    </AdminLayout>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-card border border-border rounded-xl p-6 space-y-5">
      <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function FormField({ 
  label, 
  required, 
  children 
}: { 
  label: string; 
  required?: boolean; 
  children: React.ReactNode 
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}
