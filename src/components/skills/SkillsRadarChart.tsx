import { useState } from "react";
import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/tag";
import { Search, Compass, Lightbulb, PenTool, Accessibility, Palette, LucideIcon } from "lucide-react";

interface SkillData {
  skill: string;
  fullName: string;
  level: number;
  description: string;
  isLead: boolean;
  icon: LucideIcon;
}

const skillsData: SkillData[] = [
  {
    skill: "Discovery & Research",
    fullName: "Discovery & UX Research",
    level: 8.5,
    description: "Observation terrain / Tests & entretiens utilisateurs / Audit UX",
    isLead: false,
    icon: Search,
  },
  {
    skill: "Strategic Design",
    fullName: "Strategic Design",
    level: 7.5,
    description: "Discovery / Co-définition de la vision produit / Priorisation",
    isLead: false,
    icon: Compass,
  },
  {
    skill: "Méthodologie",
    fullName: "Méthodologie",
    level: 7.5,
    description: "Design Thinking / Lean UX / Agilité",
    isLead: false,
    icon: Lightbulb,
  },
  {
    skill: "UX Design",
    fullName: "UX Design",
    level: 9,
    description: "Facilitation d'ateliers / Parcours utilisateurs / Experience map / Wireframes",
    isLead: false,
    icon: PenTool,
  },
  {
    skill: "Accessibilité",
    fullName: "Accessibilité",
    level: 6.5,
    description: "W3C / RGAA",
    isLead: false,
    icon: Accessibility,
  },
  {
    skill: "UI & Design System",
    fullName: "UI Design & Design System",
    level: 7,
    description: "Maquettes / Prototypage",
    isLead: false,
    icon: Palette,
  },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border border-border rounded-lg p-4 shadow-lg max-w-xs">
        <p className="font-display font-semibold text-foreground mb-1">{data.fullName}</p>
        <p className="text-sm text-text-secondary">{data.description}</p>
      </div>
    );
  }
  return null;
};

// Custom tick component for highlighting
const CustomTick = ({ payload, x, y, textAnchor, hoveredSkill }: any) => {
  const isHovered = hoveredSkill === payload.value;
  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      fill={isHovered ? "hsl(241, 98%, 55%)" : "hsl(var(--text-secondary))"}
      fontSize={12}
      fontWeight={isHovered ? 600 : 500}
      style={{ transition: "all 0.2s ease" }}
    >
      {payload.value}
    </text>
  );
};

export function SkillsRadarChart() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Primary color: #1E1AFD
  const primaryColor = "hsl(241, 98%, 55%)";

  // Create data with highlight for hovered skill
  const chartData = skillsData.map((item) => ({
    ...item,
    highlightLevel: item.skill === hoveredSkill ? item.level : 0,
  }));

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">
        {/* Radar Chart */}
        <div className="w-full lg:w-1/2 h-[400px] md:h-[450px] lg:h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <PolarGrid gridType="circle" stroke="hsl(var(--border))" strokeOpacity={0.5} />
              <PolarAngleAxis
                dataKey="skill"
                tick={(props) => <CustomTick {...props} hoveredSkill={hoveredSkill} />}
                className="text-xs md:text-sm"
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 10]}
                tick={false}
                axisLine={false}
              />
              {/* Base radar - dims when hovering */}
              <Radar
                name="Niveau"
                dataKey="level"
                stroke={primaryColor}
                fill={primaryColor}
                fillOpacity={hoveredSkill ? 0.1 : 0.25}
                strokeWidth={hoveredSkill ? 1 : 2}
                strokeOpacity={hoveredSkill ? 0.3 : 1}
              />
              {/* Highlight radar - shows only hovered skill */}
              {hoveredSkill && (
                <Radar
                  name="Highlight"
                  dataKey="highlightLevel"
                  stroke={primaryColor}
                  fill={primaryColor}
                  fillOpacity={0.4}
                  strokeWidth={3}
                  dot={{ fill: primaryColor, r: 6 }}
                />
              )}
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Skills descriptions - Desktop (more discreet) */}
        <div className="hidden lg:flex flex-col gap-1.5 w-full lg:w-1/2">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.skill}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={cn(
                "group flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200",
                hoveredSkill === skill.skill
                  ? "bg-primary/10 border border-primary/20"
                  : "hover:bg-muted/40 border border-transparent",
              )}
              onMouseEnter={() => setHoveredSkill(skill.skill)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
                  hoveredSkill === skill.skill 
                    ? "bg-primary text-white animate-pulse" 
                    : "bg-muted/60 text-text-secondary",
                )}
              >
                <skill.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4
                    className={cn(
                      "text-sm transition-colors duration-200 truncate",
                      hoveredSkill === skill.skill ? "text-foreground font-medium" : "text-text-secondary",
                    )}
                  >
                    {skill.fullName}
                  </h4>
                  {skill.isLead && (
                    <Tag variant="primary" size="sm">
                      Lead
                    </Tag>
                  )}
                </div>
                <p
                  className={cn(
                    "text-xs text-text-secondary/60 truncate transition-all duration-200",
                    hoveredSkill === skill.skill ? "opacity-100 text-text-secondary/80" : "opacity-60",
                  )}
                >
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Legend on mobile/tablet (compact) */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2 lg:hidden">
        {skillsData.map((skill) => (
          <div
            key={skill.skill}
            className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-muted/20 border border-border/40"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center">
              <skill.icon className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-text-secondary truncate">{skill.skill}</p>
              {skill.isLead && (
                <Tag variant="primary" size="sm" className="mt-0.5">
                  Lead
                </Tag>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
