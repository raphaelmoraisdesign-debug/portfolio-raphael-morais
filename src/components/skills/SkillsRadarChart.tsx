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
    description: "Observation terrain, tests utilisateurs modérés et non modérés, audit UX, interviews",
    isLead: false
  },
  { 
    skill: "Strategic Design", 
    fullName: "Strategic Design",
    level: 8, 
    description: "Discovery, co-définition de la vision produit, priorisation, roadmap",
    isLead: false
  },
  { 
    skill: "Méthodologie", 
    fullName: "Méthodologie",
    level: 9, 
    description: "Design Thinking, Lean UX, Agilité, intégration dans les process produit",
    isLead: false
  },
  { 
    skill: "UX Design", 
    fullName: "UX Design",
    level: 9, 
    description: "Facilitation d'ateliers, parcours utilisateurs, experience maps, wireframes",
    isLead: false
  },
  { 
    skill: "Lead Design", 
    fullName: "Lead Design",
    level: 8, 
    description: "Staffing, process et rituels d'équipes, mentorat, recrutement",
    isLead: true
  },
  { 
    skill: "UI & Design System", 
    fullName: "UI Design & Design System",
    level: 8, 
    description: "Maquettes haute-fidélité, prototypage, création et maintenance de design systems",
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
      <div className="w-full h-[400px] md:h-[500px] lg:h-[550px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={skillsData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid 
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

      {/* Legend on mobile */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:hidden">
        {skillsData.map((skill) => (
          <div 
            key={skill.skill}
            className="bg-background border border-border rounded-lg p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <p className="font-medium text-sm text-foreground">{skill.skill}</p>
              {skill.isLead && (
                <Tag variant="primary" size="sm">Lead</Tag>
              )}
            </div>
            <p className="text-xs text-text-secondary">Niveau {skill.level}/10</p>
          </div>
        ))}
      </div>
    </div>
  );
}