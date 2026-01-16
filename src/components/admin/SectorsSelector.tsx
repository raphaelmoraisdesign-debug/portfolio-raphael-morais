import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const AVAILABLE_SECTORS = [
  "Banque & Finance",
  "Service Public",
  "B2B",
  "B2C",
  "Outils Internes",
  "Grands Comptes",
  "Ressources Humaines",
  "Santé",
  "E-commerce",
  "Éducation",
  "Transport",
  "Immobilier",
];

interface SectorsSelectorProps {
  selected: string[];
  onChange: (sectors: string[]) => void;
}

export function SectorsSelector({ selected, onChange }: SectorsSelectorProps) {
  const toggleSector = (sector: string) => {
    if (selected.includes(sector)) {
      onChange(selected.filter((s) => s !== sector));
    } else {
      onChange([...selected, sector]);
    }
  };

  const removeSector = (sector: string) => {
    onChange(selected.filter((s) => s !== sector));
  };

  return (
    <div className="space-y-3">
      {/* Selected sectors */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((sector) => (
            <span
              key={sector}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full"
            >
              {sector}
              <button
                type="button"
                onClick={() => removeSector(sector)}
                className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Available sectors */}
      <div className="flex flex-wrap gap-2">
        {AVAILABLE_SECTORS.filter((s) => !selected.includes(s)).map((sector) => (
          <button
            key={sector}
            type="button"
            onClick={() => toggleSector(sector)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-full border transition-all",
              "border-border text-text-secondary hover:border-primary hover:text-primary hover:bg-primary/5"
            )}
          >
            {sector}
          </button>
        ))}
      </div>

      {selected.length === 0 && (
        <p className="text-xs text-text-tertiary">Cliquez sur les secteurs pour les ajouter</p>
      )}
    </div>
  );
}
