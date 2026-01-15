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
      "mb-8 md:mb-12",
      align === "center" && "text-center",
      className
    )}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-foreground mb-2 md:mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-text-secondary max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
