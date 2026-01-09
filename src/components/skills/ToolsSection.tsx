import { motion } from "framer-motion";

interface Tool {
  name: string;
  logo: string;
}

interface ToolCategory {
  title: string;
  tools: Tool[];
}

const toolCategories: ToolCategory[] = [
  {
    title: "Design",
    tools: [
      { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "FigJam", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Illustrator", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
      { name: "Photoshop", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
    ]
  },
  {
    title: "Recherche & Collaboration",
    tools: [
      { name: "Miro", logo: "https://cdn.brandfetch.io/idAnDTFapY/theme/dark/symbol.svg" },
      { name: "Notion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg" },
      { name: "Maze", logo: "https://cdn.brandfetch.io/idqCUO4oJc/w/400/h/400/theme/dark/icon.jpeg" },
      { name: "Lookback", logo: "https://cdn.brandfetch.io/idhHzkS0Z-/w/400/h/400/theme/dark/icon.png" },
    ]
  },
  {
    title: "Visioconférence",
    tools: [
      { name: "Zoom", logo: "https://cdn.brandfetch.io/idIAYfP1wF/w/400/h/400/theme/dark/icon.png" },
      { name: "Google Meet", logo: "https://cdn.brandfetch.io/idIPlLrxCt/theme/dark/icon.svg" },
      { name: "Teams", logo: "https://cdn.brandfetch.io/idTrjYqNqL/theme/dark/icon.svg" },
    ]
  },
  {
    title: "Gestion de projet",
    tools: [
      { name: "Jira", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
      { name: "Trello", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg" },
      { name: "Linear", logo: "https://cdn.brandfetch.io/idUz8PUp90/theme/dark/symbol.svg" },
      { name: "Confluence", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg" },
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
            {category.tools.map((tool, toolIndex) => (
              <motion.div
                key={tool.name}
                className="flex flex-col items-center gap-3 p-4 bg-background border border-border rounded-xl hover:border-accent/30 hover:shadow-soft transition-all group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src={tool.logo}
                    alt={`Logo ${tool.name}`}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${tool.name}&background=random&size=40`;
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-text-secondary group-hover:text-foreground transition-colors text-center">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
