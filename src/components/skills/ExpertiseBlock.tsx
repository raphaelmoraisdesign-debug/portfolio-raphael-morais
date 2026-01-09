import { CheckCircle2 } from "lucide-react";

interface ExpertiseBlockProps {
  id: string;
  title: string;
  description: string;
  approach: string;
  examples: string[];
}

export function ExpertiseBlock({ title, description, approach, examples }: ExpertiseBlockProps) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 hover:border-accent/30 transition-colors">
      <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
        {title}
      </h3>
      
      <p className="text-text-secondary leading-relaxed mb-4">
        {description}
      </p>
      
      <p className="text-text-secondary leading-relaxed mb-6 italic border-l-2 border-accent/50 pl-4">
        {approach}
      </p>

      <div>
        <p className="text-sm font-medium text-foreground mb-3">
          Exemples de missions :
        </p>
        <ul className="space-y-2">
          {examples.map((example, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm text-text-secondary">{example}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
