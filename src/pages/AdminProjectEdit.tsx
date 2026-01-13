import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2, Upload, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProject, useCreateProject, useUpdateProject, ProjectInsert } from "@/hooks/useProjects";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export default function AdminProjectEdit() {
  const { slug } = useParams();
  const isNew = slug === "nouveau";
  const navigate = useNavigate();
  
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { data: existingProject, isLoading: projectLoading } = useProject(isNew ? "" : slug || "");
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();

  const [formData, setFormData] = useState<Partial<ProjectInsert>>({
    title: "",
    slug: "",
    category: "",
    short_description: "",
    client: "",
    year: "",
    duration: "",
    role: "",
    context: "",
    challenge: "",
    solution: "",
    results: "",
    tools: [],
    is_featured: false,
    display_order: 0,
  });
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!authLoading && user && !isAdmin) {
      toast.error("Vous n'avez pas les droits d'administration");
      navigate("/");
    }
  }, [isAdmin, authLoading, user, navigate]);

  useEffect(() => {
    if (existingProject) {
      setFormData({
        title: existingProject.title,
        slug: existingProject.slug,
        category: existingProject.category,
        short_description: existingProject.short_description,
        client: existingProject.client || "",
        year: existingProject.year || "",
        duration: existingProject.duration || "",
        role: existingProject.role || "",
        context: existingProject.context || "",
        challenge: existingProject.challenge || "",
        solution: existingProject.solution || "",
        results: existingProject.results || "",
        tools: existingProject.tools || [],
        is_featured: existingProject.is_featured,
        display_order: existingProject.display_order,
      });
      if (existingProject.hero_image_url) {
        setHeroPreview(existingProject.hero_image_url);
      }
    }
  }, [existingProject]);

  const handleChange = (field: keyof ProjectInsert, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === "title" && isNew) {
      setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
    }
  };

  // Allowed image types (excluding SVG to prevent XSS)
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

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
        e.target.value = ''; // Reset input
        return;
      }
      setHeroImage(file);
      setHeroPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    // Re-validate before upload (defense in depth)
    const validationError = validateImageFile(file);
    if (validationError) {
      throw new Error(validationError);
    }

    // Use MIME type for extension, not user-provided filename
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.category || !formData.short_description) {
      toast.error("Veuillez remplir tous les champs obligatoires");
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
      } else if (existingProject) {
        await updateProject.mutateAsync({ id: existingProject.id, updates: projectData });
      }

      navigate("/admin");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setUploading(false);
    }
  };

  if (authLoading || (!isNew && projectLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Link>
            </Button>
            <h1 className="font-display text-xl font-semibold text-foreground">
              {isNew ? "Nouveau projet" : `Modifier : ${existingProject?.title}`}
            </h1>
          </div>
          <Button onClick={handleSubmit} disabled={uploading}>
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Enregistrer
          </Button>
        </div>
      </header>

      <main className="container py-8 max-w-4xl">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
          onSubmit={handleSubmit}
        >
          {/* Informations de base */}
          <section className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">
              Informations de base
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Ex: BNP Omnicanalité"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug URL *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleChange("slug", e.target.value)}
                  placeholder="bnp-omnicanalite"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  placeholder="Ex: Banque, Éducation, Services"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => handleChange("client", e.target.value)}
                  placeholder="Ex: BNP Paribas"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Description courte *</Label>
              <Textarea
                id="short_description"
                value={formData.short_description}
                onChange={(e) => handleChange("short_description", e.target.value)}
                placeholder="Une phrase résumant le projet..."
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Année</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => handleChange("year", e.target.value)}
                  placeholder="2024"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Durée</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  placeholder="6 mois"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  placeholder="Product Designer"
                />
              </div>
            </div>
          </section>

          {/* Image Hero */}
          <section className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">
              Image Hero
            </h2>

            {heroPreview ? (
              <div className="relative">
                <img 
                  src={heroPreview} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setHeroImage(null);
                    setHeroPreview(null);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                <Upload className="w-8 h-8 text-text-secondary mb-2" />
                <span className="text-sm text-text-secondary">Cliquez pour uploader une image</span>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.gif"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </section>

          {/* Contenu détaillé */}
          <section className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">
              Contenu détaillé
            </h2>

            <div className="space-y-2">
              <Label htmlFor="context">Contexte</Label>
              <Textarea
                id="context"
                value={formData.context}
                onChange={(e) => handleChange("context", e.target.value)}
                placeholder="Décrivez le contexte du projet..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenge">Challenge</Label>
              <Textarea
                id="challenge"
                value={formData.challenge}
                onChange={(e) => handleChange("challenge", e.target.value)}
                placeholder="Quel était le défi à relever ?"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="solution">Solution</Label>
              <Textarea
                id="solution"
                value={formData.solution}
                onChange={(e) => handleChange("solution", e.target.value)}
                placeholder="Quelle solution avez-vous apportée ?"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="results">Résultats</Label>
              <Textarea
                id="results"
                value={formData.results}
                onChange={(e) => handleChange("results", e.target.value)}
                placeholder="Quels ont été les résultats obtenus ?"
                rows={4}
              />
            </div>
          </section>

          {/* Options */}
          <section className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">
              Options
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="is_featured">Projet mis en avant</Label>
                <p className="text-sm text-text-secondary">
                  Afficher ce projet sur la page d'accueil
                </p>
              </div>
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => handleChange("is_featured", checked)}
              />
            </div>
          </section>
        </motion.form>
      </main>
    </div>
  );
}
