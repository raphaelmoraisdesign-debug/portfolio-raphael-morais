import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const skillsData = [
  { 
    skill: "Discovery", 
    fullName: "Discovery & UX Research",
    level: 9, 
    description: "Observation terrain / Tests & entretiens utilisateurs / Audit UX",
    isLead: false
  },
  { 
    skill: "Strategy", 
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
    skill: "UI & DS", 
    fullName: "UI Design & Design System",
    level: 8, 
    description: "Maquettes / Prototypage",
    isLead: false
  },
];

// Generate smooth curve path using cardinal spline
function generateSmoothPath(points: { x: number; y: number }[], tension: number = 0.4): string {
  if (points.length < 3) return "";
  
  const closedPoints = [...points, points[0], points[1]];
  
  let path = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 0; i < points.length; i++) {
    const p0 = closedPoints[i];
    const p1 = closedPoints[i + 1];
    const p2 = closedPoints[i + 2];
    
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    
    const nextIndex = (i + 1) % points.length;
    const prevIndex = i;
    const nextNextIndex = (i + 2) % points.length;
    
    const prev = points[prevIndex];
    const curr = points[nextIndex];
    const next = points[nextNextIndex];
    
    const cp2x = curr.x - (next.x - prev.x) * tension;
    const cp2y = curr.y - (next.y - prev.y) * tension;
    
    path += ` C ${p0.x + (p1.x - p0.x) * 0.5 + (p1.x - p0.x) * tension * 0.5} ${p0.y + (p1.y - p0.y) * 0.5 + (p1.y - p0.y) * tension * 0.5}, ${p1.x - (p2.x - p0.x) * tension * 0.3} ${p1.y - (p2.y - p0.y) * tension * 0.3}, ${p1.x} ${p1.y}`;
  }
  
  path += " Z";
  return path;
}

// Generate polygon grid path
function generatePolygonPath(sides: number, radius: number, cx: number, cy: number): string {
  const points: string[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return `M ${points.join(" L ")} Z`;
}

export function SkillsRadarChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<typeof skillsData[0] | null>(null);
  
  const size = 500;
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.28;
  const levels = 5;
  
  // Calculate points for the radar shape
  const radarPoints = useMemo(() => {
    return skillsData.map((skill, i) => {
      const angle = (Math.PI * 2 * i) / skillsData.length - Math.PI / 2;
      const radius = (skill.level / 10) * maxRadius;
      return {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      };
    });
  }, []);
  
  // Calculate label positions
  const labelPositions = useMemo(() => {
    return skillsData.map((skill, i) => {
      const angle = (Math.PI * 2 * i) / skillsData.length - Math.PI / 2;
      const radius = maxRadius + 50;
      return {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
        anchor: Math.abs(angle + Math.PI / 2) < 0.1 ? "middle" : 
                Math.abs(angle - Math.PI / 2) < 0.1 ? "middle" :
                angle > -Math.PI / 2 && angle < Math.PI / 2 ? "start" : "end",
      };
    });
  }, []);

  const smoothPath = generateSmoothPath(radarPoints, 0.35);

  return (
    <div className="w-full">
      {/* Dark container with gradient background */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 md:p-10 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full flex items-center justify-center py-8">
          <svg 
            viewBox={`0 0 ${size} ${size}`} 
            className="w-full max-w-[500px] h-auto"
            style={{ filter: "drop-shadow(0 0 40px rgba(1, 1, 255, 0.2))" }}
          >
            <defs>
              <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0101FF" stopOpacity={0.4} />
                <stop offset="50%" stopColor="#3333FF" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#0101FF" stopOpacity={0.15} />
              </linearGradient>
              <linearGradient id="skillStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0101FF" />
                <stop offset="100%" stopColor="#5555FF" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Grid circles */}
            {Array.from({ length: levels }).map((_, i) => (
              <path
                key={i}
                d={generatePolygonPath(skillsData.length, (maxRadius / levels) * (i + 1), cx, cy)}
                fill="none"
                stroke="#475569"
                strokeOpacity={0.3}
                strokeWidth={1}
              />
            ))}
            
            {/* Axis lines */}
            {skillsData.map((_, i) => {
              const angle = (Math.PI * 2 * i) / skillsData.length - Math.PI / 2;
              const x2 = cx + maxRadius * Math.cos(angle);
              const y2 = cy + maxRadius * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={x2}
                  y2={y2}
                  stroke="#475569"
                  strokeOpacity={0.3}
                  strokeWidth={1}
                />
              );
            })}
            
            {/* Smooth radar shape */}
            <motion.path
              d={smoothPath}
              fill="url(#skillGradient)"
              stroke="url(#skillStroke)"
              strokeWidth={3}
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
            
            {/* Data points */}
            {radarPoints.map((point, i) => (
              <motion.circle
                key={i}
                cx={point.x}
                cy={point.y}
                r={activeIndex === i ? 8 : 5}
                fill={activeIndex === i ? "#5555FF" : "#0101FF"}
                stroke="#fff"
                strokeWidth={2}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => {
                  setActiveIndex(i);
                  setHoveredSkill(skillsData[i]);
                }}
                onMouseLeave={() => {
                  setActiveIndex(null);
                  setHoveredSkill(null);
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                style={{ filter: activeIndex === i ? "drop-shadow(0 0 10px rgba(1, 1, 255, 0.8))" : "none" }}
              />
            ))}
            
            {/* Labels */}
            {skillsData.map((skill, i) => {
              const pos = labelPositions[i];
              const isActive = activeIndex === i;
              return (
                <text
                  key={skill.skill}
                  x={pos.x}
                  y={pos.y}
                  textAnchor={pos.anchor as any}
                  dominantBaseline="middle"
                  fill={isActive ? "#F9FAFB" : "#94A3B8"}
                  fontSize={12}
                  fontWeight={isActive ? 600 : 500}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => {
                    setActiveIndex(i);
                    setHoveredSkill(skill);
                  }}
                  onMouseLeave={() => {
                    setActiveIndex(null);
                    setHoveredSkill(null);
                  }}
                >
                  {skill.skill}
                </text>
              );
            })}
          </svg>
          
          {/* Tooltip */}
          {hoveredSkill && (
            <motion.div 
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 shadow-2xl max-w-xs z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <p className="font-display font-semibold text-white mb-1">
                {hoveredSkill.fullName}
              </p>
              <p className="text-sm text-slate-300 mb-2">
                Niveau : {hoveredSkill.level}/10
              </p>
              <p className="text-sm text-slate-400">
                {hoveredSkill.description}
              </p>
            </motion.div>
          )}
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
              onMouseEnter={() => {
                setActiveIndex(index);
                setHoveredSkill(skillsData[index]);
              }}
              onMouseLeave={() => {
                setActiveIndex(null);
                setHoveredSkill(null);
              }}
            >
              <span 
                className="w-2 h-2 rounded-full"
                style={{
                  background: `linear-gradient(135deg, #0101FF, #5555FF)`
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
        {skillsData.map((skill) => (
          <div 
            key={skill.skill}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, #0101FF, #5555FF)`
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
                    background: `linear-gradient(90deg, #0101FF, #5555FF)`
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
