import { useState } from "react";
import { Plus, Trash2, Upload, X, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ProcessStep } from "@/hooks/useProjects";

interface ProcessStepsEditorProps {
  steps: ProcessStep[];
  onChange: (steps: ProcessStep[]) => void;
  projectSlug: string;
}

const DEFAULT_STEPS = [
  { title: "Discovery & Research", description: "" },
  { title: "Conception & Idéation", description: "" },
  { title: "Tests & Validation", description: "" },
  { title: "Delivery & Suivi", description: "" },
];

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function ProcessStepsEditor({ steps, onChange, projectSlug }: ProcessStepsEditorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [uploading, setUploading] = useState<number | null>(null);

  const handleAddStep = () => {
    onChange([...steps, { title: "", description: "" }]);
    setExpandedIndex(steps.length);
  };

  const handleRemoveStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    onChange(newSteps);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const handleStepChange = (index: number, field: keyof ProcessStep, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    onChange(newSteps);
  };

  const handleMoveStep = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= steps.length) return;
    
    const newSteps = [...steps];
    [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
    onChange(newSteps);
    setExpandedIndex(newIndex);
  };

  const validateImageFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Type de fichier non autorisé. Utilisez JPG, PNG, WebP ou GIF.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'Fichier trop volumineux. Maximum 5MB.';
    }
    return null;
  };

  const handleImageUpload = async (index: number, file: File) => {
    const validationError = validateImageFile(file);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setUploading(index);
    try {
      const mimeToExt: Record<string, string> = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/webp': 'webp',
        'image/gif': 'gif',
      };
      const ext = mimeToExt[file.type] || 'jpg';
      const fileName = `${projectSlug}-step-${index}-${Date.now()}.${ext}`;
      const filePath = `process-steps/${fileName}`;

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

      handleStepChange(index, "image_url", data.publicUrl);
      toast.success("Image uploadée avec succès");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'upload de l'image");
    } finally {
      setUploading(null);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], image_url: undefined, image_caption: undefined };
    onChange(newSteps);
  };

  const handleInitializeDefaults = () => {
    onChange(DEFAULT_STEPS);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Étapes du processus</Label>
        {steps.length === 0 && (
          <Button type="button" variant="outline" size="sm" onClick={handleInitializeDefaults}>
            Initialiser les étapes par défaut
          </Button>
        )}
      </div>

      {steps.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <p className="text-text-secondary mb-4">Aucune étape configurée</p>
          <div className="flex gap-2 justify-center">
            <Button type="button" variant="outline" onClick={handleInitializeDefaults}>
              Utiliser le template par défaut
            </Button>
            <Button type="button" onClick={handleAddStep}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une étape
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden bg-background"
            >
              {/* Header */}
              <div
                className="flex items-center gap-2 p-3 bg-muted/50 cursor-pointer"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <GripVertical className="w-4 h-4 text-text-tertiary" />
                <span className="text-sm font-medium text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-medium truncate">
                  {step.title || "Étape sans titre"}
                </span>
                {step.image_url && (
                  <span className="text-xs text-text-secondary bg-background px-2 py-0.5 rounded">
                    Image
                  </span>
                )}
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveStep(index, "up");
                    }}
                    disabled={index === 0}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveStep(index, "down");
                    }}
                    disabled={index === steps.length - 1}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveStep(index);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedIndex === index && (
                <div className="p-4 space-y-4 border-t border-border">
                  <div className="space-y-2">
                    <Label>Titre de l'étape</Label>
                    <Input
                      value={step.title}
                      onChange={(e) => handleStepChange(index, "title", e.target.value)}
                      placeholder="Ex: Discovery & Research"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={step.description}
                      onChange={(e) => handleStepChange(index, "description", e.target.value)}
                      placeholder="Décrivez cette étape du processus..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Image (optionnel)</Label>
                    {step.image_url ? (
                      <div className="relative">
                        <img
                          src={step.image_url}
                          alt={step.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                        {uploading === index ? (
                          <span className="text-sm text-text-secondary">Upload en cours...</span>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-text-secondary mb-1" />
                            <span className="text-sm text-text-secondary">Cliquez pour uploader</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.webp,.gif"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(index, file);
                            e.target.value = '';
                          }}
                          className="hidden"
                          disabled={uploading === index}
                        />
                      </label>
                    )}
                  </div>

                  {step.image_url && (
                    <div className="space-y-2">
                      <Label>Légende de l'image</Label>
                      <Input
                        value={step.image_caption || ""}
                        onChange={(e) => handleStepChange(index, "image_caption", e.target.value)}
                        placeholder="Ex: Logiciel existant avant la refonte"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleAddStep}
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une étape
          </Button>
        </div>
      )}
    </div>
  );
}
