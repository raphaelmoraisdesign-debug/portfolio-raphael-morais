import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  accent?: boolean;
}

export function SectionTitle({ 
  title, 
  subtitle, 
  align = "left",
  className,
  accent = true
}: SectionTitleProps) {
  return (
    <div className={cn(
      "mb-10 md:mb-14",
      align === "center" && "text-center",
      className
    )}>
      <div className={cn(
        "flex items-center gap-3 mb-3 md:mb-4",
        align === "center" && "justify-center"
      )}>
        {accent && (
          <div className="w-1.5 h-8 md:h-10 rounded-full bg-gradient-to-b from-primary to-accent-secondary" />
        )}
        <h2 className="text-2xl sm:text-3xl md:text-h1 font-display font-bold text-foreground tracking-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className={cn(
          "text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed",
          accent && "ml-5"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
