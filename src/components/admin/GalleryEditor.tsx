import { useState } from "react";
import { Plus, Trash2, Upload, X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface GalleryEditorProps {
  images: string[];
  onChange: (images: string[]) => void;
  projectSlug: string;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function GalleryEditor({ images, onChange, projectSlug }: GalleryEditorProps) {
  const [uploading, setUploading] = useState(false);

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

  const handleMove = (index: number, direction: "left" | "right") => {
    const newIndex = direction === "left" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= images.length) return;

    const newImages = [...images];
    [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Galerie d'images</Label>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group aspect-video">
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => handleMove(index, "left")}
                  disabled={index === 0}
                >
                  ←
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemove(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => handleMove(index, "right")}
                  disabled={index === images.length - 1}
                >
                  →
                </Button>
              </div>
            </div>
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
