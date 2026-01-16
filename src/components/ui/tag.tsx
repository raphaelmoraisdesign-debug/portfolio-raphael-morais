import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const tagVariants = cva(
  "inline-flex items-center rounded-md text-sm font-medium transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        accent: "bg-primary/10 text-primary font-semibold border-l-2 border-primary",
        primary: "bg-primary text-primary-foreground shadow-sm",
        outline: "border border-border text-text-secondary hover:border-primary/50 hover:text-primary",
        muted: "bg-muted text-muted-foreground",
        gradient: "bg-gradient-to-r from-primary/10 via-accent-secondary/5 to-primary/10 text-primary border border-primary/20 font-semibold",
        success: "bg-success/10 text-success-foreground border-l-2 border-success",
        warning: "bg-warning/10 text-warning-foreground border-l-2 border-warning",
      },
      size: {
        sm: "px-2.5 py-1 text-xs font-semibold",
        default: "px-4 py-1.5 text-sm",
        lg: "px-5 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface TagProps extends VariantProps<typeof tagVariants> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Tag({ children, variant, size, className, onClick }: TagProps) {
  const Component = onClick ? "button" : "span";
  
  return (
    <Component 
      className={cn(
        tagVariants({ variant, size }),
        onClick && "cursor-pointer hover:opacity-80",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}