import { useState } from "react";
import { Plus, Trash2, Upload, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface GalleryEditorProps {
  images: string[];
  onChange: (images: string[]) => void;
  projectSlug: string;
}

interface SortableImageProps {
  id: string;
  url: string;
  index: number;
  onRemove: (index: number) => void;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function SortableImage({ id, url, index, onRemove }: SortableImageProps) {
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
      className="relative group aspect-video"
    >
      <img
        src={url}
        alt={`Gallery ${index + 1}`}
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
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
    </div>
  );
}

export function GalleryEditor({ images, onChange, projectSlug }: GalleryEditorProps) {
  const [uploading, setUploading] = useState(false);

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
