import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

interface ImpactCardProps {
  metric: string;
  change: string;
  before: string;
  after: string;
  index?: number;
  className?: string;
}

export function ImpactCard({
  metric,
  change,
  before,
  after,
  index = 0,
  className,
}: ImpactCardProps) {
  // Determine if a negative change is actually positive (e.g., reduced time, fewer errors)
  const isNegativeGood = change.includes('-') && 
    (metric.toLowerCase().includes('temps') || 
     metric.toLowerCase().includes('erreur') || 
     metric.toLowerCase().includes('abandon') || 
     metric.toLowerCase().includes('ticket'));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={cn(
        "relative bg-card rounded-xl p-5 md:p-6 border border-border shadow-card overflow-hidden",
        "hover:shadow-elevated hover:border-primary/30 transition-all duration-300",
        className
      )}
    >
      {/* Signature accent bar */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-accent-secondary to-primary/50" />
      
      {/* Metric name */}
      <p className="text-sm text-text-secondary mb-3 pl-3">{metric}</p>
      
      {/* Change value */}
      <div className="flex items-center gap-3 mb-4 pl-3">
        <span className="text-2xl md:text-3xl font-bold text-gradient">
          {change}
        </span>
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10">
          {isNegativeGood ? (
            <TrendingDown className="w-4 h-4 text-primary" />
          ) : (
            <TrendingUp className="w-4 h-4 text-primary" />
          )}
        </div>
      </div>
      
      {/* Before/After */}
      <div className="flex items-center gap-2 text-sm pl-3 pt-3 border-t border-border/50">
        <span className="text-text-tertiary line-through">{before}</span>
        <ArrowRight className="w-3.5 h-3.5 text-primary" />
        <span className="font-semibold text-foreground">{after}</span>
      </div>
    </motion.div>
  );
}
