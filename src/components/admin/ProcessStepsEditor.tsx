import { useState } from "react";
import { Plus, Trash2, Upload, X, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ProcessStep } from "@/hooks/useProjects";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ProcessStepsEditorProps {
  steps: ProcessStep[];
  onChange: (steps: ProcessStep[]) => void;
  projectSlug: string;
}

interface SortableStepProps {
  step: ProcessStep;
  index: number;
  id: string;
  isExpanded: boolean;
  uploading: number | null;
  onToggleExpand: () => void;
  onRemove: () => void;
  onStepChange: (field: keyof ProcessStep, value: string | string[]) => void;
  onImageUpload: (file: File) => void;
  onRemoveImage: () => void;
}

const DEFAULT_STEPS = [
  { title: "Discovery & Research", description: "", activities: [], deliverables: "" },
  { title: "Conception & Idéation", description: "", activities: [], deliverables: "" },
  { title: "Tests & Validation", description: "", activities: [], deliverables: "" },
  { title: "Delivery & Suivi", description: "", activities: [], deliverables: "" },
];

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function SortableStep({
  step,
  index,
  id,
  isExpanded,
  uploading,
  onToggleExpand,
  onRemove,
  onStepChange,
  onImageUpload,
  onRemoveImage,
}: SortableStepProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-border rounded-lg overflow-hidden bg-background"
    >
      {/* Header */}
      <div className="flex items-center gap-2 p-3 bg-muted/50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="cursor-grab active:cursor-grabbing p-1 h-auto"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4 text-text-tertiary" />
        </Button>
        <span className="text-sm font-medium text-primary">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="flex-1 font-medium truncate cursor-pointer"
          onClick={onToggleExpand}
        >
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
            onClick={onToggleExpand}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 space-y-4 border-t border-border">
          <div className="space-y-2">
            <Label>Titre de l'étape</Label>
            <Input
              value={step.title}
              onChange={(e) => onStepChange("title", e.target.value)}
              placeholder="Ex: Discovery & Research"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={step.description}
              onChange={(e) => onStepChange("description", e.target.value)}
              placeholder="Décrivez cette étape du processus..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Activités</Label>
            <Textarea
              value={(step.activities || []).join("\n")}
              onChange={(e) => {
                const activities = e.target.value.split("\n").filter(a => a.trim() !== "" || e.target.value.endsWith("\n"));
                onStepChange("activities", activities);
              }}
              placeholder="Une activité par ligne&#10;Ex: Interviews utilisateurs&#10;Analyse concurrentielle&#10;Audit UX"
              rows={4}
            />
            <p className="text-xs text-text-secondary">Entrez une activité par ligne</p>
          </div>

          <div className="space-y-2">
            <Label>Livrables</Label>
            <Input
              value={step.deliverables || ""}
              onChange={(e) => onStepChange("deliverables", e.target.value)}
              placeholder="Ex: Rapport de recherche, Personas, User Journey"
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
                  onClick={onRemoveImage}
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
                    if (file) onImageUpload(file);
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
                onChange={(e) => onStepChange("image_caption", e.target.value)}
                placeholder="Ex: Logiciel existant avant la refonte"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ProcessStepsEditor({ steps, onChange, projectSlug }: ProcessStepsEditorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [uploading, setUploading] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddStep = () => {
    onChange([...steps, { title: "", description: "", activities: [], deliverables: "" }]);
    setExpandedIndex(steps.length);
  };

  const handleRemoveStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    onChange(newSteps);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const handleStepChange = (index: number, field: keyof ProcessStep, value: string | string[]) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    onChange(newSteps);
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = steps.findIndex((_, i) => `step-${i}` === active.id);
      const newIndex = steps.findIndex((_, i) => `step-${i}` === over.id);
      const newSteps = arrayMove(steps, oldIndex, newIndex);
      onChange(newSteps);
      
      // Update expanded index if needed
      if (expandedIndex === oldIndex) {
        setExpandedIndex(newIndex);
      } else if (expandedIndex !== null) {
        if (oldIndex < expandedIndex && newIndex >= expandedIndex) {
          setExpandedIndex(expandedIndex - 1);
        } else if (oldIndex > expandedIndex && newIndex <= expandedIndex) {
          setExpandedIndex(expandedIndex + 1);
        }
      }
    }
  };

  const stepIds = steps.map((_, i) => `step-${i}`);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-medium">Étapes du processus</Label>
          <p className="text-sm text-text-secondary">Glissez-déposez les étapes pour les réorganiser</p>
        </div>
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={stepIds} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <SortableStep
                  key={`step-${index}`}
                  id={`step-${index}`}
                  step={step}
                  index={index}
                  isExpanded={expandedIndex === index}
                  uploading={uploading}
                  onToggleExpand={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  onRemove={() => handleRemoveStep(index)}
                  onStepChange={(field, value) => handleStepChange(index, field, value)}
                  onImageUpload={(file) => handleImageUpload(index, file)}
                  onRemoveImage={() => handleRemoveImage(index)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {steps.length > 0 && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleAddStep}
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une étape
        </Button>
      )}
    </div>
  );
}
