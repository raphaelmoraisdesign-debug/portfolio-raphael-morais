import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({ 
  title, 
  subtitle, 
  align = "left",
  className 
}: SectionTitleProps) {
  return (
    <div className={cn(
      "mb-10 md:mb-14",
      align === "center" && "text-center",
      className
    )}>
      <h2 className="text-2xl sm:text-3xl md:text-h1 font-display font-bold text-foreground mb-3 md:mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
