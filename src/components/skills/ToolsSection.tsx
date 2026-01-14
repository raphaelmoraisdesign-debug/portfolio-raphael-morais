import { motion } from "framer-motion";
import klaxoonLogo from "@/assets/tools/klaxoon-logo.svg";
import usertestingLogo from "@/assets/tools/usertesting-logo.svg";

interface Tool {
  name: string;
  logo: string;
  description: string;
}

interface ToolCategory {
  title: string;
  tools: Tool[];
}

const toolCategories: ToolCategory[] = [
  {
    title: "Design & Prototypage",
    tools: [
      { name: "Figma", logo: "https://cdn.worldvectorlogo.com/logos/figma-icon.svg", description: "Maquettage & Prototype" },
      { name: "Figjam", logo: "https://cdn.brandfetch.io/idZHcZ_i7F/w/400/h/400/theme/dark/icon.png", description: "Facilitation d'ateliers UX" },
      { name: "Klaxoon", logo: klaxoonLogo, description: "Facilitation d'ateliers UX" },
    ]
  },
  {
    title: "Outils IA",
    tools: [
      { name: "ChatGPT", logo: "https://cdn.worldvectorlogo.com/logos/chatgpt-6.svg", description: "Assistant IA conversationnel" },
      { name: "Perplexity.ai", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Perplexity_AI_logo.svg", description: "Recherche IA avancée" },
      { name: "Lovable.dev", logo: "https://lovable.dev/favicon.ico", description: "Développement assisté par IA" },
    ]
  },
  {
    title: "Documentation",
    tools: [
      { name: "Confluence", logo: "https://cdn.worldvectorlogo.com/logos/confluence-1.svg", description: "Documentation" },
      { name: "Notion", logo: "https://cdn.worldvectorlogo.com/logos/notion-2.svg", description: "Documentation" },
    ]
  },
  {
    title: "Recherche UX",
    tools: [
      { name: "UserTesting", logo: usertestingLogo, description: "UX Research & Data" },
    ]
  },
  {
    title: "Gestion de projet",
    tools: [
      { name: "Jira", logo: "https://cdn.worldvectorlogo.com/logos/jira-1.svg", description: "Backlog Design & Kanban" },
      { name: "Asana", logo: "https://cdn.worldvectorlogo.com/logos/asana-logo.svg", description: "Répartition des tâches" },
      { name: "Microsoft 365", logo: "https://cdn.worldvectorlogo.com/logos/microsoft-office-2013.svg", description: "PPT, Word, Excel" },
    ]
  },
];

export function ToolsSection() {
  return (
    <div className="space-y-12">
      {toolCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
        >
          <h3 className="font-display text-lg font-semibold text-foreground mb-6">
            {category.title}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {category.tools.map((tool) => (
              <motion.div
                key={tool.name}
                className="flex flex-col items-center gap-3 p-4 bg-background border border-border rounded-xl hover:border-primary/30 hover:shadow-soft transition-all duration-250 ease-in-out group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src={tool.logo}
                    alt={`Logo ${tool.name}`}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-250 ease-in-out"
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${tool.name}&background=random&size=40`;
                    }}
                  />
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-foreground block">
                    {tool.name}
                  </span>
                  <span className="text-xs text-text-secondary mt-1 block">
                    {tool.description}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}