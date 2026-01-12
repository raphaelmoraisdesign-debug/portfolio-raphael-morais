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
      <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 shadow-2xl max-w-xs">
        <p className="font-display font-semibold text-white mb-1">
          {data.fullName}
        </p>
        <p className="text-sm text-slate-300 mb-2">
          Niveau : {data.level}/10
        </p>
        <p className="text-sm text-slate-400">
          {data.description}
        </p>
      </div>
    );
  }
  return null;
};

export function SkillsRadarChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Dark container with gradient background */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 md:p-10 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[550px]">
          {/* SVG Gradient Definitions */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F97316" stopOpacity={0.9} />
                <stop offset="50%" stopColor="#EC4899" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="skillStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="100%" stopColor="#C4B5FD" />
              </linearGradient>
            </defs>
          </svg>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skillsData} margin={{ top: 40, right: 60, bottom: 40, left: 60 }}>
              <PolarGrid 
                stroke="#475569" 
                strokeOpacity={0.3}
                gridType="polygon"
              />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={({ x, y, payload, index }) => {
                  const isActive = activeIndex === index;
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text
                        x={0}
                        y={0}
                        textAnchor="middle"
                        fill={isActive ? "#F9FAFB" : "#94A3B8"}
                        fontSize={12}
                        fontWeight={isActive ? 600 : 500}
                        className="transition-all duration-200"
                      >
                        {payload.value}
                      </text>
                    </g>
                  );
                }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 10]} 
                tick={false}
                axisLine={false}
              />
              <Radar
                name="Niveau"
                dataKey="level"
                stroke="url(#skillStroke)"
                fill="url(#skillGradient)"
                fillOpacity={0.8}
                strokeWidth={3}
                style={{
                  filter: "drop-shadow(0 0 20px rgba(249, 115, 22, 0.3))",
                }}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="relative flex flex-wrap justify-center gap-4 mt-6">
          {skillsData.map((skill, index) => (
            <button
              key={skill.skill}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200",
                "bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm",
                "hover:bg-slate-700/50 hover:border-slate-600",
                activeIndex === index && "bg-slate-700/70 border-slate-500"
              )}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <span 
                className="w-2 h-2 rounded-full"
                style={{
                  background: `linear-gradient(135deg, #F97316, #8B5CF6)`
                }}
              />
              <span className={cn(
                "text-sm font-medium transition-colors",
                activeIndex === index ? "text-white" : "text-slate-300"
              )}>
                {skill.skill}
              </span>
              {skill.isLead && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-500/30">
                  Lead
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Skills cards on mobile */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:hidden">
        {skillsData.map((skill, index) => (
          <div 
            key={skill.skill}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, #F97316, #8B5CF6)`
                  }}
                />
                <p className="font-medium text-white">{skill.fullName}</p>
              </div>
              {skill.isLead && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-500/30">
                  Lead
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{
                    width: `${skill.level * 10}%`,
                    background: `linear-gradient(90deg, #F97316, #8B5CF6)`
                  }}
                />
              </div>
              <span className="text-sm text-slate-400 font-medium">{skill.level}/10</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}