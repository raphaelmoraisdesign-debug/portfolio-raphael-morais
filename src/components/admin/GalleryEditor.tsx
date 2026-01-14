import { useState } from "react";
import { Plus, Trash2, Upload, GripVertical, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
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
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ProcessStep {
  title: string;
  description: string;
  image_url?: string;
  image_caption?: string;
}

interface GalleryEditorProps {
  images: string[];
  onChange: (images: string[]) => void;
  projectSlug: string;
  processSteps?: ProcessStep[];
  onMoveToStep?: (imageUrl: string, stepIndex: number) => void;
}

interface SortableImageProps {
  id: string;
  url: string;
  index: number;
  onRemove: (index: number) => void;
  processSteps?: ProcessStep[];
  onMoveToStep?: (stepIndex: number) => void;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function SortableImage({ id, url, index, onRemove, processSteps, onMoveToStep }: SortableImageProps) {
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

  const handleMoveToStep = (value: string) => {
    const stepIndex = parseInt(value, 10);
    if (!isNaN(stepIndex) && onMoveToStep) {
      onMoveToStep(stepIndex);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group aspect-video"
    >
      <img
        src={url}
        alt={`Gallery ${index + 1}`}
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center gap-2 p-2">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => onRemove(index)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        
        {processSteps && processSteps.length > 0 && onMoveToStep && (
          <Select onValueChange={handleMoveToStep}>
            <SelectTrigger className="w-full h-8 text-xs bg-background/90">
              <ArrowRight className="w-3 h-3 mr-1" />
              <SelectValue placeholder="Déplacer vers..." />
            </SelectTrigger>
            <SelectContent>
              {processSteps.map((step, stepIndex) => (
                <SelectItem 
                  key={stepIndex} 
                  value={stepIndex.toString()}
                  disabled={!!step.image_url}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-primary font-medium">
                      {String(stepIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate">
                      {step.title || `Étape ${stepIndex + 1}`}
                    </span>
                    {step.image_url && (
                      <span className="text-xs text-muted-foreground">(a une image)</span>
                    )}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}

export function GalleryEditor({ images, onChange, projectSlug, processSteps, onMoveToStep }: GalleryEditorProps) {
  const [uploading, setUploading] = useState(false);

  const handleMoveImageToStep = (imageUrl: string, stepIndex: number) => {
    if (onMoveToStep) {
      onMoveToStep(imageUrl, stepIndex);
      // Remove image from gallery after moving
      const newImages = images.filter((img) => img !== imageUrl);
      onChange(newImages);
      toast.success(`Image déplacée vers l'étape ${stepIndex + 1}`);
    }
  };

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

  const validateImageFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Type de fichier non autorisé. Utilisez JPG, PNG, WebP ou GIF.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'Fichier trop volumineux. Maximum 5MB.';
    }
    return null;
  };

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    const newImages: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const validationError = validateImageFile(file);
        if (validationError) {
          toast.error(`${file.name}: ${validationError}`);
          continue;
        }

        const mimeToExt: Record<string, string> = {
          'image/jpeg': 'jpg',
          'image/png': 'png',
          'image/webp': 'webp',
          'image/gif': 'gif',
        };
        const ext = mimeToExt[file.type] || 'jpg';
        const fileName = `${projectSlug}-gallery-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${ext}`;
        const filePath = `gallery/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(filePath, file, {
            contentType: file.type,
            upsert: false
          });

        if (uploadError) {
          console.error(uploadError);
          toast.error(`Erreur upload: ${file.name}`);
          continue;
        }

        const { data } = supabase.storage
          .from("project-images")
          .getPublicUrl(filePath);

        newImages.push(data.publicUrl);
      }

      if (newImages.length > 0) {
        onChange([...images, ...newImages]);
        toast.success(`${newImages.length} image(s) ajoutée(s)`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img === active.id);
      const newIndex = images.findIndex((img) => img === over.id);
      onChange(arrayMove(images, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Galerie d'images</Label>
      <p className="text-sm text-text-secondary">Glissez-déposez les images pour les réorganiser</p>

      {images.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={images} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <SortableImage
                  key={image}
                  id={image}
                  url={image}
                  index={index}
                  onRemove={handleRemove}
                  processSteps={processSteps}
                  onMoveToStep={(stepIndex) => handleMoveImageToStep(image, stepIndex)}
                />
              ))}

              {/* Upload button */}
              <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                {uploading ? (
                  <span className="text-sm text-text-secondary">Upload...</span>
                ) : (
                  <>
                    <Plus className="w-6 h-6 text-text-secondary mb-1" />
                    <span className="text-sm text-text-secondary">Ajouter</span>
                  </>
                )}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.gif"
                  multiple
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleUpload(e.target.files);
                    }
                    e.target.value = '';
                  }}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
          {uploading ? (
            <span className="text-sm text-text-secondary">Upload en cours...</span>
          ) : (
            <>
              <Upload className="w-8 h-8 text-text-secondary mb-2" />
              <span className="text-sm text-text-secondary">Cliquez pour ajouter des images</span>
              <span className="text-xs text-text-tertiary mt-1">JPG, PNG, WebP ou GIF (max 5MB)</span>
            </>
          )}
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.gif"
            multiple
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleUpload(e.target.files);
              }
              e.target.value = '';
            }}
            className="hidden"
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}
