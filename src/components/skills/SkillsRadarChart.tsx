import { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/tag";

const skillsData = [
  { 
    skill: "Discovery & Research", 
    fullName: "Discovery & UX Research",
    level: 9, 
    description: "Observation terrain / Tests & entretiens utilisateurs / Audit UX",
    isLead: false
  },
  { 
    skill: "Strategic Design", 
    fullName: "Strategic Design",
    level: 8, 
    description: "Discovery / Co-définition de la vision produit / Priorisation",
    isLead: false
  },
  { 
    skill: "Méthodologie", 
    fullName: "Méthodologie",
    level: 9, 
    description: "Design Thinking / Lean UX / Agilité",
    isLead: false
  },
  { 
    skill: "UX Design", 
    fullName: "UX Design",
    level: 9, 
    description: "Facilitation d'ateliers / Parcours utilisateurs / Experience map / Wireframes",
    isLead: false
  },
  { 
    skill: "Lead Design", 
    fullName: "Lead Design",
    level: 8, 
    description: "Staffing / Process et rituels d'équipes",
    isLead: true
  },
  { 
    skill: "UI & Design System", 
    fullName: "UI Design & Design System",
    level: 8, 
    description: "Maquettes / Prototypage",
    isLead: false
  },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border border-border rounded-lg p-4 shadow-lg max-w-xs">
        <p className="font-display font-semibold text-foreground mb-1">
          {data.fullName}
        </p>
        <p className="text-sm text-text-secondary mb-2">
          Niveau : {data.level}/10
        </p>
        <p className="text-sm text-text-secondary">
          {data.description}
        </p>
      </div>
    );
  }
  return null;
};

export function SkillsRadarChart() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Primary color: #1E1AFD
  const primaryColor = "hsl(241, 98%, 55%)";

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        {/* Radar Chart */}
        <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] lg:h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skillsData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <PolarGrid 
                gridType="circle"
                stroke="hsl(var(--border))" 
                strokeOpacity={0.5}
              />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ 
                  fill: "hsl(var(--text-secondary))", 
                  fontSize: 12,
                  fontWeight: 500
                }}
                className="text-xs md:text-sm"
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 10]} 
                tick={{ fill: "hsl(var(--text-secondary))", fontSize: 10 }}
                tickCount={6}
              />
              <Radar
                name="Niveau"
                dataKey="level"
                stroke={primaryColor}
                fill={primaryColor}
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Skills descriptions - Desktop */}
        <div className="hidden lg:flex flex-col gap-4 w-full lg:w-1/2">
          {skillsData.map((skill) => (
            <div 
              key={skill.skill}
              className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-background hover:border-primary/30 hover:bg-primary/5 transition-all duration-250"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-display font-bold text-lg">{skill.level}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-display font-semibold text-foreground">{skill.fullName}</h4>
                  {skill.isLead && (
                    <Tag variant="primary" size="sm">Lead</Tag>
                  )}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend on mobile/tablet */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {skillsData.map((skill) => (
          <div 
            key={skill.skill}
            className="bg-background border border-border rounded-lg p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-display font-bold">{skill.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{skill.skill}</p>
                {skill.isLead && (
                  <Tag variant="primary" size="sm">Lead</Tag>
                )}
              </div>
            </div>
            <p className="text-sm text-text-secondary">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}