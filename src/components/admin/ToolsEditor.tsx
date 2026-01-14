import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface ToolsEditorProps {
  tools: string[];
  onChange: (tools: string[]) => void;
}

const SUGGESTED_TOOLS = [
  "Figma",
  "Miro",
  "Maze",
  "Jira",
  "Notion",
  "Sketch",
  "Adobe XD",
  "Framer",
  "Webflow",
  "Hotjar",
  "UserTesting",
  "Lookback",
];

export function ToolsEditor({ tools, onChange }: ToolsEditorProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = (tool: string) => {
    const trimmed = tool.trim();
    if (trimmed && !tools.includes(trimmed)) {
      onChange([...tools, trimmed]);
    }
    setInputValue("");
  };

  const handleRemove = (index: number) => {
    onChange(tools.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd(inputValue);
    }
  };

  const availableSuggestions = SUGGESTED_TOOLS.filter(
    (tool) => !tools.includes(tool)
  );

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Outils utilisés</Label>

      {/* Current tools */}
      {tools.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tools.map((tool, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 py-1 px-3"
            >
              {tool}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="ml-1 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ajouter un outil..."
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => handleAdd(inputValue)}
          disabled={!inputValue.trim()}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Suggestions */}
      {availableSuggestions.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs text-text-tertiary">Suggestions :</span>
          <div className="flex flex-wrap gap-1">
            {availableSuggestions.slice(0, 8).map((tool) => (
              <button
                key={tool}
                type="button"
                onClick={() => handleAdd(tool)}
                className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/80 text-text-secondary hover:text-foreground transition-colors"
              >
                + {tool}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
